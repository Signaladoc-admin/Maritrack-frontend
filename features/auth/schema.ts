import { z } from "zod";

export const personalRegistrationFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PersonalRegistrationFormValues = z.infer<typeof personalRegistrationFormSchema>;

export const otpConfirmFormSchema = z.object({
  otp: z.string().min(4, "OTP must be 4 digits"),
});

export type OtpConfirmFormValues = z.infer<typeof otpConfirmFormSchema>;

export const businessRegistrationFormSchema = z
  .object({
    businessName: z.string().min(1, "Business name is required"),
    businessEmail: z.string().email("Invalid email address"),
    businessPhoneNumber: z.string().min(1, "Business phone number is required"),
    businessPassword: z.string().min(1, "Business password is required"),
    businessConfirmPassword: z.string().min(1, "Business confirm password is required"),
  })
  .refine((data) => data.businessPassword === data.businessConfirmPassword, {
    message: "Passwords do not match",
    path: ["businessConfirmPassword"],
  });

export type BusinessRegistrationFormValues = z.infer<typeof businessRegistrationFormSchema>;
