"use client";

import { Button } from "@/shared/ui/button";
import HaveAnAccount from "./HaveAnAccount";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpConfirmFormSchema, OtpConfirmFormValues } from "../schema";
import { useNewUserStore } from "@/shared/stores/user.store";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { OtpInputField } from "./OtpInputField";
import { useRouter } from "next/navigation";
import { useVerifyAccount } from "../model/useVerifyAccount";

export default function OtpConfirmForm() {
  const router = useRouter();
  const { verifyAccount, isSubmitting: isVerifying } = useVerifyAccount();
  const { setToken, registrationType } = useNewUserStore();
  const [token] = useQueryState("token");

  const { email, password } = useNewUserStore.getState();
  console.log(email, password)

  useEffect(() => {
    if (token) setToken(token);
  }, [token, setToken]);

  const form = useForm<OtpConfirmFormValues>({
    resolver: zodResolver(otpConfirmFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpConfirmFormValues) => {
    // Blur the active OTP input before the async submission so the Enter
    // key event doesn't carry over to the login form after navigation.
    (document.activeElement as HTMLElement)?.blur();
    try {
      await verifyAccount({ otp: data.otp, email: email || "" });
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleChangeEmail = () => {
    if (registrationType === "business") {
      router.push("/business/register");
    } else {
      router.push("/register");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      <Controller
        control={form.control}
        name="otp"
        render={({ field }) => (
          <OtpInputField
            value={field.value}
            onChange={field.onChange}
            error={form.formState.errors.otp?.message}
            email={email || ""}
            length={6}
            onChangeEmail={handleChangeEmail}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={isVerifying}>
        {isVerifying ? "Verifying..." : "Continue"}
      </Button>

      <HaveAnAccount />
    </form>
  );
}
