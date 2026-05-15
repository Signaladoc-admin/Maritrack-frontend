import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Flentra Business",
  description: "Reset your Flentra business account password. Enter your registered business email address to receive a secure reset link and restore access to your organisation's device management dashboard.",
};

import { Header } from "@/shared/ui/layout/header";
import ForgotPasswordForm from "@/features/auth/ui/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <Header title="Forgot password" subtitle="Let's reset your password" />
      <ForgotPasswordForm />
    </div>
  );
}
