import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Flentra",
  description: "Reset your Flentra parent account password. Enter your registered email address and we'll send you a secure one-time link to create a new password and regain access to your account.",
};

import { Header } from "@/shared/ui/layout/header";
import ForgotPasswordForm from "@/features/auth/ui/ForgotPasswordForm";
// import AuthLayout from "@/features/auth/ui/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    // <AuthLayout>
    <div className="space-y-6">
      <Header title="Forgot password" subtitle="Let's reset your password" />
      <ForgotPasswordForm />
    </div>
    // </AuthLayout>
  );
}
