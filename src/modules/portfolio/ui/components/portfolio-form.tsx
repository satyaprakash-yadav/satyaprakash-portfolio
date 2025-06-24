"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { SingleImageDropzone } from "@/components/secured/single-image-dropzone";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { portfolioFormSchema } from "../../schemas";
import { toast } from "sonner";

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
    include: { tags: true };
}>;

interface PortfolioFormProps {
    portfolio?: PortfolioWithTags | null;
};

export const PortfolioForm = ({
    portfolio
}: PortfolioFormProps) => {
    const router = useRouter();
    const [file, setFile] = useState<File | string | undefined>(
        portfolio?.image ?? undefined
    );
    const [loading, setLoading] = useState(false);

    const { edgestore } = useEdgeStore();

    const initialValues =
        portfolio?.tags !== undefined && portfolio.tags.length > 0
            ? portfolio?.tags.map((item) => ({
                name: item.name,
            }))
            : [{ name: "" }];

    const form = useForm<z.infer<typeof portfolioFormSchema>>({
        resolver: zodResolver(portfolioFormSchema),
        defaultValues: {
            image: portfolio?.image ?? "",
            thumbnail: portfolio?.thumbnail ?? "",
            title: portfolio?.title ?? "",
            description: portfolio?.description ?? "",
            githubUrl: portfolio?.githubUrl ?? "",
            demoUrl: portfolio?.demoUrl ?? "",
            tags: initialValues,
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        name: "tags",
        control: form.control,
    });

    const {
        formState: { errors },
    } = form;

    const onSubmit = async (values: z.infer<typeof portfolioFormSchema>) => {
        try {
            setLoading(true);

            let imageURL = portfolio?.image ?? "";
            let thumbnailURL = portfolio?.thumbnail ?? "";
            if (file && file instanceof File) {
                const res = await edgestore.publicImages.upload({
                    file,
                    options: {
                        replaceTargetUrl: portfolio?.image ?? undefined,
                    }
                });

                if (res.url && res.thumbnailUrl) {
                    imageURL = res.url;
                    thumbnailURL = res.thumbnailUrl;
                }
            }

            const newValues = { ...values, image: imageURL, thumbnail: thumbnailURL };

            if (portfolio) {
                const response = await axios.patch(
                    `/api/portfolio/${portfolio.id}`,
                    newValues,
                );

                if (response.data.success) {
                    toast.success("Data successfully saved.");
                    router.push(response.data.portfolio.id);
                }
            } else {
                const response = await axios.post("/api/portfolio", newValues);

                if (response.data.success) {
                    toast.success("Data successfully saved.")
                    router.push(response.data.portfolio.id);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        };
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid lg:grid-cols-2 gap-8"
            >
                <div className="flex flex-col">
                    <FormLabel className="py-2">Image</FormLabel>
                    <SingleImageDropzone
                        className="w-full h-full"
                        value={file}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 2    // 2MB
                        }}
                        onChange={(file) => {
                            setFile(file);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter title" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter description"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="githubUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub URL</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter GitHub URL" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="demoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Demo URL</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter demo URL" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="flex items-end gap-2 sm:gap-3 justify-between"
                            >
                                <div className="grow">
                                    <FormField
                                        control={form.control}
                                        name={`tags.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                    Tags
                                                </FormLabel>
                                                <FormDescription className={cn(index !== 0 && "sr-only")}>
                                                    Add list of techs used in this this project.
                                                </FormDescription>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter tag" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className={cn(
                                    "grow-0",
                                    !!errors.tags?.at?.(index) && "self-end mb-[1.7rem]",
                                )}>
                                    <Button
                                        onClick={() => remove(index)}
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Trash className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append({ name: "" })}
                            >
                                Add tag
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="default"
                            className="mt-4"
                        >
                            {loading && (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={18} />
                                    Saving...
                                </>
                            )}
                            {!loading && <p className="px-4">Save</p>}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}