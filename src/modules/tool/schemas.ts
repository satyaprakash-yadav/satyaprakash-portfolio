import * as z from "zod";

export const toolSchema = z.object({
    id: z.string(),
    image: z.string(),
    thumnail: z.string(),
    name: z.string(),
    color: z.string(),
});
