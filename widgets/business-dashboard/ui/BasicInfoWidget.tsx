"use client";

import * as React from "react";
import { BarChart2 } from "lucide-react";
import { MetricCard } from "@/shared/ui/dashboard/MetricCard";

export function BasicInfoWidget() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Basic Information</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total assets added"
          value="30,000"
          icon={<BarChart2 className="h-5 w-5" />}
        />
        <MetricCard
          title="Total assigned assets"
          value="20,000"
          icon={<BarChart2 className="h-5 w-5" />}
        />
        <MetricCard
          title="Total unassigned assets"
          value="10,000"
          icon={<BarChart2 className="h-5 w-5" />}
        />
        <MetricCard title="Damaged asset" value="300" icon={<BarChart2 className="h-5 w-5" />} />
      </div>
    </div>
  );
}
