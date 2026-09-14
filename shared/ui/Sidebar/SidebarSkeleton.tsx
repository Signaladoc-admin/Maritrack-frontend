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

      {/* Section skeleton */}
      <div className="border-card-line bg-card-fill mt-4 flex flex-col gap-2 rounded-xl border p-2">
        <Skeleton className="h-4 w-20 rounded bg-white/5" />
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-9 w-full rounded-full bg-white/5" />
        ))}
      </div>

      {/* Footer skeleton */}
      <div className="mt-auto pt-4">
        <Skeleton className="bg-card-fill h-12 w-full rounded-xl" />
      </div>
    </aside>
  );
}
