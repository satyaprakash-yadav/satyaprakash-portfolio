"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import type { Expertise } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { expertiseFormSchema } from "../../schemas";
import { toast } from "sonner";

interface ExpertiseFormProps {
  expertiseType: string;
  expertiseItems: Expertise[];
}

export const ExpertiseForm = ({
  expertiseType,
  expertiseItems,
}: ExpertiseFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues =
    expertiseItems.length > 0
      ? expertiseItems.map((item) => ({
          service: item.service,
          type: item.type,
        }))
      : [
          {
            service: "",
            type: expertiseType,
          },
        ];

  const form = useForm<z.infer<typeof expertiseFormSchema>>({
    resolver: zodResolver(expertiseFormSchema),
    defaultValues: {
      items: initialValues,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof expertiseFormSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/expertise", values);

      if (response.data.success) {
        router.refresh();

        const tData =
          expertiseType === "SEOOPTIMIZATION"
            ? "Seo"
            : expertiseType === "WEBDEVELOPMENT"
              ? "Web"
              : "Content";
        toast.success(`${tData} successfully saved`);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-end gap-2 sm:gap-3 justify-between"
          >
            <div className="grow">
              <FormField
                control={form.control}
                name={`items.${index}.service`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Service
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add list services and expertises you offer.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} placeholder="Enter service" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.type`}
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn(
              "grow-0",
              !!errors.items?.at?.(index) && "self-end mb-[1.7rem]",
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
            onClick={() => append({ service: "", type: expertiseType })}
          >
            Add service
          </Button>
        </div>
        <div>
          <Button
            disabled={loading}
            type="submit"
            variant="default"
            className="mt-6"
          >
            {loading && (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Updating...
              </>
            )}
            {!loading && <p>Update service</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
