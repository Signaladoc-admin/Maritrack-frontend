import * as z from "zod";

export const ParentProfileSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional().nullable(),
  address: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  deletedAt: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ParentProfile = z.infer<typeof ParentProfileSchema>;

export const UpdateParentProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profilePicture: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional().nullable(),
  address: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

export type UpdateParentProfileSchemaValues = z.infer<typeof UpdateParentProfileSchema>;

export const CreateParentSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  address: z.string(),
  state: z.string(),
  userId: z.string(),
  country: z.string(),
  deleted: z.boolean().optional(),
});

export type CreateParentDto = z.infer<typeof CreateParentSchema>;

export const UpdateParentSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export type UpdateParentDto = z.infer<typeof UpdateParentSchema>;

export interface ParentFilterParams {
  name?: string;
}
