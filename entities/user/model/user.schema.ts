import * as z from "zod";

export const UserProfileSchema = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "USER"]),
  imageUrl: z.string().optional().nullable(),
  isFirstLogin: z.boolean().optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterValues = z.infer<typeof registerSchema>;
