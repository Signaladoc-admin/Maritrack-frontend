"use client";

import { Skeleton } from "@/shared/ui/skeleton";

export function ChildDevicesSkeleton() {
  return (
    <div className="content">
      {/* Back button skeleton */}
      <Skeleton className="mb-5 h-5 w-28 rounded-md" />

      {/* Hero skeleton */}
      <div className="surface dd-hero mb-6 rounded-[var(--radius-lg)] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-3.5 w-52" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Metrics skeleton */}
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Skeleton className="h-36 rounded-[var(--radius-lg)]" />
        <Skeleton className="h-36 rounded-[var(--radius-lg)]" />
      </div>

      {/* Main grid skeleton */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-[var(--radius-lg)]" />
        <Skeleton className="h-72 rounded-[var(--radius-lg)]" />
      </div>

      {/* Quick controls skeleton */}
      <div className="surface space-y-4 rounded-[var(--radius-lg)] p-6">
        <Skeleton className="h-5 w-36" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[104px] rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChildDevicesSkeleton;
