"use client";

import * as z from "zod";
import axios from "axios";
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
} from "@/components/ui/form";
import { expertiseFormSchema } from "../../schemas";

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

  const onSubmit = async (values: z.infer<typeof expertiseFormSchema>) => {
    console.log(values);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 sm:gap-3"
      >
        <FormLabel>Service</FormLabel>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 sm:gap-3 justify-between"
          >
            <div className="grow">
              <FormField
                control={form.control}
                name={`items.${index}.service`}
                render={({ field }) => (
                  <FormItem className="space-y-1">
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
            className="mt-2"
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
