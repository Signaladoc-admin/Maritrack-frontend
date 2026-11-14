import {
  financialInstitutionsFeatures,
  financialInstitutionsRelated,
} from "@/features/landing-v2/data";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2RelatedSection from "@/features/landing-v2/ui/LandingV2RelatedSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function SolutionFinancialInstitutionsSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Solutions" },
          { label: "Financial institutions" },
        ]}
        badge={{ label: "Financial institutions", tone: "cyan" }}
        title="Offer device loans with the control your risk team expects."
        description="Banks and microfinance lenders use Flentra to finance phones and laptops for customers and staff, with every device tied to its loan and every action on record."
        ctas={[{ label: "Book a demo", href: "/book-a-demo", variant: "primary" }]}
      />

      <LandingV2FeatureGridSection
        title="What banks and lenders get"
        background="deep"
        cardSurface="navy"
        items={financialInstitutionsFeatures}
      />

      <LandingV2RelatedSection
        title="Features you’ll use"
        items={financialInstitutionsRelated}
      />

      <SeeFlentraCtaBand />
    </>
  );
}
