import type { Metadata } from "next";
import DeviceProtectionV2 from "@/views/DeviceProtectionV2";

export const metadata: Metadata = {
  title: "Device protection | Flentra",
  description:
    "Lock, wipe and recover lost or overdue devices with clear rules.",
};

export default function DeviceProtectionPage() {
  return <DeviceProtectionV2 />;
}
