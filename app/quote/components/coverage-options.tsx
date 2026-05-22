"use client";

import { useState, useEffect } from "react";
import { QuoteData } from "../quote-types";
import pricingData from "./pricing.json";

export function CoverageOptions({
  data,
  onUpdate,
}: {
  data: QuoteData;
  onUpdate: (data: QuoteData) => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "standard" | "premium">("basic");

  const calculatePremium = () => {
    const plan = pricingData.plans[selectedPlan];
    const drivingMultiplier = pricingData.drivingHistoryMultipliers[data.drivingHistory.history] || 1.0;
    const vehicleMultiplier = pricingData.vehicleMultipliers[data.vehicleInfo.make] || 1.0;

    return plan.baseRate * drivingMultiplier * vehicleMultiplier;
  };

  const premium = calculatePremium();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      monthlyPremium: "$" + pricingData.plans.basic.baseRate + "/mo",
      deductible: "$" + pricingData.plans.basic.deductible,
      features: pricingData.plans.basic.features,
    },
    {
      id: "standard",
      name: "Standard",
      monthlyPremium: "$" + pricingData.plans.standard.baseRate + "/mo",
      deductible: "$" + pricingData.plans.standard.deductible,
      features: pricingData.plans.standard.features,
    },
    {
      id: "premium",
      name: "Premium",
      monthlyPremium: "$" + pricingData.plans.premium.baseRate + "/mo",
      deductible: "$" + pricingData.plans.premium.deductible,
      features: pricingData.plans.premium.features,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Select Your Coverage Plan
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Choose the plan that best fits your needs. Your premium will be calculated based on your driving history and vehicle.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl border-2 p-6 transition-all ${
              selectedPlan === plan.id
                ? "border-zinc-900 bg-zinc-50 shadow-lg dark:border-white dark:bg-zinc-800"
                : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
            }`}
            onClick={() => {
              setSelectedPlan(plan.id as "basic" | "standard" | "premium");
              onUpdate({
                ...data,
                drivingHistory: {
                  ...data.drivingHistory,
                  coverageType: plan.id,
                },
              });
            }}
            data-testid={`plan-${plan.id}-card`}
          >
            {selectedPlan === plan.id && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-zinc-900">
                Selected
              </div>
            )}
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              {plan.name}
            </h3>
            <div className="mt-4">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                {plan.monthlyPremium}
              </span>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">per month</p>
            </div>
            <div className="mt-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Deductible:
              </span>
              <span className="ml-2 text-sm text-zinc-900 dark:text-white">
                {plan.deductible}
              </span>
            </div>
            <ul className="mt-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
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

      <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Your Estimated Premium
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-4xl font-bold text-zinc-900 dark:text-white">
            ${premium.toFixed(2)}
          </span>
          <span className="text-zinc-600 dark:text-zinc-400">/ month</span>
        </div>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Calculated based on {data.drivingHistory.history} driving history and {data.vehicleInfo.make} {data.vehicleInfo.model} ({data.vehicleInfo.year})
        </p>
      </div>
    </div>
  );
}
