import { cn } from "@/shared/lib/utils";
import { LucideIcon, Home, User, Plus } from "lucide-react";

interface NavIconProps {
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavIcon({ icon: Icon, active, onClick, className }: NavIconProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
        active
          ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
          : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800",
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  userAvatar?: React.ReactNode;
  brandLogo?: React.ReactNode;
}

export function Sidebar({ className, userAvatar, brandLogo }: SidebarProps) {
  return (
    <aside
      className={cn(
        "bg-background flex h-screen w-20 flex-col items-center border-r py-6",
        className
      )}
    >
      {brandLogo && <div className="mb-8">{brandLogo}</div>}

      <nav className="flex flex-1 flex-col items-center gap-4">
        <NavIcon icon={Home} active />
        <NavIcon icon={User} />
        <NavIcon icon={Plus} />
      </nav>

      <div className="mt-auto">{userAvatar}</div>
    </aside>
  );
}
