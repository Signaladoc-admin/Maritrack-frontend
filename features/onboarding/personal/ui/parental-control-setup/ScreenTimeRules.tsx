import React from "react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import SubHeading from "./SubHeading";
import { Controller, useFormContext } from "react-hook-form";
import DailyScreenTimeRadioInputs from "./DailyScreenTimeRadioInputs";
import { TimePicker } from "@/shared/ui/time-picker";
import { cn } from "@/shared/lib/utils";
import { parentalControlHeadings } from "@/features/parents/ui/ParentalControlSetup";

export default function ScreenTimeRules() {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <CardWrapper variant="outline">
      <div className="space-y-10!">
        <CardHeader
          title={parentalControlHeadings.screenTimeRules.title}
          description={parentalControlHeadings.screenTimeRules.description}
        />
        <div className="space-y-3">
          <Controller
            control={control}
            name="dailyScreenTimeLimit"
            render={({ field, fieldState }) => (
              <DailyScreenTimeRadioInputs
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
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
                  control={control}
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
                  control={control}
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
          <Controller
            control={control}
            name="schoolHoursRestriction"
            render={({ field, fieldState }) => (
              <div
                className="flex cursor-pointer items-center gap-3 py-2"
                onClick={() => field.onChange(!field.value)}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                    field.value ? "border-primary border-[6px]" : "border-neutral-300",
                    fieldState.error && "border-red-500"
                  )}
                />
                <span className="text-base font-normal text-slate-700">
                  Limit phone use during school hours
                </span>
              </div>
            )}
          />
          {errors.schoolHoursRestriction && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {errors.schoolHoursRestriction.message as string}
            </p>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
