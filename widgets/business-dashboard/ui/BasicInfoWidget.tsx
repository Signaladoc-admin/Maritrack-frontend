"use client";

import { BarChart2 } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { useBasicInfoStats } from "@/features/dashboard/business/model/useBasicInfoStats";

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
      <div className="flex h-full items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent">
          <BarChart2 className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="flex h-full min-w-0 flex-col justify-between gap-0.5">
          <p className="text-[13px] font-semibold text-muted-foreground">{title}</p>
          {isLoading ? (
            <Skeleton className="mt-1 h-7 w-20" />
          ) : (
            <h4 className="text-[28px] leading-tight font-extrabold text-foreground">{value}</h4>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}

export function BasicInfoWidget() {
  const { totalAssets, assignedAssets, unassignedAssets, damagedAssets, isLoading } =
    useBasicInfoStats();

  return (
    <div className="mb-8">
      <h2 className="text-primary mb-4 text-base font-semibold">Basic Information</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
