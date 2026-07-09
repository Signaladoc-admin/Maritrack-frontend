"use client";

import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import AboutHero from "@/features/about/ui/AboutHero";
import WhyWeExist from "@/features/about/ui/WhyWeExist";
import MissionStatement from "@/features/about/ui/MissionStatement";
import TwoPlatforms from "@/features/about/ui/TwoPlatforms";
import IndustriesGrid from "@/features/about/ui/IndustriesGrid";
import OriginStory from "@/features/about/ui/OriginStory";
import OurValues from "@/features/about/ui/OurValues";
import AboutCta from "@/features/about/ui/AboutCta";

export default function About() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0A0E1A] text-white">
      <LandingHeader />
      <AboutHero />
      <WhyWeExist />
      <MissionStatement />
      <TwoPlatforms />
      <IndustriesGrid />
      <OriginStory />
      <OurValues />
      <AboutCta />
      <LandingFooter />
    </div>
  );
}
