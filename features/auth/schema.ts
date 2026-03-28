import { z } from "zod";

export const otpConfirmFormSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

export type OtpConfirmFormValues = z.infer<typeof otpConfirmFormSchema>;
