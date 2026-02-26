import * as z from "zod";

export const ChildProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.coerce.number(),
  gender: z.enum(["MALE", "FEMALE"]),
  image: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(), // some domains may keep parentId decoupled or named difference
});
export type ChildProfile = z.infer<typeof ChildProfileSchema>;

export const CreateChildSchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
  gender: z.enum(["MALE", "FEMALE"]),
  parentId: z.string(),
});
export type CreateChildDto = z.infer<typeof CreateChildSchema>;

export const UpdateChildSchema = z.object({
  name: z.string().optional(),
  age: z.coerce.number().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
});
export type UpdateChildDto = z.infer<typeof UpdateChildSchema>;

export interface ChildFilterParams {
  parentId?: string;
  [key: string]: any;
}
