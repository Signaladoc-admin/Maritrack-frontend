import type { Metadata } from "next";
import PlatformOverviewV2 from "@/views/PlatformOverviewV2";

export const metadata: Metadata = {
  title: "Platform | Flentra",
  description:
    "One platform for your device portfolio: device management, tracking and geofencing, device protection and integrations.",
};

export default function PlatformPage() {
  return <PlatformOverviewV2 />;
}
