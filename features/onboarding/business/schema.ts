import { BUSINESS_ROLES } from "@/entities/user/model/user.schema";
import z from "zod";

export const businessDetailsSchema = z.object({
  profile: z.string().min(1, "Business profile is required"),
  departments: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
});
export type BusinessDetailsSchemaValues = z.infer<typeof businessDetailsSchema>;

export const staffMemberSchema = z.object({
  email: z.email("Invalid email"),
  location: z.string().min(1, "Location is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessRole: z.enum(BUSINESS_ROLES),
  position: z.string().min(1, "Position is required"),
  departmentId: z.string().min(1, "Department is required"),
  phone: z.string().min(1, "Phone is required"),
});
export type StaffMemberValues = z.infer<typeof staffMemberSchema>;
export type UpdateStaffMemberValues = Omit<
  StaffMemberValues,
  "email" | "firstName" | "lastName" | "phone"
>;

export const onboardingStaffMemberSchema = z.object({
  email: z.email("Invalid email"),
  location: z.string().min(1, "Location is required"),
});
export type OnboardingStaffMemberValues = z.infer<typeof onboardingStaffMemberSchema>;
