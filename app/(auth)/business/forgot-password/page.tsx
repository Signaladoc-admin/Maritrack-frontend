import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Flentra Business",
  description: "Reset your Flentra business account password. Enter your registered business email address to receive a secure reset link and restore access to your organisation's device management dashboard.",
};

import ForgotPasswordForm from "@/features/auth/ui/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordForm />
  );
}
