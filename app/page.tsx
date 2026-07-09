import type { Metadata } from "next";
import Landing from "@/views/Landing";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Flentra — Smart MDM, Device Tracking & Parental Controls",
  description:
    "Flentra is an all-in-one Mobile Device Management (MDM) and parental controls platform. Monitor and control every device in real time — track location, enforce policies, block apps, manage fleets, set geofences, and keep families safe online.",
  alternates: { canonical: "/" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Flentra",
  operatingSystem: "Android, iOS, Windows, macOS",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "14-day free trial. No credit card required.",
  },
  description:
    "An all-in-one MDM and parental controls platform with real-time device tracking, geofencing, app management, and compliance reporting.",
};

export default function RootPage() {
  return (
    <>
      <Script
        id="schema-software-root"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        strategy="afterInteractive"
      />
      <Landing />
    </>
  );
}
