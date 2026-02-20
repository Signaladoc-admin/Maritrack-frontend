"use client";

import React from "react";
import { MetricCard } from "@/features/dashboard/ui/MetricCard";
import { DeviceStatusCard } from "@/features/dashboard/ui/DeviceStatusCard";
import { AppUsageList } from "@/features/dashboard/ui/AppUsageList";
import { AlertsSummaryCard } from "@/features/dashboard/ui/AlertsSummaryCard";
import { ChildrenDropdown } from "@/features/dashboard/ui/ChildrenDropdown";

export default function DashboardPage() {
  const appUsage = [
    {
      id: "1",
      name: "WhatsApp",
      duration: "2h 33mins",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      iconBg: "bg-[#25D366]/10",
    },
    {
      id: "2",
      name: "Netflix",
      duration: "2h 33mins",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Netflix_2015_logo.svg",
      iconBg: "bg-[#E50914]/10",
    },
    {
      id: "3",
      name: "Youtube",
      duration: "2h 33mins",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      iconBg: "bg-[#FF0000]/10",
    },
    {
      id: "4",
      name: "Instagram",
      duration: "2h 33mins",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      iconBg: "bg-[#E4405F]/10",
    },
    {
      id: "5",
      name: "X",
      duration: "2h 33mins",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png",
      iconBg: "bg-black/10",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#1B3C73]">Hello Janet</h1>
          <p className="text-sm font-medium text-slate-400">January 10, 2026</p>
        </div>
        <ChildrenDropdown />
      </header>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <MetricCard
          title="Total Screen Time"
          value="4h 20"
          trendValue="+1h"
          trendType="positive"
          chartColor="green"
          chartData={[30, 45, 60, 80, 70, 90, 100]}
        />
        <MetricCard
          title="Battery health"
          value="60%"
          trendValue="-10%"
          trendType="negative"
          chartColor="red"
          chartData={[100, 90, 80, 70, 65, 60, 55]}
        />
      </div>

      {/* Device Status Grid */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        <DeviceStatusCard
          className="md:col-span-2 lg:col-span-3"
          ownerName="Solomon Grundy"
          deviceName="phone"
          modelName="iPhone 14 Pro"
          batteryLevel={70}
          brand="apple"
        />
        <DeviceStatusCard
          className="md:col-span-1 lg:col-span-2"
          ownerName="Kuroebi Grundy"
          deviceName="phone"
          modelName="Samsung Galaxy XY"
          brand="samsung"
        />
      </div>

      {/* App Usage and Alerts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AppUsageList apps={appUsage} />
        <AlertsSummaryCard />
      </div>
    </div>
  );
}
