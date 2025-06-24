"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { Prisma } from "@prisma/client";
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
import { AccountFormSchema } from "../../schemas";

type User = Prisma.UserGetPayload<{
    select: {
        name: true,
        email: true,
    };
}>;

interface AccountFormProps {
    user: User | null;
};

export const AccountForm = ({ user }: AccountFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof AccountFormSchema>>({
        resolver: zodResolver(AccountFormSchema),
        defaultValues: {
            name: user !== null && typeof user.name === "string" ? user.name : "",
            email: user !== null && typeof user.email === "string" ? user.email : "",
            current: "",
            password: "",
            confirm: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof AccountFormSchema>) => {
        try {
            setLoading(true);
            console.log(values);
        } catch (error) {
            console.log(error);
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
                                <Input {...field} placeholder="Enter your name" />
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
                                <Input {...field} placeholder="example@gmail.com" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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