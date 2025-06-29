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

    const onSubmit = () => { }

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