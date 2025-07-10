"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon } from "@radix-ui/react-icons";

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
import { CvFormSchema } from "../../schemas";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DownloadCvFormProps {
    onClose: () => void;
};

export const DownloadCvForm = ({
    onClose,
}: DownloadCvFormProps) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const form = useForm<z.infer<typeof CvFormSchema>>({
        resolver: zodResolver(CvFormSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof CvFormSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post("/api/resume/generate-link", values);

            if (response.data.success) {
                toast.success("Token successfully generated");
                form.reset();
                setSuccess(true);
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data.error) {
                console.log(error);
                toast.error("Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your name"
                                    autoComplete="name"
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="example@gmail.com"
                                    autoComplete="email"
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Company (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter your company name"
                                    autoComplete="company"
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {success && (
                    <div className="bg-emerald-500/15 dark:bg-emerald-500/30 p-3 rounded-md flex items-center space-x-2 text-xs md:text-sm text-emerald-500 dark:text-emerald-300 mt-4">
                        <div className="size-5">
                            <CheckCircledIcon className="size-5" />
                        </div>
                        <p>
                            Download link successfully generated and sent to your email.
                            Please check your email and click on the link to proceed.
                        </p>
                    </div>
                )}

                <div className="pt-3 space-x-2 flex items-center justify-end w-full">
                    <Button
                        type="button"
                        disabled={loading}
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        type="submit"
                        variant="default"
                    >
                        {loading && (
                            <>
                                <Loader2 className="animate-spin mr-2" size={18} />
                                Generating...
                            </>
                        )}
                        {!loading && <>Generate Link</>}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
