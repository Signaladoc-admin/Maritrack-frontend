"use client";

import { Skeleton } from "@/shared/ui/skeleton";

export function ParentDashboardSkeleton() {
  return (
    <div className="content animate-pulse space-y-8">
      {/* Header Skeleton */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56 rounded-md" />
          <Skeleton className="h-4 w-36 rounded-md" />
        </div>
        <Skeleton className="h-10 w-44 rounded-full" />
      </header>

      {/* Child Profile Banner Skeleton */}
      <div className="surface flex items-center justify-between rounded-[var(--radius-lg)] p-5">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-3.5 w-24 rounded-md" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>

      {/* Metrics Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-36 rounded-[var(--radius-lg)]" />
        <Skeleton className="h-36 rounded-[var(--radius-lg)]" />
      </div>

      {/* Side-by-side Section Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 w-full rounded-[var(--radius-lg)]" />
        <Skeleton className="h-64 w-full rounded-[var(--radius-lg)]" />
      </div>
    </div>
  );
}
