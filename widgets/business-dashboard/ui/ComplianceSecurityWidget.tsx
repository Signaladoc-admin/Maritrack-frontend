"use client";

import * as React from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  DashboardAreaChart,
  DashboardDonutChart,
  DashboardDonutSlice,
  DashboardEmptyState,
  DashboardTableSkeleton,
  DashboardTitledCard,
} from "@/shared/ui/dashboard/analytics-ui";

interface ViolationIncident {
  incident: string;
  date: string;
}

interface ComplianceSecurityWidgetProps {
  blockedAttemptsData?: Record<string, string | number>[];
  securityPatchData?: DashboardDonutSlice[];
  violationIncidents?: ViolationIncident[];
  jailbreakData?: Record<string, string | number>[];
  isLoading?: boolean;
}

export function ComplianceSecurityWidget({
  blockedAttemptsData = [],
  securityPatchData = [],
  violationIncidents = [],
  jailbreakData = [],
  isLoading = false,
}: ComplianceSecurityWidgetProps) {
  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">Compliance & Security</h2>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardTitledCard title="Blocked App Installation Attempts">
          {isLoading ? (
            <Skeleton className="h-[220px] w-full rounded-xl" />
          ) : blockedAttemptsData.length > 0 ? (
            <DashboardAreaChart
              data={blockedAttemptsData}
              dataKey="attempts"
              xAxisKey="day"
              initialColor="#EF4444"
              gradientId="compliance-blocked-attempts"
              height={220}
            />
          ) : (
            <DashboardEmptyState height={220} />
          )}
        </DashboardTitledCard>

        <DashboardTitledCard title="Devices with Latest Security Patch">
          {isLoading ? (
            <Skeleton className="h-[220px] w-full rounded-xl" />
          ) : securityPatchData.length > 0 ? (
            <DashboardDonutChart data={securityPatchData} />
          ) : (
            <DashboardEmptyState height={220} />
          )}
        </DashboardTitledCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DashboardTitledCard title="Policy Violation Incidents">
          {isLoading ? (
            <DashboardTableSkeleton />
          ) : violationIncidents.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="pb-3 text-xs font-medium tracking-wide text-[#667085] uppercase">
                    Incident
                  </th>
                  <th className="pb-3 text-xs font-medium tracking-wide text-[#667085] uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {violationIncidents.map((v, idx) => (
                  <tr key={idx} className="border-b border-[#f3f4f6] last:border-0">
                    <td className="py-3 font-medium text-slate-900">{v.incident}</td>
                    <td className="py-3 text-[#667085]">{v.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <DashboardEmptyState message="No incidents recorded" height={180} />
          )}
        </DashboardTitledCard>

        <DashboardTitledCard title="Jailbreak/Root Detection Rate">
          {isLoading ? (
            <Skeleton className="h-[220px] w-full rounded-xl" />
          ) : jailbreakData.length > 0 ? (
            <DashboardAreaChart
              data={jailbreakData}
              dataKey="rate"
              xAxisKey="day"
              initialColor="#111827"
              gradientId="compliance-jailbreak-rate"
              height={220}
            />
          ) : (
            <DashboardEmptyState height={220} />
          )}
        </DashboardTitledCard>
      </div>
    </div>
  );
}
