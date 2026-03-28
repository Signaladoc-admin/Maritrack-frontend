import * as z from "zod";

export const ParentProfileSchema = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "USER"]),
  imageUrl: z.string().optional().nullable(),
  isFirstLogin: z.boolean().optional(),
  gender: z.enum(["MOTHER", "FATHER"]).optional().nullable(),
  address: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

export type ParentProfile = z.infer<typeof ParentProfileSchema>;

export const CreateParentSchema = z.object({
  gender: z.enum(["MOTHER", "FATHER"]),
  address: z.string(),
  state: z.string(),
  userId: z.string(),
  country: z.string(),
  deleted: z.boolean().optional(),
});

export type CreateParentDto = z.infer<typeof CreateParentSchema>;

export const UpdateParentSchema = z.object({
  gender: z.enum(["MOTHER", "FATHER"]).optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  userId: z.string().optional(),
  country: z.string().optional(),
  deleted: z.boolean().optional(),
});

export type UpdateParentDto = z.infer<typeof UpdateParentSchema>;

export interface ParentFilterParams {
  name?: string;
}
