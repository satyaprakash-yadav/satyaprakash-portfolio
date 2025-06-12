import { z } from "zod";

export const aboutFormSchema = z.object({
    experience: z.string().min(1, { message: "Please enter experience." }),
    project: z.string().min(1, { message: "Please enter project." }),
    worldwide: z.string().min(1, { message: "Please enter worldwide." }),
    summary: z.string().min(1, { message: "Please enter summary." }),
});
