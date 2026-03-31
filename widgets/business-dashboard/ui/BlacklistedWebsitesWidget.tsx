"use client";

import * as React from "react";
import { DashboardCard } from "@/shared/ui/dashboard/DashboardCard";
import { Calendar } from "lucide-react";

const websites = [
  { domain: "pornhub.com", category: "Adult & Pornographic Content", attempts: 12 },
  { domain: "bet9ja.com", category: "Gambling & Betting Site", attempts: 100 },
  { domain: "facebook.com", category: "Social media", attempts: 3200 },
  { domain: "netflix.com", category: "Streaming & Entertainment", attempts: 200 },
];

export function BlacklistedWebsitesWidget() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Blacklisted Website Categories</h2>

      <DashboardCard
        title="Websites"
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
                <th scope="col" className="w-1/3 px-0 py-3 font-medium">
                  Websites
                </th>
                <th scope="col" className="w-1/3 px-0 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-0 py-3 font-medium">
                  Attempts
                </th>
              </tr>
            </thead>
            <tbody>
              {websites.map((w, idx) => (
                <tr key={idx} className="border-b border-gray-50 bg-white last:border-0">
                  <td className="px-0 py-4 font-medium whitespace-nowrap text-gray-900">
                    {w.domain}
                  </td>
                  <td className="px-0 py-4">{w.category}</td>
                  <td className="px-0 py-4">{w.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}
