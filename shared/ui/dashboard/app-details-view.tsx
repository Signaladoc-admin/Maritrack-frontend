import { Button } from "@/shared/ui/button";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { SetLimitModal } from "./set-limit-modal";
import { useToast } from "@/shared/ui/toast";

interface AppData {
  id: string;
  name: string;
  icon: React.ReactNode;
  usage: string;
  limit: string;
  status: "active" | "blocked";
}

interface AppDetailsViewProps {
  app: AppData;
  onBack: () => void;
}

export function AppDetailsView({ app, onBack }: AppDetailsViewProps) {
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="flex h-full flex-col">
      {/* Set Limit Modal */}
      <SetLimitModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        appName={app.name}
      />

      {/* Header / Nav */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Go back
        </button>
      </div>

      {/* App Info Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-800">
            <div className="h-8 w-8">{app.icon}</div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{app.name}</h2>
            <p className="text-muted-foreground text-xs">Total: {app.usage}, Limits: 1</p>
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="bg-red-500 hover:bg-red-600"
          onClick={() => {
            toast({
              type: "info",
              title: "App Blocked",
              message: `${app.name} has been blocked.`,
            });
          }}
        >
          Block app
        </Button>
      </div>

      {/* Usage Chart Section */}
      <CardWrapper padding="lg" className="mt-6 border-0 bg-slate-50 dark:bg-slate-900">
        <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">4h 20</h3>

        {/* Simple CSS Bar Chart Mock */}
        <div className="relative mb-6 h-32 w-full">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[2, 1, 0].map((h) => (
              <div
                key={h}
                className="relative h-px w-full border-b border-slate-200 dark:border-slate-800"
              >
                <span className="absolute -top-2 -right-6 text-[10px] text-slate-400">
                  {h === 0 ? "0" : `${h}h`}
                </span>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-0">
            {/* Mock data bars */}
            {[40, 60, 45, 80, 10].map((height, i) => (
              <div key={i} className="group flex w-full flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-8 rounded-t-sm transition-all hover:opacity-80",
                    i === 3 ? "bg-[#1b3c73] dark:bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
                  )}
                  style={{ height: `${height}%` }}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    i === 3 ? "text-[#1b3c73] dark:text-blue-400" : "text-slate-400"
                  )}
                >
                  {i === 3 ? "18" : ["00", "06", "12", "18", "24"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardWrapper>

      {/* Limits Section */}
      <div className="mt-6">
        <h4 className="mb-3 text-sm font-medium text-slate-500">Limits</h4>
        <CardWrapper
          padding="lg"
          className="flex flex-col items-center justify-center gap-3 border-0 bg-slate-50 py-8 text-center dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800">
            {/* Simple hourglass icon or similar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 22h14" />
              <path d="M5 2h14" />
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            No limit set for this app
          </p>
          <Button
            variant="outline"
            className="border-none bg-white shadow-sm hover:bg-slate-50 dark:bg-slate-800"
            onClick={() => setIsLimitModalOpen(true)}
          >
            Set limit
          </Button>
        </CardWrapper>
      </div>
    </div>
  );
}
