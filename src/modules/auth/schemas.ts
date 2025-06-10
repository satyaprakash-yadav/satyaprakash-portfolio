import * as z from "zod";

export const formSchema = z.object({
    email: z.string().email({ message: "Please enter valid email address." }),
    password: z.string().min(1, { message: "Please enter password." }),
});
