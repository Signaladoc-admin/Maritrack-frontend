import { Header } from "@/shared/ui/layout/header";
import RegisterForm from "@/features/auth-register/ui/RegisterForm";
import AuthLayout from "@/features/auth/ui/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <Header title="Create an account" subtitle="Enter your details to get started" />
        <RegisterForm />
      </div>
    </AuthLayout>
  );
}
