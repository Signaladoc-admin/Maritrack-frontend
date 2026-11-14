import type { Metadata } from "next";
import { Suspense } from "react";
import DeviceLogs from "@/views/DeviceLogs";

export const metadata: Metadata = {
  title: "Device Logs — Flentra",
  description:
    "View the audit trail of device enrollment and device creation events across your Flentra MDM fleet.",
};

export default function DeviceLogsPage() {
  return (
    <Suspense>
      <DeviceLogs />
    </Suspense>
  );
}
