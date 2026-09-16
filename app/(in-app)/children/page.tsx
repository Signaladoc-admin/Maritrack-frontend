import type { Metadata } from "next";
import Children from "@/features/child-profile/ui/Children";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Children's Profiles — Flentra",
  description:
    "View and manage all your children's profiles on Flentra. Each profile represents a monitored child account linked to one or more enrolled devices. From this overview you can see all registered children at a glance, navigate to individual child detail pages to review their device activity, screen time, and app usage, add new children to your account, and pair their devices using the QR-based onboarding flow.",
};

const ChildrenPage = () => {
  return (
    <div className="content">
      <Link href="/dashboard" className="dd-back-link mb-4 inline-flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="page-head mb-6">
        <div className="page-head-row">
          <div>
            <h1>Children</h1>
            <p>Manage monitored profiles and enrolled devices</p>
          </div>
        </div>
      </div>

      <Children />
    </div>
  );
};

export default ChildrenPage;
