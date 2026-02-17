import { Header } from "@/shared/ui/layout/header";
import LoginForm from "@/features/auth/ui/LoginForm";
import AuthLayout from "@/features/auth/ui/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <Header title="Welcome back" subtitle="Log in to manage your session" />
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
