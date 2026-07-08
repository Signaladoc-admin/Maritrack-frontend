import type { Metadata } from "next";
import Plans from "@/views/Plans";
import { getAppRole } from "@/shared/lib/get-app-role";

export async function generateMetadata(): Promise<Metadata> {
  const appRole = await getAppRole();

  if (appRole === "BUSINESS") {
    return {
      title: "Business Subscription Plans — Flentra",
      description:
        "Browse and manage your Flentra business subscription plan. Compare available tiers to find the right level of MDM features and device management capabilities for your organisation — from basic asset tracking to advanced security policy enforcement, compliance monitoring, and multi-device fleet support. Upgrade or downgrade your plan at any time, review what is included in your current subscription, and view your next billing date.",
    };
  }

  return {
    title: "Subscription Plans — Flentra",
    description:
      "Browse and manage your Flentra parental subscription plan. Compare available tiers to find the right level of parental controls and device monitoring features for your family — from basic screen time tracking to advanced content filtering, application management, location tracking, and multi-device support. Upgrade or downgrade your plan at any time, review what is included in your current subscription, and view your next billing date.",
  };
}

export default function PlansPage() {
  return <Plans />;
}
