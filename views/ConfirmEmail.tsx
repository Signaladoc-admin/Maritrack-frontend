"use client";

import OtpConfirmForm from "@/features/auth/ui/OtpConfirmForm";
import { useNewUserStore } from "@/shared/stores/user.store";
import { Header } from "@/shared/ui/layout/header";

function maskEmail(email: string) {
  if (!email) return "your email";
  const [name, domain] = email.split("@");
  if (!domain) return email;
  const maskedName = name.length > 2 ? `${name.substring(0, 2)}***` : `${name.substring(0, 1)}*`;
  return `${maskedName}@${domain}`;
}

export default function ConfirmEmail() {
  const { email } = useNewUserStore();

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
