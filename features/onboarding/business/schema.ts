import z from "zod";

export const businessDetailsSchema = z.object({
  businessProfile: z.string().min(1, "Business profile is required"),
  departments: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
});
export type BusinessDetailsSchemaValues = z.infer<typeof businessDetailsSchema>;

export const teamMemberSchema = z.object({
  memberEmail: z.email("Invalid email"),
  location: z.string().min(1, "Location is required"),
});
export type TeamMemberSchemaValues = z.infer<typeof teamMemberSchema>;
