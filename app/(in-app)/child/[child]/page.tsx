import type { Metadata } from "next";
import React from "react";
import ChildDevices from "@/views/ChildDevices";

export const metadata: Metadata = {
  title: "Child Device Overview — Flentra",
  description:
    "Access a detailed overview of an individual child's enrolled devices on Flentra. See all devices linked to this child's profile, review each device's current status, check screen time statistics, browse recently used applications, and inspect content activity. Use this page to identify unusual patterns in your child's digital behaviour, enforce usage limits, or initiate remote device management actions. Everything you need to stay informed about one specific child's device usage is consolidated here.",
};

const ChildPage = () => {
  return <ChildDevices />;
};

export default ChildPage;
