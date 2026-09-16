import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";

interface EmptyDeviceCardProps {
  onClick?: () => void;
  className?: string;
}

export function EmptyDeviceCard({ onClick, className }: EmptyDeviceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "surface relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border-dashed border-[var(--card-line-strong)] p-8 text-center transition-colors hover:border-[var(--accent)] hover:bg-[var(--card-hover)]",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] text-[var(--accent)]">
        <Plus className="h-6 w-6" />
      </div>

      <span className="text-sm font-bold text-[var(--text-1)]">Pair new device</span>
    </button>
  );
}
