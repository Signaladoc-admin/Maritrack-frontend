import type { Metadata } from "next";
import DeviceTrackingGeofencingV2 from "@/views/DeviceTrackingGeofencingV2";

export const metadata: Metadata = {
  title: "Device tracking and geofencing | Flentra",
  description:
    "See where devices are and get alerts when they leave a safe zone.",
};

export default function DeviceTrackingGeofencingPage() {
  return <DeviceTrackingGeofencingV2 />;
}
