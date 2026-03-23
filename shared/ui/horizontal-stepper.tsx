"use client";

import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface HorizontalStepperProps {
  steps: {
    title: string;
    description?: string;
    onClick?: () => void;
  }[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function HorizontalStepper({
  steps,
  currentStep,
  onStepClick,
  className,
}: HorizontalStepperProps) {
  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      <div className="flex items-center justify-center pt-2 pb-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          const isClickable = !!(step.onClick || onStepClick);

          return (
            <div key={index} className="flex items-center">
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center",
                  isClickable && "cursor-pointer"
                )}
                onClick={() => {
                  if (step.onClick) {
                    step.onClick();
                  } else {
                    onStepClick?.(index);
                  }
                }}
              >
                <div
                  className={cn(
                    "z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all",
                    {
                      "border-orange-500 bg-white": isCurrent,
                      "border-slate-300 bg-slate-300 text-white": isCompleted,
                      "border-slate-300 bg-white": !isCurrent && !isCompleted,
                    }
                  )}
                >
                  {isCompleted && <Check className="h-3 w-3" />}
                  {isCurrent && (
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
                  )}
                </div>

                {isCurrent && (
                  <div className="absolute top-6 left-1/2 w-max -translate-x-1/2 text-center text-xs font-medium text-blue-950">
                    {step.title}
                  </div>
                )}
              </div>

              {!isLast && (
                <div
                  className={cn("mx-3 h-[2px] w-6", {
                    "bg-blue-950": isCurrent || isCompleted, // active->next is blue in the image, completed->next is probably blue too
                    "bg-slate-200": !isCurrent && !isCompleted,
                  })}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
