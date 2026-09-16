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
        "surface flex items-start justify-between rounded-[var(--radius-lg)] border border-[var(--card-line)] p-6 transition-all",
        isCurrent && "border-[var(--accent)] ring-1 ring-[var(--accent)]",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-2xl font-bold text-[var(--text-1)]">{price}</p>
        <p className="flex items-center gap-2 text-sm text-[var(--text-2)]">
          {name}
          <span className="mx-0.5 text-[var(--text-3)]">•</span>
          {billingCycle}
        </p>
      </div>

      {isCurrent ? (
        <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)] px-3.5 py-1.5 text-xs font-bold text-[var(--accent)]">
          Current plan
        </span>
      ) : (
        <Button size="sm" className="btn-primary cursor-pointer" onClick={onUpgrade}>
          Upgrade
        </Button>
      )}
    </div>
  );
}
