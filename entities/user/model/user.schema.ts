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

export const BusinessRoleEnum = {
  ORGANIZATION_ADMIN: "ORGANIZATION_ADMIN",
  DEVICE_MANAGER: "DEVICE_MANAGER",
  DEPARTMENT_MANAGER: "DEPARTMENT_MANAGER",
} as const;

export type BusinessRoleEnum = (typeof BusinessRoleEnum)[keyof typeof BusinessRoleEnum];

export type BusinessRole = (typeof BUSINESS_ROLES)[number];

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
  imageUrl: z.any().optional(),
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
  oldPassword: z.string().min(6, "Current password is required"),
  password: passwordSchema,
  confirmPassword: z.string(),
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

export const businessUserDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  department: z.string().optional(),
  businessRole: z.enum([BUSINESS_ROLES[1], BUSINESS_ROLES[2]], {
    error: (el: any) => ({
      message: `Select a valid business role from ${el.values
        .map((value: any) => value.replace("_", " "))
        .map((value: any) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
        .join(", ")}`,
    }),
  }).optional(),
  position: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
});
export type BusinessUserDetailsValues = z.infer<typeof businessUserDetailsSchema>;

export const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});
export type DepartmentValues = z.infer<typeof departmentSchema>;

export const roleSchema = z.object({
  role: z.string().min(1, "Role is required"),
});
export type RoleValues = z.infer<typeof roleSchema>;
