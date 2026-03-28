import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Button } from "@/shared/ui/button";

interface AppData {
  id: string;
  name: string;
  icon: React.ReactNode;
  usage: string;
  limit: string;
  status: "active" | "blocked";
}

interface AllAppsCardProps {
  apps: AppData[];
  onViewApp: (app: AppData) => void;
}

export function AllAppsCard({ apps, onViewApp }: AllAppsCardProps) {
  return (
    <CardWrapper padding="lg" className="border-0 bg-slate-50 shadow-none dark:bg-slate-900">
      <h4 className="text-muted-foreground mb-4 text-sm font-medium">All Apps</h4>
      <div className="space-y-4">
        {apps.map((app) => (
          <div key={app.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm dark:bg-slate-800">
                {/* Render icon directly (component or img wrapped in component) */}
                <div className="h-6 w-6">{app.icon}</div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{app.name}</p>
                <p className="text-muted-foreground text-xs">
                  Total: {app.usage}, {app.limit}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary h-8 px-2 text-xs font-semibold hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
              onClick={() => onViewApp(app)}
            >
              View app
            </Button>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
