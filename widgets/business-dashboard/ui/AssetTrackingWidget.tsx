"use client";
import * as React from "react";
import { AreaChartCard } from "@/shared/ui/dashboard/AreaChartCard";
import { DonutChartCard } from "@/shared/ui/dashboard/DonutChartCard";
import { DashboardCard } from "@/shared/ui/dashboard/DashboardCard";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div className="h-[250px] w-full bg-slate-100 rounded-lg animate-pulse" />
});

const batteryData = [
  { day: "MON", score: 60 },
  { day: "TUE", score: 65 },
  { day: "WED", score: 40 }, // Drop
  { day: "THUR", score: 75 },
  { day: "FRI", score: 60 },
  { day: "SAT", score: 55 },
  { day: "SUN", score: 50 },
];

const devicesAvailabilityData = [
  { name: "Damaged", value: 42.4, color: "#EF4444" },
  { name: "Functional", value: 57.6, color: "#22C55E" },
];

const lostReports = [
  { device: "Samsung S7", location: "Victoria Island, Lagos" },
  { device: "Nokia 3310", location: "Victoria Island, Lagos" },
  { device: "iPhone 11", location: "Victoria Island, Lagos" },
  { device: "Motorolla GEX", location: "Victoria Island, Lagos" },
];

export function AssetTrackingWidget() {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Asset Tracking & Inventory Health</h2>
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">
        {/* Battery health score */}
        <DashboardCard 
          title="Battery health score"
          titleAction={
            <button className="flex items-center gap-1.5 rounded bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              <Calendar className="h-3 w-3" />
              This month
            </button>
          }
        >
          <div className="mt-8">
            <AreaChartCard
               title=""
               value=""
               trendValue=""
               trendDirection="up"
               data={batteryData}
               dataKey="score"
               xAxisKey="day"
               color="#EF4444" 
               gradientId="batteryGradient"
               timeRangeAction="" 
            />
          </div>
        </DashboardCard>

        {/* Devices availability */}
        <DonutChartCard
          title="Devices availability"
          data={devicesAvailabilityData}
          timeRangeAction="This month"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Lost/Stolen Device Reports Table */}
        <DashboardCard 
          title="Lost/Stolen Device Reports"
          titleAction={
            <button className="flex items-center gap-1.5 rounded bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              <Calendar className="h-3 w-3" />
              This month
            </button>
          }
          className="overflow-hidden"
          contentClassName="p-0 sm:p-0"
        >
          <div className="overflow-x-auto mt-4 px-6 pb-6">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="text-xs uppercase text-gray-400 bg-white">
                <tr>
                  <th scope="col" className="px-0 py-3 font-medium">Device</th>
                  <th scope="col" className="px-0 py-3 font-medium">Last known location</th>
                </tr>
              </thead>
              <tbody>
                {lostReports.map((v, idx) => (
                  <tr key={idx} className="bg-white border-b border-gray-50 last:border-0">
                    <td className="px-0 py-4 font-medium text-gray-900 whitespace-nowrap">{v.device}</td>
                    <td className="px-0 py-4">{v.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Jailbreak/Root Detection Rate Map */}
        <DashboardCard 
          title="Jailbreak/Root Detection Rate"
          titleAction={
            <button className="flex items-center gap-1.5 rounded bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              <Calendar className="h-3 w-3" />
              This month
            </button>
          }
        >
          <div className="mt-4">
             <MapComponent />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
