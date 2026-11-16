import { bnplFeatures, bnplRelated } from "@/features/landing-v2/data";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2RelatedSection from "@/features/landing-v2/ui/LandingV2RelatedSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function SolutionBnplSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Solutions" },
          { label: "BNPL" },
        ]}
        badge={{ label: "Buy now, pay later", tone: "cyan" }}
        title="Say yes to more customers, and get paid on time."
        description="Flentra helps BNPL providers offer phones and laptops on instalments with less risk: devices are activated at the point of sale, reminders go out automatically, and access returns the moment a customer pays."
        ctas={[{ label: "Book a demo", href: "/book-a-demo", variant: "primary" }]}
      />

      <LandingV2FeatureGridSection
        title="Made for fast, high-volume instalment sales"
        background="deep"
        cardSurface="navy"
        items={bnplFeatures}
      />

      <LandingV2RelatedSection
        title="Features you’ll use"
        items={bnplRelated}
      />

      <SeeFlentraCtaBand />
    </>
  );
}
