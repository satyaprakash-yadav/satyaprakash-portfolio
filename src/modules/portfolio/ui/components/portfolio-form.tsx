"use client";

import * as z from "zod";
import axios from "axios";
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
                            <FormItem className="space-y-1">
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
                            <FormItem className="space-y-1">
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
                            <FormItem className="space-y-1">
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
                            <FormItem className="space-y-1">
                                <FormLabel>Demo URL</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter demo URL" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormLabel className="pt-2">Tags</FormLabel>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-2 sm:gap-3 justify-between">
                            <div className="grow">
                                <FormField
                                    control={form.control}
                                    name={`tags.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormControl>
                                                <Input {...field} placeholder="Enter tag" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grow-0">
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
                    <div className="mb-1 sm:mb-2 -mt-2">
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
                    <div>
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="default"
                            className="mt-2"
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