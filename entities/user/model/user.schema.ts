import * as z from "zod";

const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "At least 1 uppercase letter")
  .regex(/[a-z]/, "At least 1 lowercase letter")
  .regex(/[0-9]/, "At least 1 number")
  .regex(/[^A-Za-z0-9]/, "At least 1 symbol");

export const BUSINESS_ROLES = [
  "ORGANIZATION_ADMIN",
  "DEVICE_MANAGER",
  "DEPARTMENT_MANAGER",
] as const;
export type BusinessRole = (typeof BUSINESS_ROLES)[number];

export const UserProfileSchema = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  businessRole: z.enum(BUSINESS_ROLES).optional().nullable(),
  businessId: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  isFirstLogin: z.boolean().optional(),
  isEmailVerified: z.boolean().optional(),
  status: z.string().optional(),
  phone: z.string().optional().nullable(),
  firstLogin: z.boolean().optional(),
  isOnline: z.boolean().optional(),
  parentId: z.string().optional().nullable(),
  zoneId: z.array(z.string()).optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

/** True when the user belongs to a business account */
export const isBusinessUser = (user: UserProfile | null | undefined): boolean =>
  !!user?.businessRole;

/** True when the user is a personal parent account */
export const isPersonalUser = (user: UserProfile | null | undefined): boolean =>
  !!user && !user.businessRole && user.role !== "ADMIN";

export interface IUserProfile {
  id: string;
  email: string;
  status: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  imageUrl: string;
  isFirstLogin?: boolean;
  isEmailVerified?: boolean;
  parentId: string | null;
  businessId: string | null;
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
  password: passwordSchema,
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
  status: z.string().optional(),
  profilePicture: z.any().optional(),
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
