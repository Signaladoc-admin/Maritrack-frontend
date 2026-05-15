import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Login — Flentra",
  description: "Sign in to your Flentra parent account to monitor and manage your child's digital activity, configure parental controls, track device usage, and ensure your family's online safety.",
};

import { Header } from "@/shared/ui/layout/header";
import LoginForm from "@/features/auth-login/ui/LoginForm";
// import AuthLayout from "@/features/auth/ui/AuthLayout";

export default function LoginPage() {
  return (
    // <AuthLayout>
    <div className="space-y-6">
      <Header title="Welcome back" subtitle="Log in to manage your session" />
      <LoginForm />
    </div>
    // </AuthLayout>
  );
}
