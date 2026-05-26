"use client";

import { Button } from "@/shared/ui/button";
import { OTPInput } from "@/shared/ui/otp-input";
import { InputGroup } from "@/shared/ui/input-group";
import HaveAnAccount from "./HaveAnAccount";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpConfirmFormSchema, OtpConfirmFormValues } from "../schema";
import { useValidateOtp } from "../model/useValidateOtp";
import { useNewUserStore } from "@/shared/stores/user.store";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useResendVerification } from "../model/useResendVerification";

export default function OtpConfirmForm() {
  const { validateOtp, isSubmitting: isVerifying } = useValidateOtp();
  const { resendVerification, isSubmitting: isResending } = useResendVerification();
  const { setToken, email } = useNewUserStore();
  const [token] = useQueryState('token');
  const [countdown, setCountdown] = useState(30);

  let interval: NodeJS.Timeout;

  function handleInitCountdown() {
    interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

  }

  useEffect(() => {
    if (token) setToken(token);
    handleInitCountdown()
    return () => clearInterval(interval);
  }, [token, setToken]);

  const form = useForm<OtpConfirmFormValues>({
    resolver: zodResolver(otpConfirmFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function handleResend() {
    if (!email) return;
    setCountdown(30);
    handleInitCountdown();
    await resendVerification({ email });
  }

  const onSubmit = async (data: OtpConfirmFormValues) => {
    try {
      await validateOtp({ otp: data.otp });
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-2">
        <InputGroup label="Enter OTP">
          <Controller
            control={form.control}
            name="otp"
            render={({ field }) => (
              <div className="space-y-2">
                <OTPInput value={field.value} onChange={field.onChange} length={6} />
                {form.formState.errors.otp && (
                  <p className="text-destructive text-sm">{form.formState.errors.otp.message}</p>
                )}
              </div>
            )}
          />
        </InputGroup>
        <div className="text-muted-foreground flex items-center justify-between text-sm font-medium">
          <Button variant="link" type="button" className="text-muted-foreground px-0 py-0 h-auto!" disabled={countdown > 0 || isResending} onClick={handleResend}>
            {isResending ?
              <>
                Resending...
              </>
              : countdown > 0 ?
                <>
                  Resend in {countdown}s
                </>
                : "Resend code"}
          </Button>
          <Button variant="link" className="text-muted-foreground px-0 py-0 h-auto!">
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
