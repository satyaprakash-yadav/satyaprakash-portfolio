"use client";

import * as z from "zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { formSchema } from "@/modules/auth/schemas";
import { signIn } from "next-auth/react";
import { AuthError } from "@auth/core/errors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

export const SignInView = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const error = searchParams.get("error");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      await signIn("credentials", {
        ...values,
        callbackUrl: "/admin",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { message: "Invalid credentials" };
          default:
            return { message: "An error occurred" };
        }
      }

      throw error;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>to continue to Dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle className="flex items-center gap-2">
              <AlertTriangle className="size-4" />
              Error
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 -mt-1"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email@example.com" />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              type="submit"
              variant="default"
              className="mt-2"
            >
              {loading && (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Signing in...
                </>
              )}
              {!loading && <>Sign In</>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
