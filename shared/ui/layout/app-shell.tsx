import { cn } from "@/shared/lib/utils";

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
}

export function AppShell({ sidebar, children, className }: AppShellProps) {
  return (
    <div
      className={cn(
        "flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950",
        className
      )}
    >
      <div className="shrink-0">{sidebar}</div>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
