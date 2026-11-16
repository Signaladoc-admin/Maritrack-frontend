import {
  telecomsRetailersFeatures,
  telecomsRetailersRelated,
} from "@/features/landing-v2/data";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2RelatedSection from "@/features/landing-v2/ui/LandingV2RelatedSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function SolutionTelecomsRetailersSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Solutions" },
          { label: "Telecoms and retailers" },
        ]}
        badge={{ label: "Telecoms and retailers", tone: "cyan" }}
        title="Sell more devices on instalments, across every store."
        description="Flentra lets telecom operators and retailers offer phones and laptops on credit through their own stores and dealer networks, with every device protected until it’s paid for."
        ctas={[{ label: "Book a demo", href: "/book-a-demo", variant: "primary" }]}
      />

      <LandingV2FeatureGridSection
        title="Built for stores, dealers and agents"
        background="deep"
        cardSurface="navy"
        items={telecomsRetailersFeatures}
      />

      <LandingV2RelatedSection items={telecomsRetailersRelated} />

      <SeeFlentraCtaBand />
    </>
  );
}
