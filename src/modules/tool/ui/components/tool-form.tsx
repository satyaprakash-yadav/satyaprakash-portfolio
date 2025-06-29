"use client";

import * as z from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Tool } from "@prisma/client";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/secured/single-image-dropzone";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select";
import { toolFormSchema } from "../../schemas";
import { toast } from "sonner";

interface ToolFormProps {
    tool?: Tool | null;
};

export const ToolForm = ({ tool }: ToolFormProps) => {
    const router = useRouter();
    const [file, setFile] = useState<File | string | undefined>(
        tool?.image ?? undefined
    );
    const [loading, setLoading] = useState(false);

    const { edgestore } = useEdgeStore();

    const form = useForm<z.infer<typeof toolFormSchema>>({
        resolver: zodResolver(toolFormSchema),
        defaultValues: {
            image: tool?.image ?? "",
            thumbnail: tool?.thumbnail ?? "",
            name: tool?.name ?? "",
            color: tool?.color ?? "",
        }
    });

    const onSubmit = async (values: z.infer<typeof toolFormSchema>) => {
        try {
            setLoading(true);

            let imageURL = tool?.image ?? "";
            let thumbnailURL = tool?.thumbnail ?? "";
            if (file && file instanceof File) {
                const res = await edgestore.publicImages.upload({
                    file,
                    options: {
                        replaceTargetUrl: tool?.image ?? undefined
                    }
                });

                if (res.url && res.thumbnailUrl) {
                    imageURL = res.url;
                    thumbnailURL = res.thumbnailUrl;
                }
            };

            const newValues = { ...values, image: imageURL, thumbnail: thumbnailURL };

            if (tool) {
                const response = await axios.patch(`/api/tool/${tool.id}`, newValues);

                if (response.data.success) {
                    toast.success("Tool successfully saved");
                    router.push(response.data.tool.id);
                }
            } else {
                const response = await axios.post("/api/tool", newValues);

                if (response.data.success) {
                    toast.success("Tool successfully saved");
                    router.push(response.data.tool.id);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <FormLabel htmlFor="image-file">Image</FormLabel>
                    <SingleImageDropzone
                        width={200}
                        height={200}
                        value={file}
                        dropzoneOptions={{
                            maxSize: 1024 * 1024 * 2  // 2MB
                        }}
                        onChange={(file) => {
                            setFile(file);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Color</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    name={field.name}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select color" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="LIGHT">Light</SelectItem>
                                        <SelectItem value="DARK">Dark</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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