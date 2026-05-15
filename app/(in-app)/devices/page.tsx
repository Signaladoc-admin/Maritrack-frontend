import type { Metadata } from "next";
import { Suspense } from "react";
import DevicesList from "@/views/DevicesList";

export const metadata: Metadata = {
  title: "Device Inventory — Flentra",
  description:
    "Manage all devices enrolled in your Flentra MDM zone from this central inventory page. View the full list of company assets, filter by device status (active or inactive), search for specific devices by model or identifier, and quickly identify damaged or returned assets. Assign devices to team members, download device reports, and keep track of every piece of hardware across your organisation. The device inventory gives you complete visibility into your asset fleet so you can act fast when devices go missing, are returned, or need reassignment.",
};

export default function DevicesPage() {
  return (
    <Suspense>
      <DevicesList />
    </Suspense>
  );
}
