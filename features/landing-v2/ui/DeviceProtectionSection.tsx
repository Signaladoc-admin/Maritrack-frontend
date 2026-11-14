import {
  deviceProtectionFeatures,
  deviceProtectionRelated,
} from "@/features/landing-v2/data";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import { LockAlertIcon } from "@/features/landing-v2/ui/LandingV2Icons";
import LandingV2RelatedSection from "@/features/landing-v2/ui/LandingV2RelatedSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function DeviceProtectionSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Platform", href: "/platform" },
          { label: "Device protection" },
        ]}
        badge={{ label: "Device protection", tone: "cyan" }}
        title="Lock, wipe and recover lost or overdue devices with clear rules."
        description="Send automated reminders, give a grace period, restrict overdue or unreturned devices where your agreement allows, and restore access the moment the issue is resolved."
        ctas={[{ label: "Book a demo", href: "/book-a-demo", variant: "primary" }]}
        aside={
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3 rounded-lg border border-line bg-surface p-[22px]">
            <div className="flex items-center justify-between">
              <p className="m-0 font-bold text-white">Protection status</p>
              <LandingV2Badge tone="muted" size="xs" bordered>
                Sample screen
              </LandingV2Badge>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-[13.5px]">
              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">Device</span>
                <br />
                <b className="font-semibold text-white">Galaxy A15</b>
              </div>

              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">Customer</span>
                <br />
                <b className="font-semibold text-white">Oliver Bennett</b>
              </div>

              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">Policy stage</span>
                <br />
                <b className="font-semibold text-white">Grace period ended</b>
              </div>

              <div className="rounded-sm bg-navy p-3">
                <span className="text-[11.5px] text-text-dim">State</span>
                <br />
                <b className="font-semibold text-coral-light">Locked</b>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-coral-border bg-coral-tint p-3.5 text-[13.5px]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#FF6857]">
                <LockAlertIcon />
              </span>
              <span className="leading-[1.45] text-text-soft">
                <b className="font-semibold text-white">
                  Payment overdue — device locked
                </b>
                <br />
                Automatically unlocked as soon as repayment is confirmed.
              </span>
            </div>
          </div>
        }
      />

      <LandingV2FeatureGridSection
        title="Protection that is firm, fair and automatic"
        background="deep"
        cardSurface="navy"
        items={deviceProtectionFeatures}
      />

      <LandingV2RelatedSection items={deviceProtectionRelated} />

      <SeeFlentraCtaBand />
    </>
  );
}
