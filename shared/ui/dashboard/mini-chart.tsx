import { cn } from "@/shared/lib/utils";

interface MiniChartProps {
  data: number[];
  color?: "green" | "red" | "blue" | "default";
  className?: string;
}

export function MiniChart({ data, color = "default", className }: MiniChartProps) {
  const max = Math.max(...data);

  const colors = {
    green: "bg-emerald-400",
    red: "bg-rose-400",
    blue: "bg-blue-400",
    default: "bg-primary",
  };

  return (
    <div className={cn("flex h-8 items-end gap-1", className)}>
      {data.map((value, i) => (
        <div
          key={i}
          className={cn("w-1.5 rounded-t-sm", colors[color])}
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}
