import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface PlanCardProps {
  price: string;
  name: string;
  billingCycle: string;
  isCurrent?: boolean;
  onUpgrade?: () => void;
  className?: string;
}

export default function PlanCard({
  price,
  name,
  billingCycle,
  isCurrent = false,
  onUpgrade,
  className,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between rounded-xl border-4 border-b-16 bg-white px-6 py-5",
        className
      )}
      style={{
        border: `3.5px solid ${isCurrent ? "#c5d5f1" : "#eeeeee"}`,
        borderBottom: `20px solid ${isCurrent ? "#c5d5f1" : "#eeeeee"}`,
      }}
    >
      <div className="space-y-1">
        <p className="text-2xl font-bold text-[#1B3C73]">{price}</p>
        <p className="flex items-center gap-2 text-slate-500">
          {name}
          <span className="mx-0.5 text-slate-200">•</span>
          {billingCycle}
        </p>
      </div>

      {isCurrent ? (
        <span className="rounded-lg border border-[#d1d5db] bg-neutral-50 px-3 py-1.5 text-sm font-medium text-slate-600">
          Current plan
        </span>
      ) : (
        <Button size="sm" onClick={onUpgrade}>
          Upgrade
        </Button>
      )}
    </div>
  );
}
