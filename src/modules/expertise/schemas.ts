import * as z from "zod";

export const expertiseFormSchema = z.object({
    items: z.array(
        z.object({
            service: z.string().min(1, { message: "Please enter service." }),
            type: z.string().min(1, { message: "Please enter type." })
        })
    )
});
