import type { Metadata } from "next";
import LandingV2 from "@/views/LandingV2";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    absolute:
      "Flentra | Device financing and device management software, Nigeria",
  },
  description:
    "Track, manage and protect every device you finance or issue. Flentra helps lenders, BNPL providers, telcos and businesses in Nigeria lock, locate and recover devices.",
  alternates: { canonical: "https://flentra.io/" },
  openGraph: {
    type: "website",
    siteName: "Flentra",
    title: "Flentra | Every device you finance or issue. Always in control.",
    description:
      "Intelligent device portfolio management for lenders, telcos and businesses across Nigeria. Built and run by Marimax Global.",
    url: "https://flentra.io/",
    locale: "en_NG",
    images: [{ url: "https://flentra.io/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flentra | Every device you finance or issue. Always in control.",
    description:
      "Track, manage and protect every device you finance or issue, in one place.",
    images: ["https://flentra.io/og-image.png"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://flentra.io/#organization",
      name: "Marimax Global Limited",
      alternateName: "Flentra",
      url: "https://flentra.io/",
      email: "info@flentra.io",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://flentra.io/#website",
      url: "https://flentra.io/",
      name: "Flentra",
      publisher: { "@id": "https://flentra.io/#organization" },
      inLanguage: "en-NG",
    },
    {
      "@type": "SoftwareApplication",
      name: "Flentra",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, iOS, iPadOS, Windows",
      description:
        "Intelligent device portfolio management software for device financing and corporate device fleets in Nigeria.",
      provider: { "@id": "https://flentra.io/#organization" },
      areaServed: { "@type": "Country", name: "Nigeria" },
      offers: {
        "@type": "Offer",
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock",
      },
    },
  ],
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
      <LandingV2 />
    </>
  );
}
