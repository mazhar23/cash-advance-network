import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressIndicator = ({ currentStep, totalSteps, steps }: ProgressIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div
                    className={cn(
                      "h-1 flex-1 transition-colors duration-300",
                      isCompleted || isCurrent ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 shrink-0",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 transition-colors duration-300",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center hidden sm:block",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center sm:hidden">
        <span className="text-sm font-medium text-primary">
          Step {currentStep}: {steps[currentStep - 1]}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;

