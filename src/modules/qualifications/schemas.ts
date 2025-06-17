import * as z from "zod";

export const qualificationFormSchema = z
  .object({
    type: z.string().min(1, { message: "Please select type." }),
    degree: z.string(),
    school: z.string(),
    position: z.string(),
    company: z.string(),
    startYear: z.string().min(1, { message: "Please enter start year." }),
    endYear: z.string().min(1, { message: "Please enter end year." }),
  })
  .superRefine((values, context) => {
    if (values.type === "EDUCATION" && !values.degree) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter degree.",
        path: ["degree"],
      });
    }

    if (values.type === "EDUCATION" && !values.school) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter school",
        path: ["school"],
      });
    }

    if (values.type === "EXPERIENCE" && !values.position) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter position.",
        path: ["position"],
      });
    }

    if (values.type === "EXPERIENCE" && !values.company) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter company.",
        path: ["company"],
      });
    }
  });

export const qualificationSchema = z.object({
  id: z.string(),
  type: z.enum(["EDUCATION", "EXPERIENCE"]),
  degree: z.string(),
  school: z.string(),
  position: z.string(),
  company: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});