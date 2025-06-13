"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import type { About } from "@prisma/client";
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

interface AboutFormProps {
  about: About | null;
}

export const AboutForm = ({ about }: AboutFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof aboutFormSchema>>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      experience: about !== null ? about.experience : "",
      project: about !== null ? about.project : "",
      worldwide: about !== null ? about.worldwide : "",
      summary: about !== null ? about.summary : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof aboutFormSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/about", values);

      if (response.data.success) {
        router.refresh();

        toast.success("About successfully saved.");
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
