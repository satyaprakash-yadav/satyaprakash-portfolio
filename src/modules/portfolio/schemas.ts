import * as z from "zod";

export const portfolioSchema = z.object({
    id: z.string(),
    image: z.string(),
    title: z.string(),
    description: z.string(),
    githubUrl: z.string(),
    demoUrl: z.string(),
});
