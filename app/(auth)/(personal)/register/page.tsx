import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Parent Account — Flentra",
  description: "Create your free Flentra parent account to start monitoring your child's device usage, configure granular parental controls, set daily screen time limits, restrict apps, and protect your children in the digital world.",
};

import PersonalRegistrationForm from "@/features/auth-register/ui/PersonalRegistrationForm";
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
