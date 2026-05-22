"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { QuoteFormData, SavedQuote, QUOTE_STORAGE_KEY, DRIVING_HISTORY_OPTIONS } from "@/lib/types";
import { calculatePremium, getPlans } from "@/lib/pricing";

export default function QuoteSummary() {
  const router = useRouter();
  const [formData, setFormData] = useState<QuoteFormData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("insureQuickQuoteData");
      if (raw) {
        const parsed = JSON.parse(raw);
        startTransition(() => setFormData(parsed));
      }
    } catch {
      // ignore
    }
  }, []);

  if (!formData) {
    return (
      <div data-testid="summary-no-data" className="text-center py-20">
        <p style={{ color: "var(--muted-foreground)" }}>No quote data found.</p>
        <button
          data-testid="summary-start-btn"
          onClick={() => router.push("/quote")}
          className="mt-4 px-6 py-2.5 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          Start a Quote
        </button>
      </div>
    );
  }

  const plans = getPlans();
  const selectedPlan = plans.find((p) => p.id === formData.coverageType);
  const premium = selectedPlan
    ? calculatePremium(formData.coverageType, formData.drivingHistory, formData.vehicleYear, formData.vehicleMake)
    : 0;

  const drivingLabel =
    DRIVING_HISTORY_OPTIONS.find((o) => o.value === formData.drivingHistory)?.label ?? formData.drivingHistory;

  const handleSave = () => {
    try {
      const existing: SavedQuote[] = JSON.parse(localStorage.getItem(QUOTE_STORAGE_KEY) ?? "[]");
      const newQuote: SavedQuote = {
        ...formData,
        id: crypto.randomUUID(),
        savedAt: new Date().toISOString(),
        monthlyPremium: premium,
        deductible: selectedPlan?.deductible ?? 0,
      };
      localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify([newQuote, ...existing]));
      setSaved(true);
    } catch {
      // ignore
    }
  };

  const handleEdit = () => {
    router.push("/quote");
  };

  const handleDownload = () => {
    const content = [
      "InsureQuick — Quote Summary",
      "===========================",
      "",
      "Driver Details",
      `--------------`,
      `Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `ZIP: ${formData.zipCode}`,
      "",
      "Vehicle Details",
      `---------------`,
      `Make: ${formData.vehicleMake}`,
      `Model: ${formData.vehicleModel}`,
      `Year: ${formData.vehicleYear}`,
      "",
      "Plan Details",
      `------------`,
      `Plan: ${selectedPlan?.name ?? formData.coverageType}`,
      `Monthly Premium: $${premium}`,
      `Deductible: $${selectedPlan?.deductible}`,
      `Driving History: ${drivingLabel}`,
      "",
      `Generated: ${new Date().toLocaleString()}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "insure-quick-quote.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const sectionStyle = {
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
  };

  return (
    <div data-testid="quote-summary" className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <h1
          data-testid="summary-heading"
          className="text-3xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Your Quote Summary
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Here&apos;s a breakdown of your personalized insurance quote.
        </p>
      </div>

      <div className="space-y-4">
        {/* Driver Details */}
        <section
          data-testid="summary-driver-section"
          className="rounded-xl border p-5"
          style={sectionStyle}
        >
          <h2 className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
            Driver Details
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <DetailRow label="Full Name" value={formData.fullName} testId="summary-name" />
            <DetailRow label="Email" value={formData.email} testId="summary-email" />
            <DetailRow label="Phone" value={formData.phone} testId="summary-phone" />
            <DetailRow label="ZIP Code" value={formData.zipCode} testId="summary-zip" />
          </div>
        </section>

        {/* Vehicle Details */}
        <section
          data-testid="summary-vehicle-section"
          className="rounded-xl border p-5"
          style={sectionStyle}
        >
          <h2 className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
            Vehicle Details
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <DetailRow label="Make" value={formData.vehicleMake} testId="summary-make" />
            <DetailRow label="Model" value={formData.vehicleModel} testId="summary-model" />
            <DetailRow label="Year" value={formData.vehicleYear} testId="summary-year" />
            <DetailRow label="Driving History" value={drivingLabel} testId="summary-driving" />
          </div>
        </section>

        {/* Plan Details */}
        <section
          data-testid="summary-plan-section"
          className="rounded-xl border p-5"
          style={{ ...sectionStyle, borderColor: "var(--primary)" }}
        >
          <h2 className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
            Selected Plan
          </h2>
          <div className="flex items-center justify-between mb-3">
            <span
              data-testid="summary-plan-name"
              className="text-xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {selectedPlan?.name} Plan
            </span>
            <span
              data-testid="summary-plan-premium"
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              ${premium}/mo
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Deductible:{" "}
            <span data-testid="summary-plan-deductible" className="font-semibold" style={{ color: "var(--foreground)" }}>
              ${selectedPlan?.deductible}
            </span>
          </p>
          {selectedPlan && (
            <ul className="mt-3 space-y-1">
              {selectedPlan.features.map((f, i) => (
                <li
                  key={i}
                  className="text-sm flex items-start gap-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <span style={{ color: "var(--primary)" }}>✓</span> {f}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          data-testid="summary-save-btn"
          onClick={handleSave}
          disabled={saved}
          className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-60"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {saved ? "✓ Saved!" : "Save Quote"}
        </button>
        <button
          data-testid="summary-edit-btn"
          onClick={handleEdit}
          className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold border"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
            backgroundColor: "var(--muted)",
          }}
        >
          Edit Quote
        </button>
        <button
          data-testid="summary-download-btn"
          onClick={handleDownload}
          className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold border"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
            backgroundColor: "var(--muted)",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value, testId }: { label: string; value: string; testId: string }) {
  return (
    <div>
      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        {label}
      </p>
      <p data-testid={testId} className="font-medium" style={{ color: "var(--foreground)" }}>
        {value}
      </p>
    </div>
  );
}
