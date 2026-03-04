import * as z from "zod";

export const UserProfileSchema = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "USER"]),
  imageUrl: z.string().optional().nullable(),
  isFirstLogin: z.boolean().optional(),
  isEmailVerified: z.boolean().optional(),
  status: z.string().optional(),
  phone: z.string().optional().nullable(),
  firstLogin: z.boolean().optional(),
  isOnline: z.boolean().optional(),
  parentId: z.string().optional(),
  zoneId: z.array(z.string()).optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export interface IUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  imageUrl: string;
  isFirstLogin?: boolean;
  isEmailVerified?: boolean;
  parentId: string;
  zoneId: {
    name: string;
    id: string;
    mdmZoneId: string;
  }[];
}

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string(),
  lastName: z.string(),
});

export type RegisterValues = z.infer<typeof registerSchema>;

// --- Update Profile ---
export const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  imageUrl: z.string().optional(),
  phone: z.string().optional(),
  profileImage: z.any().optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export interface AdminUpdateProfileDto extends UpdateProfileDto {
  role?: "ADMIN" | "USER";
  status?: string;
}

// --- Password Operations ---
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export const resetForgottenPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ResetForgottenPasswordDto = z.infer<typeof resetForgottenPasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

// --- Support ---
export const supportRequestSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type SupportRequestDto = z.infer<typeof supportRequestSchema>;

// --- Filter / Search ---
export interface UserFilterParams {
  name?: string;
  status?: string;
  role?: string;
}
