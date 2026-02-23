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
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  description,
  className,
}: StatsCardProps) {
  return (
    <CardWrapper className={cn("overflow-hidden", className)} padding="sm">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-muted-foreground text-sm font-medium tracking-tight">{label}</p>
        {Icon && <Icon className="text-muted-foreground h-4 w-4" />}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-bold">{value}</div>
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
    </CardWrapper>
  );
}
