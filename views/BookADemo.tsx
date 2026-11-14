"use client";

import BookADemoSection from "@/features/landing-v2/ui/BookADemoSection";
import LandingV2PageShell from "@/features/landing-v2/ui/LandingV2PageShell";

export default function BookADemo() {
  return (
    <LandingV2PageShell animateInitial>
      <BookADemoSection />
    </LandingV2PageShell>
  );
}
