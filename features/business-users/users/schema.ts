import z from "zod";

export const CreateDepartmentValues = z.object({
  name: z.string().min(1, "Department name is required"),
});

export type CreateDepartmentValues = z.infer<typeof CreateDepartmentValues>;

export const updateDepartmentValues = CreateDepartmentValues.extend({});

export type UpdateDepartmentValues = z.infer<typeof updateDepartmentValues>;

export const assignDeviceToUserSchema = z.object({
  staffId: z.string("Invalid staff ID"),
});

export type AssignDeviceToUserValues = z.infer<typeof assignDeviceToUserSchema>;
