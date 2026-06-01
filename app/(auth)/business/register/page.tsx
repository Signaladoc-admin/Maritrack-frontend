import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Your Business — Flentra",
  description: "Set up your organisation on Flentra Device Management. Provide your business details to create an enterprise MDM account, enrol devices, configure compliance policies, and invite your team members.",
};

import BusinessRegistrationForm from "@/features/auth-register/ui/BusinessRegistrationForm";
import { Header } from "@/shared/ui/layout/header";

export default function BusinessRegistrationPage() {
  return (
    <div className="space-y-7">
      <Header
        className="pt-0"
        title="Hi Grace, Tell us about your business"
        subtitle="Give us more information about your business"
      />
      <BusinessRegistrationForm />
    </div>
  );
}
