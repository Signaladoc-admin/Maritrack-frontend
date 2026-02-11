import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface AlertItem {
  id: string;
  type: "warning" | "info";
  message: string;
  source: string;
}

interface AlertCardProps {
  mode: "attention" | "okay";
  alerts?: AlertItem[];
  onAction?: () => void;
  className?: string;
}

export function AlertCard({ mode, alerts = [], onAction, className }: AlertCardProps) {
  const isAttention = mode === "attention";

  return (
    <CardWrapper
      padding="none"
      className={cn(
        "flex h-full min-h-[320px] flex-col justify-between overflow-hidden border bg-[#fbfcfd] dark:bg-slate-900",
        className
      )}
    >
      <div className="flex-1 p-6 pb-0">
        <h3 className="mb-6 text-sm font-medium text-slate-500">Alerts</h3>

        <div className="mb-6 flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              isAttention
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            )}
          >
            {isAttention ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8c333a] text-xs leading-none font-bold text-white">
                !
              </div>
            ) : (
              <CheckCircle2 className="h-6 w-6" />
            )}
          </div>
          <div>
            <h4 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              {isAttention ? "Attention needed" : "All looks good"}
            </h4>
            <p className="text-sm text-slate-500">
              {isAttention ? `${alerts.length} alerts require review` : "No new alerts to review"}
            </p>
          </div>
        </div>

        {isAttention && alerts.length > 0 && (
          <div className="space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8c333a] text-[10px] font-bold text-white">
                    !
                  </div>
                  <span>{alert.message}</span>
                </div>
                <span className="font-medium text-[#1b3c73] dark:text-blue-400">
                  {alert.source}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-slate-100 p-4 pt-4 dark:border-slate-800">
        <Button
          variant="ghost"
          className={cn(
            "h-auto w-full justify-start p-0 font-medium hover:bg-transparent hover:underline",
            isAttention
              ? "text-[#8c333a] hover:text-red-700 dark:text-red-400"
              : "text-slate-600 hover:text-slate-800 dark:text-slate-400"
          )}
          onClick={onAction}
        >
          {isAttention ? "Review alerts" : "View all alerts"}
        </Button>
      </div>
    </CardWrapper>
  );
}
