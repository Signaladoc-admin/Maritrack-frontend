import * as z from "zod";

export const UpdateBusinessSchema = z.object({
    name: z.string(),
    address: z.string(),
    state: z.string(),
    country: z.string(),
    organizationSize: z.enum(["SIZE_1_9"]).optional(),
    estimatedDevices: z.number().optional(),
    imageUrl: z.instanceof(File).optional(),
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