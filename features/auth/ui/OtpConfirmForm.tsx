"use client";

import { Button } from "@/shared/ui/button";
import { OTPInput } from "@/shared/ui/otp-input";
import { InputGroup } from "@/shared/ui/input-group";
import HaveAnAccount from "./HaveAnAccount";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpConfirmFormSchema, OtpConfirmFormValues } from "../schema";
import { useRouter } from "next/navigation";
import { useNewUserStore } from "@/shared/stores/user-store";
import { useValidateOtp } from "../model/useValidateOtp";

export default function OtpConfirmForm() {
  const router = useRouter();
  const { email, password, setEmail, setPassword } = useNewUserStore();
  const { validateOtp, isSubmitting: isVerifying } = useValidateOtp();

  const form = useForm<OtpConfirmFormValues>({
    resolver: zodResolver(otpConfirmFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpConfirmFormValues) => {
    try {
      await validateOtp(data);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
      <div className="space-y-2">
        <InputGroup label="Enter OTP">
          <Controller
            control={form.control}
            name="otp"
            render={({ field }) => (
              <div className="space-y-2">
                <OTPInput value={field.value} onChange={field.onChange} length={4} />
                {form.formState.errors.otp && (
                  <p className="text-destructive text-sm">{form.formState.errors.otp.message}</p>
                )}
              </div>
            )}
          />
        </InputGroup>
        <div className="text-muted-foreground flex items-center justify-between text-sm font-medium">
          <Button variant="link" className="text-muted-foreground px-0">
            Resend code in 10s
          </Button>
          <Button variant="link" className="text-muted-foreground px-0">
            Change email
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isVerifying}>
        {isVerifying ? "Verifying..." : "Continue"}
      </Button>
      <HaveAnAccount />
    </form>
  );
}
