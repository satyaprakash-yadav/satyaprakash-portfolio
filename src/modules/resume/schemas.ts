import { z } from "zod";

export const UploadPdfFormSchema = z.object({
    pdf: z.string(),
});

export const CvFormSchema = z.object({
    name: z.string().min(1, { message: "Please enter name."}),
    email: z.string().email({ message: "Please enter valid email address." }),
    company: z.optional(z.string()),
});
