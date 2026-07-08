import type { Metadata } from "next";
import Device from "@/views/Device";
import React from "react";
import { getAppRole } from "@/shared/lib/get-app-role";

export async function generateMetadata(): Promise<Metadata> {
  const appRole = await getAppRole();

  if (appRole === "BUSINESS") {
    return {
      title: "Asset Details — Flentra",
      description:
        "Dive deep into the details of an individual enrolled asset within your Flentra MDM zone. View device specifications including manufacturer, model, operating system version, and current status. Review which team member the asset is assigned to, check the last sync timestamp, inspect installed applications, and assess security compliance. Use this page to remotely manage device settings, reassign the asset to a different user, or mark it as returned.",
    };
  }

  return {
    title: "Child Device Details — Flentra",
    description:
      "View the full details of a device enrolled under your child's Flentra profile. Check the device manufacturer, model, operating system, and current activity status. Review recent screen time, browse app usage history, and monitor content activity to stay informed about your child's digital behaviour. Use this page to manage the device remotely or update parental control settings.",
  };
}

const DevicePage = () => {
  return (
    <React.Suspense fallback={null}>
      <Device />
    </React.Suspense>
  );
};

export default DevicePage;
