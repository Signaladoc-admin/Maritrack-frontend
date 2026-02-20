import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";
import { Globe, AlertCircle } from "lucide-react";

/* ─── single website row ─── */
export interface WebsiteItemProps {
  domain: string;
  duration?: string;
  time?: string;
  isBlocked?: boolean;
}

export function WebsiteItem({ domain, duration, time, isBlocked }: WebsiteItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {/* Icon Container */}
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            isBlocked
              ? "bg-red-100 text-red-600 dark:bg-red-900/20"
              : "bg-slate-100 dark:bg-slate-800"
          )}
        >
          <Globe className={cn("h-4 w-4", isBlocked ? "text-red-600" : "text-[#1b3c73]")} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm font-medium",
                isBlocked ? "text-red-700" : "text-slate-900 dark:text-slate-100"
              )}
            >
              {domain}
            </span>
            {isBlocked && <AlertCircle className="h-3 w-3 text-red-600" />}
          </div>
          {isBlocked && (
            <span className="text-[10px] font-medium text-red-500">Attempt blocked</span>
          )}
        </div>
      </div>

      {/* Right Side: Duration or Time */}
      <div className="text-right">
        {duration && <span className="text-muted-foreground text-xs">{duration}</span>}
        {time && <span className="text-muted-foreground block text-xs">{time}</span>}
      </div>
    </div>
  );
}

/* ─── card ─── */
interface TopWebsitesProps {
  websites: { domain: string; duration: string; time?: string; isBlocked?: boolean }[];
  className?: string;
}

export function TopWebsites({ websites, className }: TopWebsitesProps) {
  return (
    <CardWrapper
      padding="lg"
      className={cn("border-0 bg-white shadow-none dark:bg-slate-900", className)}
    >
      <h4 className="text-muted-foreground mb-2 text-sm font-medium">Top 5 Websites</h4>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {websites.map((site, i) => (
          <WebsiteItem
            key={`${site.domain}-${i}`}
            domain={site.domain}
            duration={site.duration}
            time={site.time}
            isBlocked={site.isBlocked}
          />
        ))}
      </div>
    </CardWrapper>
  );
}
