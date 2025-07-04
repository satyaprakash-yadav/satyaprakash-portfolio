"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormMessage,
    FormControl
} from "@/components/ui/form";
import { PasswordFormSchema } from "../../../schemas";
import { toast } from "sonner";

export const PasswordForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof PasswordFormSchema>>({
        resolver: zodResolver(PasswordFormSchema),
        defaultValues: {
            current: "",
            password: "",
            confirm: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof PasswordFormSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post("/api/account/password", values);

            if (response.data.success) {
                form.resetField("current");
                form.resetField("password");
                form.resetField("confirm");
                router.refresh();

                toast.success("Password updated successfully.")
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
                <FormField
                    control={form.control}
                    name="current"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    {...field}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    {...field}
                                    placeholder="••••••••"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    {...field}
                                    placeholder="••••••••"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
            </form>
        </Form>
    )
}