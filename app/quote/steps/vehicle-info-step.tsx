import { useState, useEffect } from "react";
import vehiclesData from "./vehicles.json";

export function VehicleInfoStep({
  data,
  errors,
  onUpdate,
}: {
  data: {
    make: string;
    model: string;
    year: number;
  };
  errors: Record<string, string>;
  onUpdate: (field: keyof typeof data, value: string | number) => void;
}) {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    if (vehiclesData) {
      setMakes(Object.keys(vehiclesData));
    }
  }, []);

  useEffect(() => {
    if (data.make && vehiclesData && vehiclesData[data.make]) {
      setModels(vehiclesData[data.make]);
    } else {
      setModels([]);
    }
  }, [data.make]);

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="make"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Vehicle Make
        </label>
        <select
          id="make"
          value={data.make}
          onChange={(e) => onUpdate("make", e.target.value)}
          className={`mt-1 block w-full rounded-lg border ${
            errors["make"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white`}
          data-testid="vehicle-make-select"
        >
          <option value="">Select Make</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
        {errors["make"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-make">
            {errors["make"]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Vehicle Model
        </label>
        <select
          id="model"
          value={data.model}
          onChange={(e) => onUpdate("model", e.target.value)}
          disabled={!data.make}
          className={`mt-1 block w-full rounded-lg border ${
            errors["model"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white disabled:opacity-50`}
          data-testid="vehicle-model-select"
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        {errors["model"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-model">
            {errors["model"]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="year"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Vehicle Year
        </label>
        <input
          type="number"
          id="year"
          value={data.year}
          onChange={(e) => onUpdate("year", parseInt(e.target.value) || 0)}
          className={`mt-1 block w-full rounded-lg border ${
            errors["year"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white`}
          min={1990}
          max={new Date().getFullYear()}
          data-testid="vehicle-year-input"
        />
        {errors["year"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-year">
            {errors["year"]}
          </p>
        )}
      </div>
    </div>
  );
}
