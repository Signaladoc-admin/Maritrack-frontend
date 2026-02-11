import { cn } from "@/shared/lib/utils";
import { AlertCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface AlertBoxProps {
  type?: "success" | "warning" | "danger";
  title: string;
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function AlertBox({
  type = "danger",
  title,
  message,
  onAction,
  actionLabel = "Manage websites",
  className,
}: AlertBoxProps) {
  const bgMap = {
    success: "bg-emerald-50 border-emerald-200",
    warning: "bg-amber-50 border-amber-200",
    danger: "bg-red-50 border-red-200",
  };

  const iconBgMap = {
    success: "bg-emerald-100 text-emerald-600",
    warning: "bg-amber-100 text-amber-600",
    danger: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3",
        bgMap[type],
        className
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            iconBgMap[type]
          )}
        >
          <AlertCircle className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-semibold",
              type === "danger"
                ? "text-red-900"
                : type === "warning"
                  ? "text-amber-900"
                  : "text-emerald-900"
            )}
          >
            {title}
          </p>
          {message && (
            <p
              className={cn(
                "text-xs",
                type === "danger"
                  ? "text-red-700"
                  : type === "warning"
                    ? "text-amber-700"
                    : "text-emerald-700"
              )}
            >
              {message}
            </p>
          )}
        </div>
      </div>

      {onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className={cn(
            "shrink-0 border-black/5 bg-white shadow-xs hover:bg-white/80",
            type === "danger"
              ? "text-red-900 hover:text-red-950"
              : type === "warning"
                ? "text-amber-900 hover:text-amber-950"
                : "text-emerald-900"
          )}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
