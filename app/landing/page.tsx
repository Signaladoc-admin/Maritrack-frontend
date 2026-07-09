import type { Metadata } from "next";
import Landing from "@/views/Landing";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Flentra — Smart MDM, Device Tracking & Parental Controls",
  description:
    "Flentra is an all-in-one platform for parents and organisations who need intelligent device management and digital safety. For families, Flentra provides powerful parental controls — monitor screen time, restrict harmful content, track app usage, receive safety alerts, and manage all children's devices from a single dashboard. For businesses, Flentra delivers a full Mobile Device Management (MDM) solution — enrol company devices, enforce security policies, track assets, manage staff access, and maintain compliance across your entire fleet. Sign up today and take control of every connected device.",
  keywords: [
    "Flentra",
    "MDM solution",
    "Mobile Device Management",
    "device tracking software",
    "parental controls app",
    "geofencing app",
    "enterprise MDM",
    "remote device management",
    "screen time management",
    "app blocking",
    "remote wipe",
    "remote lock",
    "BYOD management",
    "fleet device management",
    "child safety app",
    "real-time location tracking",
    "compliance management",
    "bulk device enrollment",
    "white-label MDM",
    "device monitoring platform",
  ],
  alternates: { canonical: "/landing" },
  openGraph: {
    title: "Flentra — Smart MDM, Device Tracking & Parental Controls",
    description:
      "Real-time device tracking, MDM compliance, geofencing, and parental controls — all in one intelligent platform for enterprises and families.",
    url: "https://flentra.com/landing",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flentra Landing — Device Management Dashboard",
      },
    ],
  },
};

/** Structured data for Google rich results */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Flentra",
  url: "https://flentra.com",
  logo: "https://flentra.com/assets/FlentraLogo.svg",
  sameAs: [],
  description:
    "Flentra provides intelligent Mobile Device Management (MDM) and parental control solutions for enterprises and families.",
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
  featureList: [
    "Mobile Device Management (MDM)",
    "Real-time device tracking",
    "Geofencing and location alerts",
    "Screen time management",
    "App blocking and monitoring",
    "Remote lock and wipe",
    "Bulk device enrollment",
    "Compliance reporting",
    "Parental controls",
    "Multi-device dashboard",
  ],
};

export default function LandingPage() {
  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="schema-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        strategy="afterInteractive"
      />
      <Landing />
    </>
  );
}
