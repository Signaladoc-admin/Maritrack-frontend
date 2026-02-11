"use client";

import { Sidebar } from "@/shared/ui/layout/sidebar";
import { Header } from "@/shared/ui/layout/header";
import { StatCard } from "@/shared/ui/dashboard/stat-card";
import { DeviceCard } from "@/shared/ui/dashboard/device-card";
import { AlertBox } from "@/shared/ui/dashboard/alert-box";
import { TopApps } from "@/shared/ui/dashboard/top-apps";
import { User } from "lucide-react";
import ChildSwitcher from "@/shared/ui/child-switcher";
import { useUserStore } from "@/shared/stores/user-store";

export default function Home() {
  const { selectedChildId, getDashboardData } = useUserStore();
  const data = getDashboardData();

  const showSolomon = selectedChildId === "all" || selectedChildId === "solomon";
  const showKuroebi = selectedChildId === "all" || selectedChildId === "kuroebi";

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950">
      <Sidebar
        brandLogo={
          <div className="flex rounded-xl bg-slate-900 p-2 text-white">
            <User className="h-6 w-6" />
          </div>
        }
        userAvatar={
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
        }
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Hello Janet" subtitle="January 10, 2026" action={<ChildSwitcher />} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-5xl space-y-8">
            {/* Stats Row */}
            <div className="grid gap-8 md:grid-cols-2">
              <StatCard
                title="Total Screen Time"
                value={data.stats.screenTime}
                trend={data.stats.screenTimeTrend}
                chartData={data.stats.screenTimeChart}
                className="border-0 bg-white shadow-none dark:bg-slate-900"
              />
              <StatCard
                title="Battery health"
                value={data.stats.battery}
                trend={data.stats.batteryTrend}
                chartData={data.stats.batteryChart}
                className="border-0 bg-white shadow-none dark:bg-slate-900"
              />
            </div>

            {/* Devices Row */}
            <div className="grid gap-8 md:grid-cols-2">
              {showSolomon && (
                <DeviceCard
                  ownerName="Solomon Grundy"
                  model="iPhone 14 Pro"
                  batteryLevel={70}
                  className="border-0 bg-slate-950 dark:bg-slate-900"
                  brandIcon={
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-0.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.07-3.12-1.05.05-2.31.72-3.06 1.61-.69.8-1.29 2.07-1.12 3.15 1.18.09 2.37-.81 3.11-1.64z" />
                    </svg>
                  }
                />
              )}
              {showKuroebi && (
                <DeviceCard
                  ownerName="Kuroebi Grundy"
                  model="Samsung Galaxy XY"
                  batteryLevel={60}
                  className="border-0 bg-slate-950 dark:bg-slate-900"
                  brandIcon={
                    <h4 className="mb-1 text-[10px] font-bold tracking-widest text-white uppercase">
                      SAMSUNG
                    </h4>
                  }
                />
              )}
            </div>

            {/* Bottom Row */}
            <div className="grid gap-8 md:grid-cols-2">
              <TopApps apps={data.apps} />
              <div className="h-full">
                <AlertBox
                  type={data.alert.type}
                  title={data.alert.title}
                  message={data.alert.message}
                  actionLabel="View details"
                  className="h-full border-0 bg-white shadow-none dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
