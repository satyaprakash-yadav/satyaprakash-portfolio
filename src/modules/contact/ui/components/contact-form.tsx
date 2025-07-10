/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { formSchema } from "../../../home/schemas";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/send", values);

      if (response.data.success) {
        form.reset();
        toast.success("Your message has been successfully sent.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 -mt-1"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your name"
                  autoComplete="name"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="subject"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Subject</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your subject"
                  autoComplete="subject"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Type your message here."
                  className="resize-none overflow-hidden min-h-29 h-29"
                  autoComplete="message"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            variant="default"
            className="mt-2"
            disabled={loading}
          >
            {loading && (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Sending...
              </>
            )}
            {!loading && <>Send Message</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
