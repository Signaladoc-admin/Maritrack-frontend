import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";
import { MapPin } from "lucide-react";

export function LiveMapCard({ className }: { className?: string }) {
  return (
    <CardWrapper
      padding="none" // Custom padding "p-2" as requested
      className={cn("overflow-hidden bg-slate-50 p-2 dark:bg-slate-900", className)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#eef0f2] dark:bg-[#1a1d21]">
        {/* Mock Map Background - Simplified Grid/Streets */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(#dbeafe 2px, transparent 2px),
              linear-gradient(90deg, #dbeafe 2px, transparent 2px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* CSS Streets - Major Roads */}
        <div className="absolute top-[30%] left-0 h-3 w-full bg-white shadow-sm dark:bg-slate-700" />
        <div className="absolute top-0 left-[40%] h-full w-3 bg-white shadow-sm dark:bg-slate-700" />

        {/* Path/Route (SVG Implementation) */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <path
            d="M 50 80 L 120 80 L 120 150 L 220 150 L 220 50 L 280 50"
            fill="none"
            stroke="#1b3c73"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="opacity-60"
          />
        </svg>

        {/* User Location Pin */}
        <div className="absolute top-[35%] left-[45%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 shadow-lg ring-4 ring-white dark:bg-blue-500/10 dark:ring-slate-800">
            <div className="h-4 w-4 rounded-full bg-blue-600 shadow-md ring-2 ring-white" />

            {/* Pulsing Effect */}
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20" />
          </div>
          <div className="mt-1 rounded-md bg-white px-2 py-0.5 text-[10px] font-bold shadow-md dark:bg-slate-800">
            Solomon
          </div>
        </div>

        {/* Mock Destination Pin */}
        <div className="absolute top-[15%] right-[10%]">
          <MapPin className="h-6 w-6 fill-red-500 text-red-600 drop-shadow-md" />
        </div>
      </div>
    </CardWrapper>
  );
}
