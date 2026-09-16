import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";

export default function NewChildProfileButton({
  onClick,
  text = "Add a child profile",
  variant = "vertical",
  className,
}: {
  onClick: () => void;
  text?: string;
  variant?: "vertical" | "horizontal";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "surface group flex w-full cursor-pointer items-center justify-center gap-3 rounded-[var(--radius-lg)] border-dashed border-[var(--card-line-strong)] p-6 text-center transition-all hover:border-[var(--accent)] hover:bg-[var(--card-hover)]",
        variant === "horizontal" ? "flex-row py-8" : "min-h-[190px] flex-col",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] text-[var(--accent)] transition-transform group-hover:scale-105">
        <Plus className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <span className="block text-sm font-bold text-[var(--text-1)]">{text}</span>
        <span className="block text-xs text-[var(--text-3)]">
          Set up monitoring & parental controls
        </span>
      </div>
    </button>
  );
}
