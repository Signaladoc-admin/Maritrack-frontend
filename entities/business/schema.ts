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

// Departments and locations are managed as their own entities (via the departments/
// locations endpoints), so the business-profiles payload carries only `profile`.
export const BusinessProfileSchema = z.object({
    profile: z.string().min(1, "Business profile is required"),
});

export type BusinessProfileDto = z.infer<typeof BusinessProfileSchema>;

// Updating a business profile requires nothing — any subset of fields may be sent.
export const UpdateBusinessProfileSchema = BusinessProfileSchema.partial();

export type UpdateBusinessProfileDto = z.infer<typeof UpdateBusinessProfileSchema>;

export interface BusinessProfileFilterParams {
    name?: string;
}