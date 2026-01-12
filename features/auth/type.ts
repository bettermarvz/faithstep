import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be at most 50 characters."),
    email: z
      .string()
      .min(5, "Email must be at least 5 characters.")
      .max(32, "Email must be at most 32 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password must be at most 100 characters."),
    confirmPassword: z.string().min(8, "Please confirm your password."),
  })
  .refine((data) => data["password"] === data["confirmPassword"], {
    message: "Passwords do not match.",
  });
