import * as z from "zod";

export const portfolioSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  githubUrl: z.string(),
  demoUrl: z.string(),
});

export const portfolioFormSchema = z.object({
  image: z.string(),
  thumbnail: z.string(),
  title: z.string().min(1, { message: "Please enter title." }),
  description: z.string().min(1, { message: "Please enter description." }),
  githubUrl: z.string().min(1, { message: "Please enter GitHub URL." }),
  demoUrl: z.string().min(1, { message: "Please enter demo URL." }),
  tags: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Please enter tag." }),
      })
    )
    .optional(),
});
