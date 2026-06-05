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
    <CardWrapper variant="outline" padding="default">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
          <BarChart2 className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-medium text-[#667085] leading-snug">{title}</p>
          {isLoading ? (
            <Skeleton className="mt-1 h-7 w-20" />
          ) : (
            <h4 className="text-2xl font-bold text-slate-900 leading-tight">{value}</h4>
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
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
