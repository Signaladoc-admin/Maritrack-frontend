"use client";

import * as React from "react";
import {
  DashboardEmptyState,
  DashboardTableSkeleton,
  DashboardTitledCard,
} from "@/shared/ui/dashboard/analytics-ui";
import { useBlacklistedWebsites } from "@/features/dashboard/business/model/useBlacklistedWebsites";

export function BlacklistedWebsitesWidget() {
  const { websites, isLoading } = useBlacklistedWebsites();

  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">Blacklisted Website Categories</h2>

      <DashboardTitledCard title="Websites">
        {isLoading ? (
          <DashboardTableSkeleton />
        ) : websites.length > 0 ? (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb]">
                <th className="w-1/3 pb-3 text-xs font-medium tracking-wide text-[#667085] uppercase">
                  Domain
                </th>
                <th className="w-1/3 pb-3 text-xs font-medium tracking-wide text-[#667085] uppercase">
                  Name
                </th>
                <th className="pb-3 text-xs font-medium tracking-wide text-[#667085] uppercase">
                  Devices
                </th>
              </tr>
            </thead>
            <tbody>
              {websites.map((w, idx) => (
                <tr key={idx} className="border-b border-[#f3f4f6] last:border-0">
                  <td className="py-3 font-medium text-slate-900">{w.domain}</td>
                  <td className="py-3 text-[#667085]">{w.name}</td>
                  <td className="py-3 text-[#667085]">{w.devices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <DashboardEmptyState message="No blacklisted websites recorded" height={180} />
        )}
      </DashboardTitledCard>
    </div>
  );
}
