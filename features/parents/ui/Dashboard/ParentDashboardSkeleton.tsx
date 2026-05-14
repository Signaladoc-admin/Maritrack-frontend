"use client";

import { Skeleton } from "@/shared/ui/skeleton";

export function ParentDashboardSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </header>

      {/* Metrics Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-48 rounded-[32px]" />
        <Skeleton className="h-48 rounded-[32px]" />
      </div>

      {/* Side-by-side Section Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 w-full rounded-[24px]" />
        <Skeleton className="h-64 w-full rounded-[24px]" />
      </div>
    </div>
  );
}
