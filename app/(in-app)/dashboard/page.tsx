import type { Metadata } from "next";
import Dashboard from "@/views/Dashboard";
import { getAppRole } from "@/shared/lib/get-app-role";

export async function generateMetadata(): Promise<Metadata> {
  const appRole = await getAppRole();

  if (appRole === "BUSINESS") {
    return {
      title: "Business Analytics Dashboard — Flentra",
      description:
        "The Flentra business analytics dashboard provides your organisation with a comprehensive view of all enrolled devices and employee activity. Track total enrolled devices, monitor active versus inactive device counts, review app usage distribution across your fleet, analyse device security compliance rates, detect potential jailbroken or rooted devices, and audit blocked application installation attempts. Use historical usage charts to identify trends, respond to security policy violations, and ensure every company asset is accounted for and compliant.",
    };
  }

  return {
    title: "Parent Dashboard — Flentra",
    description:
      "Your Flentra parental control dashboard gives you a real-time overview of your children's digital activity. Monitor total daily screen time across all enrolled devices, review battery health status, browse the most frequently used applications, and respond to the latest safety alerts — all from one place. Instantly see which devices are active, check usage trends over time, and stay informed about your children's online behaviour so you can make confident parenting decisions.",
  };
}

export default function DashboardPage() {
  return <Dashboard />;
}
