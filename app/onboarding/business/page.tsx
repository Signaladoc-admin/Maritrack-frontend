import type { Metadata } from "next";
import OnboardingPage from "@/features/onboarding/business/ui/OnboardingPage";

export const metadata: Metadata = {
  title: "Business Onboarding — Flentra",
  description:
    "Set up your Flentra business account through our comprehensive organisation onboarding flow. Provide your company name, industry, and contact details to create your business profile, configure your MDM zone settings, define device policies and security compliance rules, and invite your first team members. This guided setup process ensures your organisation is fully equipped to enrol, monitor, and manage employee devices from day one — with all security policies and access controls in place before any device is activated.",
};

export default function BusinessOnboardingPage() {
  return (
    <div className="mx-auto max-w-4xl p-5">
      <OnboardingPage />
    </div>
  );
}
