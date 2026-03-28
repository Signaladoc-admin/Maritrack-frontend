import { LucideIcon } from "lucide-react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";
import { MiniChart } from "./mini-chart";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number; // percentage
    positive: boolean;
    label?: string;
  };
  chartData?: number[];
  className?: string;
  description?: string;
}

export function StatCard({
  title,
  value,
  trend,
  chartData,
  className,
  description,
}: StatCardProps) {
  return (
    <CardWrapper className={cn("flex flex-col justify-between", className)}>
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <div className="flex items-end justify-between">
          <h4 className="text-3xl font-bold tracking-tight">{value}</h4>
          {chartData && <MiniChart data={chartData} color={trend?.positive ? "green" : "red"} />}
        </div>
      </div>

      {(trend || description) && (
        <div className="mt-4 flex items-center text-xs">
          {trend ? (
            <>
              <span
                className={cn(
                  "mr-2 font-medium",
                  trend.positive ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {trend.positive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground">{trend.label || "from last week"}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </CardWrapper>
  );
}
