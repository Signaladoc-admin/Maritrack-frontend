"use client";

import LandingV2PageShell from "@/features/landing-v2/ui/LandingV2PageShell";
import SignInSection from "@/features/landing-v2/ui/SignInSection";

export default function SignInV2() {
  return (
    <LandingV2PageShell animateInitial>
      <SignInSection />
    </LandingV2PageShell>
  );
}
