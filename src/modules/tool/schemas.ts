import * as z from "zod";

export const toolSchema = z.object({
    id: z.string(),
    image: z.string(),
    thumnail: z.string(),
    name: z.string(),
    color: z.string(),
});

export const toolFormSchema = z.object({
    image: z.string(),
    thumbnail: z.string(),
    name: z.string().min(1, { message: "Please enter name." }),
    color: z.string().min(1, { message: "Please select color." }),
});
