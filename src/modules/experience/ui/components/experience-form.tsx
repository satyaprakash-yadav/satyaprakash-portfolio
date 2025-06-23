"use client";

import * as z from "zod";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import type { Experience } from "@prisma/client";

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
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { experienceFormSchema } from "../../schemas";
import { toast } from "sonner";

interface ExperienceFormProps {
  experienceType: string;
  experienceItems: Experience[];
}

export const ExperienceForm = ({
  experienceType,
  experienceItems,
}: ExperienceFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues =
    experienceItems.length > 0
      ? experienceItems.map((item) => ({
          skill: item.skill,
          level: item.level,
          type: item.type,
        }))
      : [
          {
            skill: "",
            level: "",
            type: experienceType,
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

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof experienceFormSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/experience", values);

      if (response.data.success) {
        router.refresh();

        const tData = experienceType === "FRONTEND" ? "Frontend" : "Backend";
        toast.success(`${tData} successfully saved.`);
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
            <div className="grow grid grid-cols-2 gap-2 sm:gap-3">
              <FormField
                control={form.control}
                name={`items.${index}.skill`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Skill
                    </FormLabel>
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
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Level
                    </FormLabel>
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
            <div className={cn(
              "grow-0",
              !!errors.items?.at?.(index) && "self-end mb-[1.7rem]"
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
            className="mt-5"
            onClick={() =>
              append({ skill: "", level: "", type: experienceType })
            }
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
                Saving...
              </>
            )}
            {!loading && <p className="px-4">Save</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
