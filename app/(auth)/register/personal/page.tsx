import PersonalRegistrationForm from "@/features/auth/ui/PersonalRegistrationForm";
import { Header } from "@/shared/ui/layout/header";

export default function PersonalRegistrationPage() {
  return (
    <div className="space-y-7">
      <Header
        className="pt-0"
        title="Get started"
        subtitle="Login to manage your inventory services"
      />
      <PersonalRegistrationForm />
    </div>
  );
}
