import { Skeleton } from "../skeleton";

export function SidebarSkeleton() {
  return (
    <div className="fixed top-0 left-0 z-40 flex h-screen w-[100px] flex-col items-center bg-[#F7F7F7] py-10">
      {/* Top: Home icon skeleton */}
      <div className="flex w-full flex-col items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      {/* Center: User profiles skeleton */}
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>
        {/* Add button skeleton */}
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>

      {/* Bottom: Actions skeleton */}
      <div className="flex flex-col gap-6">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
}
