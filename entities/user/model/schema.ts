import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  department: z.string().min(1, "Select a department"),
  role: z.string().min(1, "Select a role"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "Select a state"),
  country: z.string().min(1, "Select a country"),
});

export type UserFormValues = z.infer<typeof userSchema>;
