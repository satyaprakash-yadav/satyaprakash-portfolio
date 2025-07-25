"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Experience } from "@prisma/client";
import { experienceFormSchema } from "../../schemas";
interface FrontendFormProps {
  frontendItems: Experience[];
}

export const FrontendForm = ({ frontendItems }: FrontendFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues =
    frontendItems.length > 0
      ? frontendItems.map((item) => ({
          skill: item.skill,
          level: item.level,
          type: item.type,
        }))
      : [
          {
            skill: "",
            level: "",
            type: "frontend",
          },
        ];

  const form = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      items: initialValues,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  const onSubmit = async (values: z.infer<typeof experienceFormSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/experience", values);

      if (response.data.success) {
        router.refresh();

        toast.success("Frontend successfully saved.");
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
        className="flex flex-col gap-2 sm:gap-3"
      >
        <div className="flex items-center gap-2 sm:gap-3 justify-between">
          <div className="grow grid grid-cols-2 gap-2 sm:gap-3">
            <FormLabel>Skill</FormLabel>
            <FormLabel>Level</FormLabel>
          </div>
          <div className="grow-0 w-8" />
        </div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 sm:gap-3 justify-between"
          >
            <div className="grow grid grid-cols-2 gap-2 sm:gap-3">
              <FormField
                control={form.control}
                name={`items.${index}.skill`}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input placeholder="Enter skill" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.level`}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="experienced">Experienced</SelectItem>
                      </SelectContent>
                    </Select>
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
            onClick={() => append({ type: "frontend", skill: "", level: "" })}
          >
            Add skill
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
            {!loading && <p>Update skill</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
