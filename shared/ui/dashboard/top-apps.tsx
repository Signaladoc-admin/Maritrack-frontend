import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";
import { AppData } from "@/shared/stores/user-store";

export function TopApps({ className, apps }: { className?: string; apps?: AppData[] }) {
  if (!apps) return null;

  return (
    <CardWrapper
      padding="lg"
      className={cn("border-0 bg-white shadow-none dark:bg-slate-900", className)}
    >
      <h4 className="text-muted-foreground mb-6 text-sm font-medium">Top 5 Apps</h4>
      <div className="space-y-6">
        {apps.map((app) => (
          <div key={app.name} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl shadow-sm",
                  app.bg
                )}
              >
                <app.icon className={cn("h-5 w-5", app.iconClass)} />
              </div>
              <span className="font-semibold">{app.name}</span>
            </div>
            <span className="text-muted-foreground text-sm">{app.time}</span>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
