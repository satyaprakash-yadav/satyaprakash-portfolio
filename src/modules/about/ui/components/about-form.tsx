"use client";

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { aboutFormSchema } from "../../schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const AboutForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof aboutFormSchema>>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      experience: "",
      project: "",
      worldwide: "",
      summary: "",
    },
  });

  const onSubmit = (values: z.infer<typeof aboutFormSchema>) => {
    console.log(values);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter experience" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter project" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="worldwide"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Worldwide</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter worldwide" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter summary"
                  className="resize-none"
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
  );
};
