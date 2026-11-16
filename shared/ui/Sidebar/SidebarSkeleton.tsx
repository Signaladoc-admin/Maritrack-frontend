import { Skeleton } from "../skeleton";

export function SidebarSkeleton() {
  return (
    <aside className="sidebar border-card-line sticky top-0 left-0 z-40 hidden h-screen w-[258px] flex-col gap-4 border-r bg-[var(--sidebar-bg)] py-6 md:flex">
      {/* Brand skeleton */}
      <div className="flex items-center justify-between px-2 pt-2">
        <Skeleton className="bg-card-fill h-7 w-28 rounded-md" />
        <Skeleton className="bg-card-fill h-6 w-6 rounded-md" />
      </div>

      {/* Nav items skeleton (Dashboard, Children, Plans) */}
      <div className="flex flex-col gap-2 pt-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="bg-card-fill h-10 w-full rounded-full" />
        ))}
      </div>

      {/* Bottom: Profile popover skeleton */}
      <div className="mt-auto mb-10 flex flex-col items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Footer skeleton */}
      <div className="mt-auto pt-4">
        <Skeleton className="bg-card-fill h-12 w-full rounded-xl" />
      </div>
    </aside>
  );
}
