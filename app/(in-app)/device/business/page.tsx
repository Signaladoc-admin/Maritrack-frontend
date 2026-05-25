import type { Metadata } from "next";
import BusinessDevices from "@/views/BusinessDevices";

export const metadata: Metadata = {
  title: "Business Device Management — Flentra",
  description:
    "Manage all devices registered to your organisation's Flentra MDM zone from this centralised business device page. View enrolled devices grouped by status, assign or reassign devices to specific team members, review device health and compliance scores, and take administrative actions on individual assets. This page is designed for IT administrators and business owners who need full control over their company's device fleet — from initial enrolment through to decommissioning.",
};

const BusinessDevicePage = () => {
  return (
    <div>
      <BusinessDevices />
    </div>
  );
};

export default BusinessDevicePage;
