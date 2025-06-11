import * as z from "zod";

export const formSchema = z.object({
    email: z.string().email({ message: "Please enter valid email address." }),
    password: z.string().min(1, { message: "Please enter password." }),
});

export const registerSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Email is required." }),
    password: z.string().min(8, { message: "Please enter at least 8 characters." }),
    confirmPassword: z.string().min(8, { message: "Please enter at least 8 characters." })
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords does not match.",
        path: ["confirmPassword"],
    });