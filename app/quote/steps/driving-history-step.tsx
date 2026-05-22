export function DrivingHistoryStep({
  data,
  errors,
  onUpdate,
}: {
  data: {
    history: string;
    coverageType: "basic" | "standard" | "premium";
  };
  errors: Record<string, string>;
  onUpdate: (field: keyof typeof data, value: string) => void;
}) {
  const coverageOptions = [
    { value: "basic", label: "Basic", price: "$50/mo", features: ["Liability", "Property Damage"] },
    { value: "standard", label: "Standard", price: "$80/mo", features: ["Liability", "Property Damage", "Collision"] },
    { value: "premium", label: "Premium", price: "$120/mo", features: ["Liability", "Property Damage", "Collision", "Comprehensive", "Roadside Assistance"] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="history"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Driving History
        </label>
        <select
          id="history"
          value={data.history}
          onChange={(e) => onUpdate("history", e.target.value)}
          className={`mt-1 block w-full rounded-lg border ${
            errors["history"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white`}
          data-testid="driving-history-select"
        >
          <option value="">Select Driving History</option>
          <option value="clean">Clean (No accidents or violations)</option>
          <option value="1-accident">1 Accident</option>
          <option value="2-accidents">2+ Accidents</option>
          <option value="speeding">Speeding Ticket</option>
        </select>
        {errors["history"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-history">
            {errors["history"]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Coverage Type
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {coverageOptions.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                data.coverageType === option.value
                  ? "border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
              onClick={() => onUpdate("coverageType", option.value)}
              data-testid={`coverage-${option.value}-card`}
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {option.label}
              </h3>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">
                {option.price}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {errors["coverageType"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-coverageType">
            {errors["coverageType"]}
          </p>
        )}
      </div>
    </div>
  );
}
