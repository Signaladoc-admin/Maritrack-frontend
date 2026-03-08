import { Skeleton } from "@/shared/ui/skeleton";

export function ChildDevicesSkeleton() {
  return (
    <div>
      <div className="">
        {/* Back button skeleton */}
        <Skeleton className="h-6 w-24" />

        <div className="my-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Avatar skeleton */}
            <Skeleton className="h-[80px] w-[80px] rounded-full" />

            <div className="space-y-2">
              {/* Name skeleton */}
              <Skeleton className="h-8 w-32" />
              {/* Date skeleton */}
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="flex gap-4">
            {/* Action buttons skeletons */}
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Section title skeleton */}
        <Skeleton className="mb-4 h-5 w-48" />

        <div className="grid w-full grid-cols-2 gap-4">
          {/* Device cards skeletons */}
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
