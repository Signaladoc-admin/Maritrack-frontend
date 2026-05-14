import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";

export function StatsCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[32px] bg-white p-6 shadow-sm border border-slate-100">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <div className="mt-2 flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function MetricCardSkeleton() {
  return <Skeleton className="h-48 rounded-[32px]" />;
}

export function InfoListCardSkeleton() {
  return (
    <div className="flex flex-col gap-6 rounded-[32px] bg-white p-8 shadow-sm border border-slate-100 h-full min-h-[400px]">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocationSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 p-6">
      <div className="flex flex-col gap-6 lg:col-span-5">
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-48 rounded-3xl" />
      </div>
      <div className="lg:col-span-7">
        <Skeleton className="h-full min-h-[600px] rounded-3xl" />
      </div>
    </div>
  );
}
