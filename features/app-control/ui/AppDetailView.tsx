"use client";

import React from "react";
import { ChevronLeft, Ban, PlayCircle, History } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { Button } from "@/shared/ui/Button/button";
import { cn, formatAppValue } from "@/shared/lib/utils";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { SetTimeLimitModal } from "@/shared/ui/Modal/Modals/TimeLimitModal";
import { AppListItem } from "./AllAppsCard";
import { useParams } from "next/navigation";
import { useSetAppLimit } from "@/features/mdm-sync/model/useMdmSync";

const hourlyData = [
  { name: "S", value: 0.5, isCurrent: false },
  { name: "M", value: 1.2, isCurrent: false },
  { name: "T", value: 0.8, isCurrent: false },
  { name: "W", value: 1.5, isCurrent: true },
  { name: "T", value: 0.9, isCurrent: false },
  { name: "F", value: 0.4, isCurrent: false },
  { name: "S", value: 0.2, isCurrent: false },
];

export function AppDetailView({ app, onBack }: { app: any; onBack: () => void }) {
  const params = useParams<{ device: string }>();
  const setAppLimitMutation = useSetAppLimit();

  const [isBlocked, setIsBlocked] = React.useState(false);
  const [limitModalOpen, setLimitModalOpen] = React.useState(false);
  const [limits, setLimits] = React.useState<Record<string, { hour: number; minutes: number }>>({});

  // Function to handle limit updates
  const handleSaveLimit = async (weekLimits: Record<string, { hour: number; minutes: number }>) => {
    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const appUsage: Record<string, any[]> = {};

    Object.entries(weekLimits).forEach(([day, limit]) => {
      appUsage[day] = [
        {
          packageName: app.packageName || "",
          minutes: limit.minutes,
          appName: app.appName || app.name || "",
          hour: limit.hour,
          day: day,
          date: todayStr,
        },
      ];
    });

    const payload = {
      actionId: 0,
      message: {
        appUsage,
      },
    };

    try {
      await setAppLimitMutation.mutateAsync({
        deviceId: params?.device || "",
        data: payload,
      });
      setLimits(weekLimits);
      setLimitModalOpen(false);
    } catch (err) {
      // Error handled by hook's toast notification
    }
  };

  const getLimitsDisplay = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const activeLimits = days.map((day) => {
      const limit = limits[day];
      if (!limit || (limit.hour === 0 && limit.minutes === 0)) {
        return { day, text: "No limit", active: false };
      }
      const hourText = limit.hour > 0 ? `${limit.hour}h` : "";
      const minuteText = limit.minutes > 0 ? `${limit.minutes}m` : "";
      return { day, text: `${hourText} ${minuteText}`.trim(), active: true };
    });

    const activeOnly = activeLimits.filter((l) => l.active);
    if (activeOnly.length === 0) return [];

    const firstLimitText = activeLimits[0].text;
    const allSame = activeLimits.every((l) => l.active && l.text === firstLimitText);
    if (allSame && activeLimits.length === 7) {
      return [`${firstLimitText} everyday`];
    }

    return activeLimits.filter((l) => l.active).map((l) => `${l.day}: ${l.text}`);
  };

  const displayLimits = getLimitsDisplay();
  const appDisplayName = app.appName || app.name;

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
                "flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gray-100",
                isBlocked && "ring-4 ring-red-500 ring-offset-2"
              )}
            >
              {app.icon ? (
                <app.icon className="h-full w-full" />
              ) : (
                <div className="text-xl font-bold text-gray-400">
                  {appDisplayName?.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-[#212529]">
                {appDisplayName} {isBlocked && "(Blocked)"}
              </h3>
              <span className="text-sm font-medium text-[#667085]">
                {formatAppValue(app.totalTime || `Size: ${app.installedAPKSize || app.appSize || 0}`)}
                {app.versionName && `, Version: ${app.versionName}`}
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
              {displayLimits.length === 0 ? (
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
                    {displayLimits.map((limit, idx) => (
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
        appName={appDisplayName}
        onSave={handleSaveLimit}
        isLoading={setAppLimitMutation.isPending}
        initialLimits={limits}
      />
    </Card>
  );
}
