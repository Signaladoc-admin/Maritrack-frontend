"use client";

import React from "react";
import { ChevronLeft, Ban, PlayCircle, History } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { Button } from "@/shared/ui/Button/button";
import { cn } from "@/shared/lib/utils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { SetTimeLimitModal } from "@/shared/ui/Modal/Modals/TimeLimitModal";
import { AppListItem } from "./AllAppsCard";

interface AppDetailViewProps {
  app: AppListItem;
  onBack: () => void;
}

const hourlyData = [
  { name: "00", value: 0.8 },
  { name: "06", value: 1.2 },
  { name: "12", value: 0.7 },
  { name: "18", value: 0.5, isCurrent: true },
  { name: "24", value: 0.1 },
];

export function AppDetailView({ app, onBack }: AppDetailViewProps) {
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [limitModalOpen, setLimitModalOpen] = React.useState(false);
  const [limits, setLimits] = React.useState<string[]>([]);

  // Function to handle limit updates
  const handleSaveLimit = () => {
    // Mimicking the "1 hour everyday" state for demonstration
    setLimits(["1 hour everyday"]);
    setLimitModalOpen(false);
  };

  return (
    <Card className="space-y-6">
      <CardContent>
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-sm font-medium text-[#FF736A] hover:underline"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Go back
        </button>

        {/* App Header Card */}
        <div className="flex items-center justify-between rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "h-16 w-16 overflow-hidden rounded-2xl",
                isBlocked && "ring-4 ring-red-500 ring-offset-2"
              )}
            >
              <app.icon className="h-full w-full" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-[#212529]">
                {app.name} {isBlocked && "(Blocked)"}
              </h3>
              <span className="text-sm font-medium text-[#667085]">
                Total: {app.totalTime}, Limits: {app.limits}
              </span>
            </div>
          </div>

          <Button
            onClick={() => setIsBlocked(!isBlocked)}
            variant={isBlocked ? "default" : "destructive"}
            className={cn(
              "h-12 w-32 text-white",
              isBlocked
                ? "bg-[#1B3C73] hover:bg-[#1B3C73]/90"
                : "bg-[#D95D55] hover:bg-[#D95D55]/90"
            )}
          >
            {isBlocked ? (
              <>
                <PlayCircle className="h-5 w-5" /> Unblock app
              </>
            ) : (
              <>
                <Ban className="h-5 w-5" /> Block app
              </>
            )}
          </Button>
        </div>

        {/* Usage History Card */}
        <Card className="rounded-[32px] border-none bg-slate-50">
          <CardContent className="pt-6">
            <h2 className="mb-6 text-[32px] font-bold text-[#1B3C73]">4h 20</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#667085", fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#667085", fontSize: 10 }}
                    tickFormatter={(val) => `${val}h`}
                    ticks={[0, 1, 2]}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.4)" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-white p-2 shadow-sm">
                            <p className="text-xs font-bold text-[#1B3C73]">{payload[0].value}h</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" barSize={36} radius={[6, 6, 0, 0]}>
                    {hourlyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isCurrent ? "#1B3C73" : "#D0D5DD"}
                        className="transition-opacity hover:opacity-80"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Limits Section */}
        <div className="space-y-4 pt-4">
          <h4 className="text-base font-semibold text-slate-500">Limits</h4>

          <Card className="flex min-h-[120px] items-center justify-center rounded-[32px] border-none bg-slate-50">
            <CardContent className="w-full">
              {limits.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <History className="h-10 w-10 text-slate-400" />
                  <p className="font-medium text-slate-500">No limit set for this app</p>
                  <Button
                    onClick={() => setLimitModalOpen(true)}
                    className="h-10 rounded-xl bg-white px-8 font-bold text-[#1B3C73] hover:bg-slate-100"
                  >
                    Set limit
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-6">
                  <div className="space-y-2">
                    {limits.map((limit, idx) => (
                      <p key={idx} className="font-medium text-slate-600">
                        {limit}
                      </p>
                    ))}
                  </div>
                  <Button
                    onClick={() => setLimitModalOpen(true)}
                    className="h-10 rounded-xl bg-white px-4 font-bold text-[#1B3C73] hover:bg-slate-100"
                  >
                    Update limit
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>

      <SetTimeLimitModal
        open={limitModalOpen}
        onOpenChange={setLimitModalOpen}
        appName={app.name}
        // Assuming we could pass a custom onSave if the component supported it
      />
    </Card>
  );
}
