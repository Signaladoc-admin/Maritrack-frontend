import { LucideIcon } from "lucide-react";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  description?: string;
  className?: string;
  dotColor?: string;
  action?: {
    icon: LucideIcon;
    onClick: () => void;
    className?: string;
  };
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  description,
  className,
  dotColor,
  action,
}: StatsCardProps) {
  const ActionIcon = action?.icon;

  return (
    <CardWrapper className={cn("overflow-hidden", className)} padding={action ? "lg" : "sm"}>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-muted-foreground text-sm font-medium tracking-tight">{label}</p>
            {!action && Icon && <Icon className="text-muted-foreground h-4 w-4" />}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className={cn("text-2xl font-bold", action && "text-3xl text-[#003366]")}>
                {value}
              </div>
              {dotColor && <div className={cn("h-2.5 w-2.5 rounded-full", dotColor)} />}
            </div>
            {(trend || description) && (
              <p className="text-muted-foreground text-xs">
                {trend && (
                  <span
                    className={cn(
                      "mr-1 font-medium",
                      trend.positive ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {trend.positive ? "+" : ""}
                    {trend.value}%
                  </span>
                )}
                {description}
              </p>
            )}
          </div>
        </div>

        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90",
              action.className || "bg-[#00B087]"
            )}
          >
            {ActionIcon && <ActionIcon className="h-7 w-7" />}
          </button>
        )}
      </div>
    </CardWrapper>
  );
}
