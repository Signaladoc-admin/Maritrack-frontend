"use client";

import { Skeleton } from "@/shared/ui/skeleton";

export function DeviceHeaderSkeleton({ isMobile }: { isMobile?: boolean }) {
  return (
    <div className="mb-10 flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
      {!isMobile && (
        <div className="flex justify-between">
          <div className="flex justify-start">
            {/* Back button skeleton */}
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      )}

      <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row lg:items-center">
        <div className="w-full lg:w-auto">
          {/* Tab navigation skeleton */}
          <Skeleton className="h-10 w-full rounded-full lg:w-80" />
        </div>

        <div className="ml-auto flex w-full items-center gap-4 lg:w-auto">
          <div className="flex-1 lg:flex-none">
            {/* Date dropdown skeleton */}
            <Skeleton className="h-10 w-full rounded-full lg:w-36" />
          </div>

          <div className="ml-auto flex lg:ml-0">
            {/* Action button skeleton (delete icon / mark as returned / reassign) */}
            <Skeleton className="h-10 w-10 rounded-full lg:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceHeaderSkeleton;
