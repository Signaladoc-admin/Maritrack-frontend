import * as z from "zod";

export const BusinessSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  adminBusinessRole: z.enum(["ORGANIZATION_ADMIN"]),
  address: z.string(),
  state: z.string(),
  country: z.string(),
  organizationSize: z.enum(["SIZE_1_9"]),
  estimatedDevices: z.number(),
  profileId: z.string(),
});

export type Business = z.infer<typeof BusinessSchema>;

export const CreateBusinessSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  adminBusinessRole: z.enum(["ORGANIZATION_ADMIN"]),
  password: z.string(),
  address: z.string(),
  state: z.string(),
  country: z.string(),
  organizationSize: z.enum(["SIZE_1_9"]),
  estimatedDevices: z.number(),
  deleted: z.boolean().optional(),
});

export type CreateBusinessDto = z.infer<typeof CreateBusinessSchema>;

export const UpdateBusinessSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  state: z.string(),
  country: z.string(),
  organizationSize: z.enum(["SIZE_1_9"]),
  estimatedDevices: z.number(),
});

export type UpdateBusinessDto = z.infer<typeof UpdateBusinessSchema>;

export const BusinessProfileSchema = z.object({
  profile: z.string(),
  departments: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
});

export type BusinessProfileDto = z.infer<typeof BusinessProfileSchema>;

export interface BusinessProfileFilterParams {
  name?: string;
}
