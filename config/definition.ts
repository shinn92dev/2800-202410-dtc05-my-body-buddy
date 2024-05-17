import { z } from "zod";

export const SignupFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    username: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .trim(),
    password: z
        .string()
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Contain at least one special character.",
        })
        .trim(),
    security_question: z
        .string()
        .min(10, {
            message: "Security question must be at least 10 characters long.",
        })
        .trim(),
    security_answer: z
        .string()
        .min(5, {
            message: "Security answer must be at least 5 characters long.",
        })
        .trim(),
});

export type FormState =
    | {
          errors?: {
              email?: string[];
              username?: string[];
              password?: string[];
              securityQuestion?: string[];
              securityAnswer?: string[];
          };
          message?: string;
      }
    | undefined;
