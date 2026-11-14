import {
  deviceTrackingFeatures,
  deviceTrackingRelated,
} from "@/features/landing-v2/data";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2FeatureGridSection from "@/features/landing-v2/ui/LandingV2FeatureGridSection";
import LandingV2RelatedSection from "@/features/landing-v2/ui/LandingV2RelatedSection";
import LandingV2SubpageHero from "@/features/landing-v2/ui/LandingV2SubpageHero";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

export default function DeviceTrackingGeofencingSection() {
  return (
    <>
      <LandingV2SubpageHero
        breadcrumbs={[
          { label: "Platform", href: "/platform" },
          { label: "Tracking and geofencing" },
        ]}
        badge={{ label: "Device tracking and geofencing", tone: "cyan" }}
        title="Know where your devices are, and when they leave."
        description="See the last known location and online status of every device, draw zones around branches, warehouses or routes, and get an alert when a device moves outside them."
        ctas={[{ label: "Book a demo", href: "/book-a-demo", variant: "primary" }]}
        aside={
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3 rounded-lg border border-line bg-surface p-[22px]">
            <div className="flex items-center justify-between">
              <p className="m-0 font-bold text-white">Zone · Ikeja branch</p>
              <LandingV2Badge tone="muted" size="xs" bordered>
                Sample screen
              </LandingV2Badge>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 480 260"
              className="block w-full rounded-md border border-divider-soft bg-navy"
            >
              <circle
                cx="220"
                cy="130"
                r="82"
                fill="rgba(1,219,94,0.10)"
                stroke="#01DB5E"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <circle cx="195" cy="115" r="7" fill="#01DB5E" />
              <circle cx="240" cy="145" r="7" fill="#01DB5E" />
              <circle cx="215" cy="155" r="7" fill="#01DB5E" />
              <circle cx="370" cy="70" r="8" fill="#FF6857" />
            </svg>

            <p className="m-0 rounded-sm border border-coral-border bg-coral-tint px-3 py-2.5 text-[13.5px] text-coral-light">
              Tablet FT-07 left the Ikeja branch zone at 7:42 pm.
            </p>
          </div>
        }
      />

      <LandingV2FeatureGridSection
        title="Visibility without the guesswork"
        background="deep"
        cardSurface="navy"
        items={deviceTrackingFeatures}
      />

      <LandingV2RelatedSection items={deviceTrackingRelated} />

      <SeeFlentraCtaBand />
    </>
  );
}
