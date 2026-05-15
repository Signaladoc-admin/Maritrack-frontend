import type { Metadata } from "next";
import BusinessDashboard from "@/views/shared-views/dashboard/BusinessDashboard";

export const metadata: Metadata = {
  title: "Business Analytics Dashboard — Flentra",
  description:
    "The Flentra business analytics dashboard provides your organisation with a comprehensive view of all enrolled devices and employee activity. Track total enrolled devices, monitor active versus inactive device counts, review app usage distribution across your fleet, analyse device security compliance rates, detect potential jailbroken or rooted devices, and audit blocked application installation attempts. Use historical usage charts to identify trends, respond to security policy violations, and ensure every company asset is accounted for and compliant.",
};

const BusinessDashboardPage = () => {
  return (
    <div>
      <BusinessDashboard />
    </div>
  );
};

export default BusinessDashboardPage;
