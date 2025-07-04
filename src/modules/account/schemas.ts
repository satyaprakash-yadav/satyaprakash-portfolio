import { z } from "zod";

export const PasswordFormSchema = z.object({
    current: z.string().min(8, { message: "Please enter at least 8 characters." }),
    password: z.string().min(8, { message: "Please enter at least 8 characters." }),
    confirm: z.string().min(8, { message: "Please enter at least 8 characters." }),
}).refine((data) => data.password === data.confirm, {
    message: "Password does not match.",
    path: ["confirm"]
});

export const ProfileFormSchema = z.object({
    name: z.string().min(1, { message: "Please enter name." }),
    email: z.string().email({ message: "Please enter valid email address." }),
});
