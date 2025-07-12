"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { MiscellaneousFormSchema } from "../../schemas";
import { toast } from "sonner";

type MiscellaneousWithTitles = Prisma.MiscellaneousGetPayload<{
    include: { titles: true };
}>;

interface MiscellaneousFormProps {
    miscellaneous: MiscellaneousWithTitles | null;
};

export const MiscellaneousForm = ({ miscellaneous }: MiscellaneousFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const initialValues =
        miscellaneous?.titles !== undefined && miscellaneous?.titles.length > 0
            ? miscellaneous?.titles.map((item) => ({
                name: item.name,
            }))
            : [{ name: "" }];

    const form = useForm<z.infer<typeof MiscellaneousFormSchema>>({
        resolver: zodResolver(MiscellaneousFormSchema),
        defaultValues: {
            email: miscellaneous?.email ?? "",
            messengerName: miscellaneous?.messengerName ?? "",
            messengerUrl: miscellaneous?.messengerUrl ?? "",
            discordUsername: miscellaneous?.discordUsername ?? "",
            discordUrl: miscellaneous?.discordUrl ?? "",
            facebookUrl: miscellaneous?.facebookUrl ?? "",
            instagramUrl: miscellaneous?.instagramUrl ?? "",
            twitterUrl: miscellaneous?.twitterUrl ?? "",
            linkedinUrl: miscellaneous?.linkedinUrl ?? "",
            githubUrl: miscellaneous?.githubUrl ?? "",
            titles: initialValues,
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        name: "titles",
        control: form.control,
    });

    const {
        formState: { errors },
    } = form;

    const onSubmit = async (values: z.infer<typeof MiscellaneousFormSchema>) => {
        try {
            setLoading(true)

            const response = await axios.post("/api/miscellaneous", values);

            if (response.data.success) {
                router.refresh();
                toast.success("Miscellaneous successfully saved.")
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter email"
                                    autoComplete="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="messengerName"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Messenger Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter Messenger name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="messengerUrl"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Messenger URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter Messenger URL" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="discordUsername"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Discord Username</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter Discord username" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="discordUrl"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Discord URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter Discord URL" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="facebookUrl"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Facebook URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter Facebook URL" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instagramUrl"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Instagram URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter Instagram URL" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="twitterUrl"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>Twitter URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter Twitter URL" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormLabel>LinkedIn URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter LinkedIn URL" />
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
                <div className="lg:col-span-2 mt-6">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-2 sm:gap-3 justify-between">
                            <div className="grow">
                                <FormField
                                    control={form.control}
                                    name={`titles.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                Titles
                                            </FormLabel>
                                            <FormDescription className={cn(index !== 0 && "sr-only")}>
                                                Add titles for typewriter animations on header.
                                            </FormDescription>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter title" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className={cn(
                                "grow-0",
                                !!errors.titles?.at?.(index) && "self-end mb-[1.7rem]"
                            )}
                            >
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
                            Add title
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
            </form>
        </Form>
    )
}