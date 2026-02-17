import { VerticalStepper } from "@/shared/ui/vertical-stepper";
import { cn } from "@/shared/lib/utils";

interface Step {
  title: string;
  description?: string;
  component: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function MultiStepForm({ steps, currentStep, className }: MultiStepFormProps) {
  const currentStepData = steps[currentStep];

  return (
    <div className={cn("flex flex-col gap-8 lg:flex-row lg:gap-12", className)}>
      <aside className="w-full shrink-0 lg:w-64">
        <VerticalStepper steps={steps} currentStep={currentStep} />
      </aside>

      <main className="max-w-xl min-w-0 flex-1">
        {currentStepData ? currentStepData.component : null}
      </main>
    </div>
  );
}
