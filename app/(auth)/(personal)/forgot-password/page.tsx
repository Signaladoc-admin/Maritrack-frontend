import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Flentra",
  description: "Reset your Flentra parent account password. Enter your registered email address and we'll send you a secure one-time link to create a new password and regain access to your account.",
};

import ForgotPasswordForm from "@/features/auth/ui/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordForm />
  );
}
