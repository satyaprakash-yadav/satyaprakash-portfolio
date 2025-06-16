"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/modal";
import { useQualificationModal } from "@/hooks/use-qualification-modal";

import { Button } from "../ui/button";
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
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import { qualificationFormSchema } from "@/modules/qualifications/schemas";
import { Input } from "../ui/input";
import { toast } from "sonner";

const QualificationModal = () => {
    const router = useRouter();
    const qualificationModal = useQualificationModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof qualificationFormSchema>>({
        resolver: zodResolver(qualificationFormSchema),
        defaultValues: {
            type: "",
            degree: "",
            school: "",
            position: "",
            company: "",
            startYear: "",
            endYear: "",
        },
        values: {
            type: qualificationModal.qualification?.type ?? "",
            degree: qualificationModal.qualification?.degree ?? "",
            school: qualificationModal.qualification?.school ?? "",
            position: qualificationModal.qualification?.position ?? "",
            company: qualificationModal.qualification?.company ?? "",
            startYear: qualificationModal.qualification?.startYear ?? "",
            endYear: qualificationModal.qualification?.endYear ?? "",
        }
    });

    const qualificationType = form.watch("type");

    const onSubmit = async (values: z.infer<typeof qualificationFormSchema>) => {
        try {
            setLoading(true);

            let response;

            if (qualificationModal.qualification?.id !== undefined) {
                response = await axios.patch(
                    `/api/qualification/${qualificationModal.qualification.id}`,
                    values,
                );
            } else {
                response = await axios.post("/api/qualification", values);
            }

            if (response.data.success) {
                form.reset();
                qualificationModal.onClose();
                router.refresh();
                toast.success("Qualification successfully saved.")
            }
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={qualificationModal.title}
            description={qualificationModal.description}
            isOpen={qualificationModal.isOpen}
            onClose={() => {
                qualificationModal.onClose();
                form.reset();
            }}
        >
            <div className="py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="EDUCATION">Education</SelectItem>
                                            <SelectItem value="EXPERIENCE">Experience</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {qualificationType === "EDUCATION" && (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="degree"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Degree</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Enter degree"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="school"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>School</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Enter school"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {qualificationType === "EXPERIENCE" && (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="position"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Position</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Enter position"
                                                    {...field}
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
                                            <FormLabel>Company</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="Enter company"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startYear"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Start Year</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Enter start year"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endYear"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>End Year</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Enter end year"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button
                                type="button"
                                disabled={loading}
                                variant="outline"
                                onClick={() => {
                                    qualificationModal.onClose();
                                    form.reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                            >
                                {loading && (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={18} />
                                        Submitting...
                                    </>
                                )}
                                {!loading && <>Submit</>}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
}

export default QualificationModal;