import type { Metadata } from "next";
import PersonalOnboarding from "@/views/PersonalOnboarding";

export const metadata: Metadata = {
  title: "Parent Onboarding — Flentra",
  description:
    "Complete your Flentra parental account setup through our guided onboarding flow. Configure your parental control preferences, create profiles for each of your children by providing their name, age, and gender, choose a subscription plan that meets your family's needs, and pair each child's device using the unique QR code generated during setup. This step-by-step process ensures that Flentra is fully configured to monitor, protect, and manage your children's digital lives from day one.",
};

export default function PersonalOnboardingPage() {
  return <PersonalOnboarding />;
}
