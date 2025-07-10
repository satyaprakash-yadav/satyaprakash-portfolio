import { z } from "zod";

export const UploadPdfFormSchema = z.object({
    pdf: z.string(),
});
