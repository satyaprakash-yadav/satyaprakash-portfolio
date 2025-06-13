import { z } from "zod";

export const experienceFormSchema = z.object({
    items: z
        .array(
            z.object({
                type: z.string().min(1, { message: "Please enter type." }),
                skill: z.string().min(1, { message: "Please enter skill." }),
                level: z.string().min(1, { message: "Please enter level." }),
            })
        )
        .optional()
});
