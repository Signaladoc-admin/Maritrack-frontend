import BusinessRegistrationForm from "@/features/auth/ui/BusinessRegistrationForm";
import { Header } from "@/shared/ui/layout/header";

export default function BusinessRegistrationPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <Header
        className="pt-0"
        title="Hi Grace, Tell us about your business"
        subtitle="Give us more information about your business"
      />
      <BusinessRegistrationForm />
    </div>
  );
}
