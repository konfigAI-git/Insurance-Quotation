"use client";

import { QuoteFormData, DRIVING_HISTORY_OPTIONS } from "@/lib/types";
import { calculatePremium, getPlans } from "@/lib/pricing";

interface Props {
  data: QuoteFormData;
  onChange: (partial: Partial<QuoteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Coverage({ data, onChange, onNext, onBack }: Props) {
  const plans = getPlans();
  const isValid = data.drivingHistory !== "" && data.coverageType !== "";

  const inputStyle = {
    backgroundColor: "var(--background)",
    borderColor: "var(--border)",
    color: "var(--foreground)",
  };

  return (
    <div data-testid="step-3-coverage">
      <h2
        data-testid="step-3-heading"
        className="text-2xl font-bold mb-1"
        style={{ color: "var(--foreground)" }}
      >
        Driving &amp; Coverage
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        Select your driving history and preferred coverage level.
      </p>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="drivingHistory"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Driving History <span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="drivingHistory"
            data-testid="select-driving-history"
            value={data.drivingHistory}
            onChange={(e) => onChange({ drivingHistory: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
            style={inputStyle}
          >
            <option value="">Select driving history...</option>
            {DRIVING_HISTORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm font-medium mb-3" style={{ color: "var(--foreground)" }}>
            Coverage Type <span style={{ color: "red" }}>*</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {plans.map((plan) => {
              const premium =
                data.drivingHistory && data.vehicleYear && data.vehicleMake
                  ? calculatePremium(plan.id, data.drivingHistory, data.vehicleYear, data.vehicleMake)
                  : plan.baseRate;
              const isSelected = data.coverageType === plan.id;
              return (
                <button
                  key={plan.id}
                  data-testid={`coverage-card-${plan.id}`}
                  type="button"
                  onClick={() => onChange({ coverageType: plan.id })}
                  className="p-4 rounded-xl border-2 text-left transition-all"
                  style={{
                    borderColor: isSelected ? "var(--primary)" : "var(--border)",
                    backgroundColor: isSelected ? "var(--accent)" : "var(--card)",
                  }}
                  aria-pressed={isSelected}
                >
                  <div
                    className="font-semibold text-base mb-1"
                    style={{ color: isSelected ? "var(--primary)" : "var(--foreground)" }}
                  >
                    {plan.name}
                  </div>
                  <div
                    className="text-xl font-bold mb-1"
                    style={{ color: isSelected ? "var(--primary)" : "var(--foreground)" }}
                    data-testid={`plan-premium-${plan.id}`}
                  >
                    ${premium}/mo
                  </div>
                  <div
                    className="text-xs mb-3"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    ${plan.deductible} deductible
                  </div>
                  <ul className="space-y-1">
                    {plan.features.slice(0, 3).map((f, i) => (
                      <li
                        key={i}
                        className="text-xs flex items-start gap-1"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        <span style={{ color: "var(--primary)" }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          data-testid="step-3-back-btn"
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
          data-testid="step-3-next-btn"
          onClick={onNext}
          disabled={!isValid}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          View Quote Summary →
        </button>
      </div>
    </div>
  );
}
