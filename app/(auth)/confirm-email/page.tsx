import AuthLayout from "@/features/auth/ui/AuthLayout";
import OtpConfirmForm from "@/features/auth/ui/OtpConfirmForm";
import { Header } from "@/shared/ui/layout/header";

export default function ConfirmEmail() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <Header
          title="Confirm your email"
          subtitle="We have sent an otp to ex***@gmail.co, please enter the code sent below"
        />
        <OtpConfirmForm />
      </div>
    </AuthLayout>
  );
}
