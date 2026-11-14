"use client";

import ForgotPasswordSection from "@/features/landing-v2/ui/ForgotPasswordSection";
import LandingV2PageShell from "@/features/landing-v2/ui/LandingV2PageShell";

export default function ForgotPasswordV2() {
  return (
    <LandingV2PageShell animateInitial>
      <ForgotPasswordSection />
    </LandingV2PageShell>
  );
}
