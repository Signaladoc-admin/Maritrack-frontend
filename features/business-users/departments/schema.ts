import z from "zod";

export const CreateDepartmentValues = z.object({
  name: z.string().min(1, "Department name is required"),
});

export type CreateDepartmentValues = z.infer<typeof CreateDepartmentValues>;

export const UpdateDepartmentValues = CreateDepartmentValues.extend({});

export type UpdateDepartmentValues = z.infer<typeof UpdateDepartmentValues>;
