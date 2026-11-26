import { z } from "zod";

/**
 * Shared by the browser (instant feedback) and the API route (the source of truth).
 * Error messages say what is wrong and how to fix it.
 */
export const contactSchema = z.object({
  name: z
    .string({ required_error: "Enter your name." })
    .trim()
    .min(2, "Enter your name (at least 2 characters).")
    .max(80, "Use 80 characters or fewer for your name."),
  email: z
    .string({ required_error: "Enter your email address." })
    .trim()
    .toLowerCase()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address, like name@example.com.")
    .max(254, "Use an email address under 254 characters."),
  subject: z
    .string()
    .trim()
    .max(120, "Use 120 characters or fewer for the subject.")
    .optional(),
  message: z
    .string({ required_error: "Write a message." })
    .trim()
    .min(10, "Write at least 10 characters so I know how to help.")
    .max(4000, "Keep the message under 4,000 characters."),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "subject" | "message";
