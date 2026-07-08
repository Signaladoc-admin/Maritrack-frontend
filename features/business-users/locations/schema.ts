import z from "zod";

export const createLocationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
});

export type CreateLocationValues = z.infer<typeof createLocationSchema>;

export const updateLocationSchema = createLocationSchema.extend({});

export type UpdateLocationValues = z.infer<typeof updateLocationSchema>;
