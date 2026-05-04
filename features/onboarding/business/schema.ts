import z from "zod";

export const businessDetailsSchema = z.object({
  profile: z.string().min(1, "Business profile is required"),
  departments: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
});
export type BusinessDetailsSchemaValues = z.infer<typeof businessDetailsSchema>;

export const teamMemberSchema = z.object({
  email: z.email("Invalid email"),
  location: z.string().min(1, "Location is required"),
});
export type TeamMemberSchemaValues = z.infer<typeof teamMemberSchema>;

export const teamMemberSchemaInApp = z.object({
  email: z.email("Invalid email"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessRole: z.string().min(1, "Business role is required"),
  location: z.string().min(1, "Location is required"),
  position: z.string().min(1, "Position is required"),
  departmentId: z.string().min(1, "Department is required"),
  phone: z.string().min(1, "Phone is required"),
});
export type TeamMemberSchemaValuesInApp = z.infer<typeof teamMemberSchemaInApp>;
