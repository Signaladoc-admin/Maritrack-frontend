import type { Metadata } from "next";
import ForgotPasswordV2 from "@/views/ForgotPasswordV2";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Flentra portal account password.",
  alternates: { canonical: "/forgot-password" },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordV2 />;
}
