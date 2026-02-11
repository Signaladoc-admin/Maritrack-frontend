import { Check } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface StepperProps {
  steps: {
    title: string;
    description?: string;
  }[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="after:bg-muted relative after:absolute after:inset-x-0 after:top-1/2 after:h-0.5 after:-translate-y-1/2">
        <ol className="relative z-10 flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <li key={index} className="flex items-center">
                <div
                  className={cn(
                    "bg-background flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                    {
                      "border-primary bg-primary text-primary-foreground": isCompleted,
                      "border-primary": isCurrent,
                      "border-muted text-muted-foreground": !isCompleted && !isCurrent,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                {/* Mobile view often hides labels or shows only current, 
                    but here we keep it simple or could add responsive hiding */}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="flex justify-between">
        {steps.map((step, index) => {
          // Basic alignment logic
          const isCurrent = index === currentStep;
          return (
            <div
              key={index}
              className={cn("text-center", {
                "text-primary font-medium": isCurrent,
                "text-muted-foreground": !isCurrent,
              })}
            >
              <div className="text-sm font-medium">{step.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
