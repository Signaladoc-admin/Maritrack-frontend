import { VerticalStepper } from "@/shared/ui/vertical-stepper";
import { cn } from "@/shared/lib/utils";

interface Step {
  title: string;
  description?: string;
  component: React.ReactNode;
  onClick?: () => void;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
  isFullWidth?: boolean;
}

export function MultiStepForm({
  steps,
  currentStep,
  onStepClick,
  className,
  isFullWidth,
}: MultiStepFormProps) {
  const currentStepData = steps[currentStep];

  return (
    <div className={cn("flex flex-col gap-8 lg:flex-row lg:gap-12", className)}>
      {!isFullWidth && (
        <aside className="w-full shrink-0 lg:w-64">
          <VerticalStepper steps={steps} currentStep={currentStep} onStepClick={onStepClick} />
        </aside>
      )}

      <main className={cn("min-w-0 flex-1", !isFullWidth ? "max-w-xl" : "max-w-none")}>
        {currentStepData ? currentStepData.component : null}
      </main>
    </div>
  );
}
