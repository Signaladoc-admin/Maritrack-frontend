import { cn } from "@/shared/lib/utils";
import { CardWrapper } from "@/shared/ui/card-wrapper";

/* ─── single timeline item ─── */
interface TimelineItemProps {
  title: string;
  app?: string;
  time: string;
  statusColor?: "red" | "blue" | "green" | "default";
  isLast?: boolean;
}

export function TimelineItem({
  title,
  app,
  time,
  statusColor = "default",
  isLast,
}: TimelineItemProps) {
  const dotColors = {
    red: "bg-[#f87171]",
    blue: "bg-[#1b3c73]",
    green: "bg-emerald-500",
    default: "bg-slate-400",
  };

  const titleColors = {
    red: "text-[#f87171]",
    blue: "text-[#1b3c73]",
    green: "text-emerald-600",
    default: "text-slate-700 dark:text-slate-300",
  };

  return (
    <div className="relative flex gap-x-4 pb-6 last:pb-0">
      {/* connector line */}
      {!isLast && (
        <div className="absolute top-3 bottom-0 left-[5px] w-px bg-slate-200 dark:bg-slate-700" />
      )}

      {/* dot */}
      <div className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full">
        <div className={cn("h-2.5 w-2.5 rounded-full", dotColors[statusColor])} />
      </div>

      {/* content */}
      <div className="-mt-0.5 flex-1">
        <p className={cn("text-sm font-semibold", titleColors[statusColor])}>{title}</p>
        <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
          {app && (
            <>
              <span>{app}</span>
              <span className="text-slate-300">•</span>
            </>
          )}
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── timeline container ─── */
interface ActivityTimelineProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ActivityTimeline({
  title = "Activity Timeline",
  children,
  className,
}: ActivityTimelineProps) {
  return (
    <CardWrapper
      padding="lg"
      className={cn("border-0 bg-white shadow-none dark:bg-slate-900", className)}
    >
      <h4 className="text-muted-foreground mb-4 text-sm font-medium">{title}</h4>
      <div>{children}</div>
    </CardWrapper>
  );
}

ActivityTimeline.Item = TimelineItem;
