import { cn } from "@/lib/utils";
import { CardWrapper } from "@/shared/ui/card-wrapper";

export default function DeviceUtilizationCard({
  title,
  count,
  percentageChange,
}: {
  title: string;
  count: string;
  percentageChange: number;
}) {
  return (
    <CardWrapper variant="outline">
      <div className="space-y-1 leading-1">
        <p className="text-sm text-neutral-500">{title}</p>
        <p className="text-2xl font-bold">{count}</p>
        <div className="flex items-center gap-2 text-xs">
          <p className={cn("font-bold", percentageChange > 0 ? "text-green-500" : "text-red-500")}>
            {percentageChange > 0 ? "+" : ""} {percentageChange}%
          </p>
          <p className="text-neutral-500">since last month</p>
        </div>
      </div>
    </CardWrapper>
  );
}
