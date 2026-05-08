"use client";

import * as React from "react";
import { AreaChartCard } from "@/shared/ui/dashboard/AreaChartCard";
import { DonutChartCard } from "@/shared/ui/dashboard/DonutChartCard";
import { DashboardCard } from "@/shared/ui/dashboard/DashboardCard";
import { Calendar } from "lucide-react";

const blockedAttemptsData = [
  { day: "MON", attempts: 120 },
  { day: "TUE", attempts: 180 },
  { day: "WED", attempts: 150 },
  { day: "THUR", attempts: 400 },
  { day: "FRI", attempts: 160 },
  { day: "SAT", attempts: 250 },
  { day: "SUN", attempts: 290 },
];

const securityPatchData = [
  { name: "Vulnerable", value: 42.4, color: "#EF4444" },
  { name: "Secured", value: 57.6, color: "#22C55E" },
];

const jailbreakData = [
  { day: "MON", rate: 45 },
  { day: "TUE", rate: 55 },
  { day: "WED", rate: 30 },
  { day: "THUR", rate: 80 },
  { day: "FRI", rate: 45 },
  { day: "SAT", rate: 65 },
  { day: "SUN", rate: 60 },
];

const violationIncidents = [
  { incident: "Violation A", date: "18 Apr 2021, 5:30pm" },
  { incident: "Violation B", date: "18 Apr 2021, 5:23pm" },
  { incident: "Violation C", date: "20 May 2021, 6:22am" },
  { incident: "Violation D", date: "12 Jul 2021, 9:30am" },
];

export function ComplianceSecurityWidget() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Compliance & Security</h2>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Blocked App Installation Attempts */}
        <DashboardCard
          title="Blocked App Installation Attempts"
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
              data={blockedAttemptsData}
              dataKey="attempts"
              xAxisKey="day"
              color="#EF4444"
              gradientId="blockedGradient"
              timeRangeAction=""
            />
          </div>
        </DashboardCard>

        {/* Devices with Latest Security Patch */}
        <DonutChartCard
          title="Devices with Latest Security Patch"
          data={securityPatchData}
          timeRangeAction="This month"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Policy Violation Incidents Table */}
        <DashboardCard
          title="Policy Violation Incidents"
          titleAction={
            <button className="flex items-center gap-1.5 rounded bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              <Calendar className="h-3 w-3" />
              This month
            </button>
          }
          className="overflow-hidden"
          contentClassName="p-0 sm:p-0"
        >
          <div className="mt-4 overflow-x-auto px-6 pb-6">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-white text-xs text-gray-400 uppercase">
                <tr>
                  <th scope="col" className="px-0 py-3 font-medium">
                    Incident
                  </th>
                  <th scope="col" className="px-0 py-3 font-medium">
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {violationIncidents.map((v, idx) => (
                  <tr key={idx} className="border-b border-gray-50 bg-white last:border-0">
                    <td className="px-0 py-4 font-medium whitespace-nowrap text-gray-900">
                      {v.incident}
                    </td>
                    <td className="px-0 py-4">{v.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Jailbreak/Root Detection Rate */}
        <DashboardCard
          title="Jailbreak/Root Detection Rate"
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
              data={jailbreakData}
              dataKey="rate"
              xAxisKey="day"
              color="#111827"
              gradientId="jailbreakGradient"
              timeRangeAction=""
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
