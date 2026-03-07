"use client";

import OtpConfirmForm from "@/features/auth/ui/OtpConfirmForm";
import { useNewUserStore } from "@/shared/stores/user-store";
import { Header } from "@/shared/ui/layout/header";

export default function ConfirmEmail() {
  const { email, password, token, clearCredentials } = useNewUserStore();

  return (
    <div className="space-y-6">
      <Header
        title="Confirm your email"
        subtitle="We have sent an otp to ex***@gmail.co, please enter the code sent below"
      />
      <OtpConfirmForm />
    </div>
  );
}
