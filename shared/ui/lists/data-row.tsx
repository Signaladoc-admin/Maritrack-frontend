import { cn } from "@/shared/lib/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

interface DataRowProps {
  label: string;
  value: string;
  subLabel?: string;
  icon?: LucideIcon | React.ReactNode;
  iconBg?: string; // class name
  className?: string;
}

export function DataRow({
  label,
  value,
  subLabel,
  icon,
  iconBg = "bg-slate-100 dark:bg-slate-800",
  className,
}: DataRowProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg",
              iconBg
            )}
          >
            {(() => {
              if (!icon) return null;
              if (React.isValidElement(icon)) return icon;
              const IconComp = icon as LucideIcon;
              return <IconComp className="h-5 w-5" />;
            })()}
          </div>
        )}
        <div>
          <p className="text-sm leading-none font-medium">{label}</p>
          {subLabel && <p className="text-muted-foreground mt-1 text-xs">{subLabel}</p>}
        </div>
      </div>
      <div className="text-muted-foreground text-sm font-medium">{value}</div>
    </div>
  );
}
