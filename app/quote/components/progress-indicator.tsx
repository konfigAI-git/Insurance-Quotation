export function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                index <= currentStep
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                  : "border-zinc-300 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
              }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Step {index + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-zinc-900 transition-all duration-300 dark:bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
