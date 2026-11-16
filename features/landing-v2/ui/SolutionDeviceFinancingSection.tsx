import {
  deviceFinancingKinds,
  deviceFinancingSteps,
} from "@/features/landing-v2/data";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2RelatedSection from "@/features/landing-v2/ui/LandingV2RelatedSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function SolutionDeviceFinancingSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Solutions" },
          { label: "Device financing" },
        ]}
        badge={{ label: "Device financing", tone: "cyan" }}
        title="Protect every financed device, from activation to final payment."
        description="Flentra links each customer, their repayment plan and their device in one record, so you can grow instalment sales with less risk and customers get their device back the moment they pay."
        ctas={[
          { label: "Book a demo", href: "/book-a-demo", variant: "primary" },
          {
            label: "How protection works",
            href: "/platform/device-protection",
            variant: "secondary",
          },
        ]}
      />

      <LandingV2FeatureGridSection
        title="How Flentra helps device financiers"
        background="deep"
        cardSurface="navy"
        asList
        minColWidth="240"
        items={deviceFinancingSteps}
      />

      <LandingV2RelatedSection
        title="Built for every kind of device financier"
        items={deviceFinancingKinds}
      />

      <SeeFlentraCtaBand />
    </>
  );
}
