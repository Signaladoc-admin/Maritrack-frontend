"use client";

import { BarChart2 } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { CardWrapper } from "@/shared/ui/card-wrapper";

interface BasicInfoWidgetProps {
  totalAssets?: number | string;
  assignedAssets?: number | string;
  unassignedAssets?: number | string;
  damagedAssets?: number | string;
  isLoading?: boolean;
}

function MetricStatCard({
  title,
  value,
  isLoading,
}: {
  title: string;
  value: string;
  isLoading: boolean;
}) {
  return (
    <CardWrapper variant="outline">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <BarChart2 className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-[#667085]">{title}</p>
          {isLoading ? (
            <Skeleton className="mt-1 h-7 w-24" />
          ) : (
            <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}

export function BasicInfoWidget({
  totalAssets = "—",
  assignedAssets = "—",
  unassignedAssets = "—",
  damagedAssets = "—",
  isLoading = false,
}: BasicInfoWidgetProps) {
  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">Basic Information</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricStatCard
          title="Total assets added"
          value={totalAssets.toLocaleString()}
          isLoading={isLoading}
        />
        <MetricStatCard
          title="Total assigned assets"
          value={assignedAssets.toLocaleString()}
          isLoading={isLoading}
        />
        <MetricStatCard
          title="Total unassigned assets"
          value={unassignedAssets.toLocaleString()}
          isLoading={isLoading}
        />
        <MetricStatCard
          title="Damaged asset"
          value={damagedAssets.toLocaleString()}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
