import { z } from "zod";

  export const registerSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // Only the page has a confirm field, so it gets its own extended schema
  export const registerFormSchema = registerSchema
    .extend({ confirmPassword: z.string() })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  export type RegisterFormInput = z.infer<typeof registerFormSchema>;
  export type RegisterFieldErrors = Partial<Record<keyof RegisterFormInput, string[]>>;