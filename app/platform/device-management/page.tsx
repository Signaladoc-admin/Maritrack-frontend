import type { Metadata } from "next";
import DeviceManagementV2 from "@/views/DeviceManagementV2";

export const metadata: Metadata = {
  title: "Device management | Flentra",
  description: "Enrol, assign and control every device from one portal.",
};

export default function DeviceManagementPage() {
  return <DeviceManagementV2 />;
}
