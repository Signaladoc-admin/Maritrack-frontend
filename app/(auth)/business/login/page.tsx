import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Login — Flentra",
  description: "Sign in to your Flentra business account to manage your organisation's enrolled devices, monitor team activity, enforce security compliance policies, track company assets, and administer your MDM zone.",
};

import { Header } from "@/shared/ui/layout/header";
import LoginForm from "@/features/auth-login/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <Header title="Welcome back" subtitle="Log in to manage your session" />
      <LoginForm />
    </div>
  );
}
