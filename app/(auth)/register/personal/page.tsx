import PersonalRegistrationForm from "@/features/auth/ui/PersonalRegistrationForm";
import { Header } from "@/shared/ui/layout/header";

export default function PersonalRegistrationPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-7 px-5 py-10">
      <Header
        className="pt-0"
        title="Get started"
        subtitle="Login to manage your inventory services"
      />
      <PersonalRegistrationForm />
    </div>
  );
}
