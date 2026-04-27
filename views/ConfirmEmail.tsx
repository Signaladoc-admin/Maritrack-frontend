"use client";

import OtpConfirmForm from "@/features/auth/ui/OtpConfirmForm";
import { useNewUserStore } from "@/shared/stores/user.store";
import { Header } from "@/shared/ui/layout/header";
import { useIsOnboarded } from "@/entities/user/model/useIsOnboarded";
import { useEffect } from "react";

function maskEmail(email: string) {
  if (!email) return "your email";
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const maskedName = name.length > 2 ? `${name.substring(0, 2)}***` : `${name.substring(0, 1)}*`;
  return `${maskedName}@${domain}`;
}

export default function ConfirmEmail() {
  const { email } = useNewUserStore();
  const { profile, isLoading, checkAndRedirect } = useIsOnboarded();

  useEffect(() => {
    if (profile && profile.isEmailVerified === true) {
      checkAndRedirect(profile);
    }
  }, [profile, checkAndRedirect]);

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500/30 border-t-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Confirm your email"
        subtitle={`We have sent an otp to ${maskEmail(email)}, please enter the code sent below`}
      />
      <OtpConfirmForm />
    </div>
  );
}
