import { Check } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface VerticalStepperProps {
  steps: {
    title: string;
    description?: string;
  }[];
  currentStep: number;
  className?: string;
}

export function VerticalStepper({ steps, currentStep, className }: VerticalStepperProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors",
                  {
                    "border-orange-500 bg-orange-500 text-white": isCurrent,
                    "border-slate-300 bg-slate-300 text-white": isCompleted,
                    "border-slate-300 bg-white": !isCurrent && !isCompleted,
                  }
                )}
              >
                {isCompleted && <Check className="h-3.5 w-3.5" />}
                {isCurrent && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              {!isLast && (
                <div
                  className={cn("my-1 w-[2px] flex-1", {
                    "bg-slate-300": isCompleted,
                    "bg-slate-200": !isCompleted,
                  })}
                />
              )}
            </div>
            <div className="pt-0.5 pb-6">
              <div
                className={cn("text-base leading-none font-semibold", {
                  "font-bold text-blue-950": isCurrent,
                  "font-medium text-slate-400": !isCurrent,
                })}
              >
                {step.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
