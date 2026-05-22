"use client";

import { QuoteFormData } from "@/lib/types";
import vehiclesData from "@/data/vehicles.json";

interface Props {
  data: QuoteFormData;
  onChange: (partial: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const currentYear = new Date().getFullYear();

export default function Step2VehicleInfo({ data, onChange, onNext, onBack }: Props) {
  const makes = vehiclesData.makes;
  const selectedMakeData = makes.find((m) => m.make === data.vehicleMake);
  const models = selectedMakeData ? selectedMakeData.models : [];

  const vehicleYear = parseInt(data.vehicleYear, 10);
  const isValidYear = data.vehicleYear !== "" && vehicleYear >= 1990 && vehicleYear <= currentYear;

  const isValid =
    data.vehicleMake !== "" &&
    data.vehicleModel !== "" &&
    isValidYear;

  const inputStyle = {
    backgroundColor: "var(--background)",
    borderColor: "var(--border)",
    color: "var(--foreground)",
  };

  return (
    <div data-testid="step-2-vehicle">
      <h2
        data-testid="step-2-heading"
        className="text-2xl font-bold mb-1"
        style={{ color: "var(--foreground)" }}
      >
        Vehicle Information
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        Tell us about the vehicle you want to insure.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="vehicleMake"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Vehicle Make <span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="vehicleMake"
            data-testid="select-vehicle-make"
            value={data.vehicleMake}
            onChange={(e) => onChange({ vehicleMake: e.target.value, vehicleModel: "" })}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
            style={inputStyle}
          >
            <option value="">Select a make...</option>
            {makes.map((m) => (
              <option key={m.make} value={m.make}>
                {m.make}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="vehicleModel"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Vehicle Model <span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="vehicleModel"
            data-testid="select-vehicle-model"
            value={data.vehicleModel}
            onChange={(e) => onChange({ vehicleModel: e.target.value })}
            disabled={!data.vehicleMake}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none disabled:opacity-50"
            style={inputStyle}
          >
            <option value="">Select a model...</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="vehicleYear"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Vehicle Year <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="vehicleYear"
            data-testid="input-vehicle-year"
            type="number"
            value={data.vehicleYear}
            onChange={(e) => onChange({ vehicleYear: e.target.value })}
            placeholder={`e.g. ${currentYear - 2}`}
            min={1990}
            max={currentYear}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
            style={inputStyle}
          />
          {data.vehicleYear !== "" && !isValidYear && (
            <p className="text-xs mt-1" style={{ color: "red" }}>
              Year must be between 1990 and {currentYear}.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          data-testid="step-2-back-btn"
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold border transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
            backgroundColor: "var(--muted)",
          }}
        >
          ← Back
        </button>
        <button
          data-testid="step-2-next-btn"
          onClick={onNext}
          disabled={!isValid}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
