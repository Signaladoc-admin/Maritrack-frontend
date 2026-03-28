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
