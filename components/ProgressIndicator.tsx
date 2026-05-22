"use client";

interface Step {
  label: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div data-testid="progress-indicator" className="flex items-center w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                data-testid={`progress-step-${index}`}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors"
                style={{
                  backgroundColor: isCompleted
                    ? "var(--primary)"
                    : isActive
                    ? "var(--primary)"
                    : "var(--muted)",
                  borderColor: isCompleted || isActive ? "var(--primary)" : "var(--border)",
                  color: isCompleted || isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <span
                className="text-xs mt-1 text-center hidden sm:block"
                style={{
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-2"
                style={{
                  backgroundColor: isCompleted ? "var(--primary)" : "var(--border)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
