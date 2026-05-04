import { cn } from "@/shared/lib/utils";

export default function DisplayField({
  orientation = "vertical",
  label,
  value,
  className,
}: {
  orientation?: "vertical" | "horizontal";
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "gap-2 space-y-1 rounded-lg bg-white p-5 text-sm",
        orientation === "horizontal" && "grid grid-cols-[200px_1fr]",
        className
      )}
    >
      <p className="text-neutral-500">{label}</p>
      <p className="font-semibold text-neutral-700">{value}</p>
    </div>
  );
}
