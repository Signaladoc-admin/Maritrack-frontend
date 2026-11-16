import {
  enterpriseLifecycleSteps,
  enterpriseWhoUsesIt,
} from "@/features/landing-v2/data";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function SolutionEnterpriseSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Solutions" },
          { label: "Enterprise solutions" },
        ]}
        badge={{ label: "Enterprise solutions", tone: "green" }}
        title="Every company device, accounted for from purchase to return."
        description="For companies that buy phones, tablets and laptops for their people. Register each device when you procure it, assign it, track it, and get it back when someone leaves."
        ctas={[{ label: "Book a demo", href: "/book-a-demo", variant: "primary" }]}
      />

      <LandingV2FeatureGridSection
        title="The full life of a company device"
        background="deep"
        cardSurface="navy"
        asList
        minColWidth="220"
        items={enterpriseLifecycleSteps}
      />

      <LandingV2FeatureGridSection
        title="Who uses it"
        headingSize="md"
        background="navy"
        cardSurface="surface"
        items={enterpriseWhoUsesIt}
      />

      <SeeFlentraCtaBand />
    </>
  );
}
