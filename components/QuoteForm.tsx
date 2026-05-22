"use client";

import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import ProgressIndicator from "./ProgressIndicator";
import Step1PersonalInfo from "./steps/Step1PersonalInfo";
import Step2VehicleInfo from "./steps/Step2VehicleInfo";
import Step3Coverage from "./steps/Step3Coverage";
import { QuoteFormData } from "@/lib/types";

const STEPS = [
  { label: "Personal Info" },
  { label: "Vehicle Info" },
  { label: "Coverage" },
];

const STORAGE_KEY = "insureQuickDraft";

const EMPTY_FORM: QuoteFormData = {
  fullName: "",
  email: "",
  phone: "",
  zipCode: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  drivingHistory: "",
  coverageType: "",
};

export default function QuoteForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(EMPTY_FORM);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        startTransition(() => setFormData(parsed));
      }
    } catch {
      // ignore
    }
  }, []);

  const update = (partial: Partial<QuoteFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...partial };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      sessionStorage.setItem("insureQuickQuoteData", JSON.stringify(formData));
      router.push("/summary");
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
  };

  return (
    <div data-testid="quote-form" className="w-full max-w-2xl mx-auto px-4 py-10">
      <ProgressIndicator steps={STEPS} currentStep={currentStep} />
      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        {currentStep === 0 && (
          <Step1PersonalInfo data={formData} onChange={update} onNext={handleNext} />
        )}
        {currentStep === 1 && (
          <Step2VehicleInfo
            data={formData}
            onChange={update}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 2 && (
          <Step3Coverage
            data={formData}
            onChange={update}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
