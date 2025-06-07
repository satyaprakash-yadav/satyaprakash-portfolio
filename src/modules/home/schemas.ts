import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(1, { message: "name field is required." }),
    email: z.string().email({ message: "email field is required." }),
    subject: z.string().min(1, { message: "subject field is required." }),
    message: z.string().min(1, { message: "message field is required." }),
});

