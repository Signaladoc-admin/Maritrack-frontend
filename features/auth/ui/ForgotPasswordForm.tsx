"use client";

import { passwordSchema } from "@/features/auth-register/schema";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { Header } from "@/shared/ui/layout/header";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useForgotPassword } from "../model/useForgotPassword";
import { useResetPassword } from "../model/useResetPassword";
import { OtpInputField } from "./OtpInputField";

type Step = 1 | 2;

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailValue = z.infer<typeof emailSchema>;

export default function ForgotPasswordForm() {
  const pathname = usePathname();
  const isBusinessAuthRoute = pathname?.includes("/business");

  const [step, setStep] = useState<Step>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmailValue>({
    resolver: zodResolver(emailSchema),
  });
  const { forgotPassword, isSubmitting } = useForgotPassword();

  const email = watch("email");

  const subtitle =
    step === 1
      ? "Let's reset your password"
      : `A 5 digit code has been sent to ${email}.\nPlease enter it to confirm your new password`;

  const onSubmit = async (data: EmailValue) => {
    await forgotPassword(data);
    setStep(2);
  };

  return (
    <div className="space-y-7">
      <Header title="Forgot password" subtitle={subtitle} />
      {step === 1 && (
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            placeholder="abcde@example.com"
            label="Email address"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Continue"}
          </Button>
        </form>
      )}
      {step === 2 && (
        <ChangePassword email={email} onChangeEmail={() => setStep(1)} />
      )}
      <p className="text-center text-sm">
        Remember your password?{" "}
        <Link
          href={isBusinessAuthRoute ? "/business/login" : "/login"}
          className="text-primary font-semibold"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

const changePasswordSchema = z
  .object({
    otp: z.string().min(6, "Please enter a valid OTP"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordValue = z.infer<typeof changePasswordSchema>;

function ChangePassword({
  email,
  onChangeEmail,
}: {
  email: string;
  onChangeEmail?: () => void;
}) {
  const form = useForm<ChangePasswordValue>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { resetForgottenPassword, isResettingForgotten } = useResetPassword();

  const onSubmit = async (data: ChangePasswordValue) => {
    const payload = {
      password: data.newPassword,
      otp: data.otp,
      email,
      token: undefined,
    };
    await resetForgottenPassword(payload);
  };

  return (
    <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="otp"
        render={({ field }) => (
          <OtpInputField
            value={field.value}
            onChange={field.onChange}
            error={errors.otp?.message}
            email={email}
            showChangeEmail={true}
            onChangeEmail={onChangeEmail}
          />
        )}
      />
      <InputGroup
        label="Create new password"
        type="password"
        placeholder="••••••••"
        isPasswordValidationEnabled
        {...register("newPassword")}
        error={errors.newPassword?.message}
      />
      <InputGroup
        label="Confirm new password"
        type="password"
        placeholder="••••••••"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <Button className="w-full" type="submit" disabled={isResettingForgotten}>
        {isResettingForgotten ? "Resetting..." : "Reset password"}
      </Button>
    </form>
  );
}
