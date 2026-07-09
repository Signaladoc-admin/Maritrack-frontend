import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Providers from "./providers";
import { ToastProvider } from "@/shared/ui/toast";
import { Sidebar } from "@/shared/ui/Sidebar/Sidebar";
import ZoneIdPreview from "@/components/ui/ZoneIdPreview";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Flentra — Smart MDM & Parental Controls Platform",
    template: "%s | Flentra",
  },
  description:
    "Flentra is the all-in-one Mobile Device Management (MDM) and parental controls platform. Monitor and control every device in real time — track location, enforce policies, block apps, manage fleets, set geofences, and keep families safe online.",
  keywords: [
    "MDM",
    "Mobile Device Management",
    "device tracking",
    "parental controls",
    "geofencing",
    "screen time management",
    "enterprise device management",
    "remote wipe",
    "remote lock",
    "app management",
    "BYOD",
    "fleet management",
    "child safety app",
    "location tracking",
    "device monitoring",
    "Flentra",
  ],
  authors: [{ name: "Flentra" }],
  creator: "Flentra",
  publisher: "Flentra",
  metadataBase: new URL("https://flentra.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flentra.com",
    siteName: "Flentra",
    title: "Flentra — Smart MDM & Parental Controls Platform",
    description:
      "Real-time device tracking, MDM compliance, geofencing, and parental controls — all in one intelligent platform for enterprises and families.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flentra Dashboard — Smart MDM and Device Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flentra — Smart MDM & Parental Controls Platform",
    description:
      "Real-time device tracking, MDM compliance, geofencing, and parental controls — all in one intelligent platform.",
    images: ["/assets/og-image.png"],
    creator: "@flentra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${roboto.variable} overflow-x-hidden antialiased`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <Providers>
            <NuqsAdapter>
              <main>{children}</main>
              <ZoneIdPreview />
            </NuqsAdapter>
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
