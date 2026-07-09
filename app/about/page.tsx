import type { Metadata } from "next";
import About from "@/views/About";

export const metadata: Metadata = {
  title: "About Flentra — Our Mission, Story & Values",
  description:
    "Learn how Flentra was built to protect every device — and everything it carries. From telecom and field operations to families at home, discover the mission, values, and story behind the platform.",
  keywords: [
    "About Flentra",
    "Flentra mission",
    "device management company",
    "MDM platform story",
    "mobile device protection",
    "Flentra values",
    "device intelligence platform",
    "enterprise device security",
    "parental controls company",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Flentra — Our Mission, Story & Values",
    description:
      "Flentra builds the intelligence layer that protects what a mobile device carries — for organizations and families alike. Discover our story.",
    url: "https://flentra.com/about",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Flentra — Device Management Platform",
      },
    ],
  },
};

export default function AboutPage() {
  return <About />;
}
