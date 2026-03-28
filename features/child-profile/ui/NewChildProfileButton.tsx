import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";

export default function NewChildProfileButton({
  onClick,
  text = "Add a profile",
  variant = "horizontal",
  className,
}: {
  onClick: () => void;
  text?: string;
  variant?: "vertical" | "horizontal";
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-muted-foreground/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed bg-neutral-50/50 transition-colors hover:bg-neutral-100/50",
        variant === "horizontal" && "flex-row py-12",
        variant === "vertical" && "flex-col py-6",
        className
      )}
    >
      <Plus className="h-5 w-5" color="#FF8C00" />
      <span className="font-semibold text-slate-500">{text}</span>
    </button>
  );
}
