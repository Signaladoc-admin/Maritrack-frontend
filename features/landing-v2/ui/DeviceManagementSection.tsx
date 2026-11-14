import {
  deviceManagementFeatures,
  deviceManagementRelated,
} from "@/features/landing-v2/data";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2RelatedSection from "@/features/landing-v2/ui/LandingV2RelatedSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function DeviceManagementSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Platform", href: "/platform" },
          { label: "Device management" },
        ]}
        badge={{ label: "Device management", tone: "cyan" }}
        title="Enrol, assign and control every device from one portal."
        description="Whether you manage 100 company laptops or 20,000 financed phones, Flentra keeps a live record of every device, who has it and what state it is in."
        ctas={[{ label: "Book a demo", href: "/book-a-demo", variant: "primary" }]}
        aside={
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3 rounded-lg border border-line bg-surface p-[22px]">
            <div className="flex items-center justify-between">
              <p className="m-0 font-bold text-white">Device record</p>
              <LandingV2Badge tone="muted" size="xs" bordered>
                Sample screen
              </LandingV2Badge>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-[13.5px]">
              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">Device</span>
                <br />
                <b className="font-semibold text-white">ThinkPad E14</b>
              </div>

              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">Assigned to</span>
                <br />
                <b className="font-semibold text-white">Amaka Nwosu · Sales</b>
              </div>

              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">Enrolled</span>
                <br />
                <b className="font-semibold text-white">12 Aug 2026</b>
              </div>

              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">Status</span>
                <br />
                <b className="font-semibold text-green-light">Active</b>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[12.5px] font-bold">
              <span className="rounded-sm border border-coral-border bg-coral-tint px-3 py-2 text-coral-light">
                Lock
              </span>
              <span className="rounded-sm border border-line bg-surface px-3 py-2 text-white">
                Reassign
              </span>
              <span className="rounded-sm border border-line bg-surface px-3 py-2 text-white">
                Send message
              </span>
            </div>
          </div>
        }
      />

      <LandingV2FeatureGridSection
        title="Everything you need to run a fleet"
        background="deep"
        cardSurface="navy"
        items={deviceManagementFeatures}
      />

      <LandingV2RelatedSection items={deviceManagementRelated} />

      <SeeFlentraCtaBand />
    </>
  );
}
