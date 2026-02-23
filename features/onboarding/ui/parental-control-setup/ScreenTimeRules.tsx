import React from "react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DailyScreenTimeRadioInputs from "./DailyScreenTimeRadioInputs";

import { TimePicker } from "@/shared/ui/time-picker";
import { cn } from "@/shared/lib/utils";

const schema = z.object({
  dailyScreenTimeLimit: z.string().min(1, "Daily screen time limit is required"),
  downtimeStart: z.string().optional(),
  downtimeEnd: z.string().optional(),
  restrictSchoolHours: z.boolean().default(false),
});

export default function ScreenTimeRules() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dailyScreenTimeLimit: "",
      downtimeStart: "22:30",
      downtimeEnd: "07:00",
      restrictSchoolHours: false,
    },
  });

  return (
    <CardWrapper variant="outline">
      <div className="space-y-10!">
        <CardHeader
          title="Screen Time Rules"
          description="Set healthy limits for daily phone use."
        />
        <div className="space-y-3">
          <Controller
            control={form.control}
            name="dailyScreenTimeLimit"
            render={({ field }) => (
              <DailyScreenTimeRadioInputs value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="space-y-5">
          <SubHeading title="Downtime / Bedtime" />
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">Restrict usage between</p>
            <div className="flex gap-4">
              <div className="flex-1">
                <Controller
                  control={form.control}
                  name="downtimeStart"
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      placeholder="10:30pm"
                      className="h-14 bg-neutral-50/50"
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  control={form.control}
                  name="downtimeEnd"
                  render={({ field }) => (
                    <TimePicker {...field} placeholder="5:00am" className="h-14 bg-neutral-50/50" />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <SubHeading title="School hours restriction" />
          <div
            className="flex cursor-pointer items-center gap-3 py-2"
            onClick={() => form.setValue("restrictSchoolHours", !form.watch("restrictSchoolHours"))}
          >
            <div
              className={cn(
                "border-primary flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                form.watch("restrictSchoolHours") ? "border-[6px]" : "border-neutral-300"
              )}
            />
            <span className="text-base font-normal text-slate-700">
              Limit phone use during school hours
            </span>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
