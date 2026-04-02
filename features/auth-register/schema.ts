import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "At least 1 uppercase letter")
  .regex(/[a-z]/, "At least 1 lowercase letter")
  .regex(/[0-9]/, "At least 1 number")
  .regex(/[^A-Za-z0-9]/, "At least 1 symbol");

export const personalRegistrationFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PersonalRegistrationFormValues = z.infer<typeof personalRegistrationFormSchema>;

export const businessRegistrationFormSchema = z
  .object({
    businessName: z.string().min(1, "Business name is required"),
    businessEmail: z.string().email("Invalid email address"),
    organizationSize: z.enum(["SIZE_1_9", "SIZE_10_49", "SIZE_50_PLUS"]),
    estimatedDevices: z.string().min(1, "Estimated number of devices is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Business confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type BusinessRegistrationFormValues = z.infer<typeof businessRegistrationFormSchema>;

const parentGenderValues = ["MALE", "FEMALE", "OTHER"] as const;

export const parentRegistrationFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
    gender: z.enum(parentGenderValues, {
      error: () => ({ message: "Select a gender" }),
    }),
    address: z.string().min(1, "Enter your address"),
    country: z.string().min(1, "Select a country"),
    state: z.string().min(1, "Select a state"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ParentRegistrationFormValues = z.infer<typeof parentRegistrationFormSchema>;
