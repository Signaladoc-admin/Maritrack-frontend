"use client";

import { businessFeatures, parentFeatures } from "@/features/landing/data";
import LandingHeader from "@/features/landing/ui/LandingHeader";
import HeroSection from "@/features/landing/ui/HeroSection";
import StatsSection from "@/features/landing/ui/StatsSection";
import FeaturesGrid from "@/features/landing/ui/FeaturesGrid";
import ProductGrid from "@/features/landing/ui/ProductGrid";
import EnterpriseSection from "@/features/landing/ui/EnterpriseSection";
import CtaSection from "@/features/landing/ui/CtaSection";
import LandingFooter from "@/features/landing/ui/LandingFooter";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0A0E1A] text-white">
      <LandingHeader />
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <ProductGrid businessFeatures={businessFeatures} parentFeatures={parentFeatures} />
      <EnterpriseSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
