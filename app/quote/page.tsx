"use client";

import { useState } from "react";
import { QuoteData } from "../quote-types";
import { CoverageOptions } from "./coverage-options";

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteData>({
    personalInfo: {
      fullName: "",
      email: "",
      phoneNumber: "",
      zipCode: "",
    },
    vehicleInfo: {
      make: "",
      model: "",
      year: 0,
    },
    drivingHistory: {
      history: "",
      coverageType: "basic",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const validateStep = (stepIndex: number) => {
    const stepErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      // Personal Info validation
      if (!formData.personalInfo.fullName || formData.personalInfo.fullName.length < 2) {
        stepErrors["fullName"] = "Full name must be at least 2 characters";
      }
      if (!formData.personalInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
        stepErrors["email"] = "Valid email is required";
      }
      if (!formData.personalInfo.phoneNumber || !/^[\d\s-]{10,}$/.test(formData.personalInfo.phoneNumber)) {
        stepErrors["phoneNumber"] = "Valid phone number is required";
      }
      if (!formData.personalInfo.zipCode || !/^\d{5}$/.test(formData.personalInfo.zipCode)) {
        stepErrors["zipCode"] = "ZIP code must be 5 digits";
      }
    } else if (stepIndex === 1) {
      // Vehicle Info validation
      if (!formData.vehicleInfo.make) {
        stepErrors["make"] = "Vehicle make is required";
      }
      if (!formData.vehicleInfo.model) {
        stepErrors["model"] = "Vehicle model is required";
      }
      if (!formData.vehicleInfo.year || formData.vehicleInfo.year < 1990 || formData.vehicleInfo.year > new Date().getFullYear()) {
        stepErrors["year"] = `Year must be between 1990 and ${new Date().getFullYear()}`;
      }
    } else if (stepIndex === 2) {
      // Driving History validation
      if (!formData.drivingHistory.history) {
        stepErrors["history"] = "Driving history is required";
      }
      if (!formData.drivingHistory.coverageType) {
        stepErrors["coverageType"] = "Coverage type is required";
      }
    }

    return stepErrors;
  };

  const updatePersonalInfo = (field: keyof QuoteData["personalInfo"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateVehicleInfo = (field: keyof QuoteData["vehicleInfo"], value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      vehicleInfo: {
        ...prev.vehicleInfo,
        [field]: value,
      },
    }));
  };

  const updateDrivingHistory = (field: keyof QuoteData["drivingHistory"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      drivingHistory: {
        ...prev.drivingHistory,
        [field]: value,
      },
    }));
  };

  const updateCoverage = (newData: QuoteData) => {
    setFormData(newData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            errors={errors}
            onUpdate={updatePersonalInfo}
          />
        );
      case 1:
        return (
          <VehicleInfoStep
            data={formData.vehicleInfo}
            errors={errors}
            onUpdate={updateVehicleInfo}
          />
        );
      case 2:
        return (
          <DrivingHistoryStep
            data={formData.drivingHistory}
            errors={errors}
            onUpdate={updateDrivingHistory}
          />
        );
      case 3:
        return <CoverageOptions data={formData} onUpdate={updateCoverage} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Get Your Quote
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Fill out the information below to get a personalized insurance quote.
        </p>
      </div>

      <ProgressIndicator currentStep={currentStep} totalSteps={4} />

      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {renderStep()}

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            data-testid="quote-back-btn"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={Object.keys(errors).length > 0}
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            data-testid="quote-next-btn"
          >
            {currentStep === 3 ? "Get Quote" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
