"use client";

import ChallengeSection from "@/features/landing-v2/ui/ChallengeSection";
import ComplianceSection from "@/features/landing-v2/ui/ComplianceSection";
import DemoCtaSection from "@/features/landing-v2/ui/DemoCtaSection";
import GettingStartedSection from "@/features/landing-v2/ui/GettingStartedSection";
import HeroSection from "@/features/landing-v2/ui/HeroSection";
import LandingV2PageShell from "@/features/landing-v2/ui/LandingV2PageShell";
import PlatformSection from "@/features/landing-v2/ui/PlatformSection";
import PricingSection from "@/features/landing-v2/ui/PricingSection";
import SolutionsSection from "@/features/landing-v2/ui/SolutionsSection";
import TwoWaysSection from "@/features/landing-v2/ui/TwoWaysSection";
import WhyFlentraSection from "@/features/landing-v2/ui/WhyFlentraSection";

export default function LandingV2() {
  return (
    <LandingV2PageShell revealSections>
      <HeroSection />
      <ChallengeSection />
      <TwoWaysSection />
      <GettingStartedSection />
      <PlatformSection />
      <WhyFlentraSection />
      <SolutionsSection />
      <ComplianceSection />
      <PricingSection />
      <DemoCtaSection />
    </LandingV2PageShell>
  );
}
