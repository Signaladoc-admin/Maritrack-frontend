import { Header } from "@/shared/ui/layout/header";
import ForgotPasswordForm from "@/features/auth/ui/ForgotPasswordForm";
import AuthLayout from "@/features/auth/ui/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <Header title="Forgot password" subtitle="Let's reset your password" />
        <ForgotPasswordForm />
      </div>
    </AuthLayout>
  );
}
