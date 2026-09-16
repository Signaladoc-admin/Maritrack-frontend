import { cn } from "@/shared/lib/utils";

export default function DisplayField({
  orientation = "vertical",
  label,
  value,
  className,
  hoverTitle,
}: {
  orientation?: "vertical" | "horizontal";
  label: string;
  value: string;
  className?: string;
  hoverTitle?: string;
}) {
  return (
    <div
      title={hoverTitle}
      className={cn(
        "gap-2 space-y-2 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 text-sm",
        orientation === "horizontal" && "grid grid-cols-2",
        className
      )}
    >
      <p className="text-xs font-medium text-[var(--text-3)]">{label}</p>
      <p className="font-semibold text-[var(--text-1)]">{value}</p>
    </div>
  );
}
