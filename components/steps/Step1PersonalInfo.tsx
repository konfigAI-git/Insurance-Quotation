"use client";

import { QuoteFormData } from "@/lib/types";

interface Props {
  data: QuoteFormData;
  onChange: (partial: Partial<QuoteFormData>) => void;
  onNext: () => void;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[\d\s\-()+]{7,}$/.test(phone);
}

function isValidZip(zip: string) {
  return /^\d{5}$/.test(zip);
}

function isValidName(name: string) {
  return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name.trim());
}

export default function Step1PersonalInfo({ data, onChange, onNext }: Props) {
  const isValid =
    isValidName(data.fullName) &&
    isValidEmail(data.email) &&
    isValidPhone(data.phone) &&
    isValidZip(data.zipCode);

  const inputStyle = {
    backgroundColor: "var(--background)",
    borderColor: "var(--border)",
    color: "var(--foreground)",
  };

  return (
    <div data-testid="step-1-personal">
      <h2
        data-testid="step-1-heading"
        className="text-2xl font-bold mb-1"
        style={{ color: "var(--foreground)" }}
      >
        Personal Information
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
        Tell us a bit about yourself.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Full Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="fullName"
            data-testid="input-full-name"
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Jane Doe"
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2"
            style={inputStyle}
          />
          {data.fullName && !isValidName(data.fullName) && (
            <p className="text-xs mt-1" style={{ color: "red" }}>
              Name must be at least 2 characters and contain only letters.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="email"
            data-testid="input-email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2"
            style={inputStyle}
          />
          {data.email && !isValidEmail(data.email) && (
            <p className="text-xs mt-1" style={{ color: "red" }}>
              Please enter a valid email address.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Phone Number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="phone"
            data-testid="input-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="(555) 123-4567"
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2"
            style={inputStyle}
          />
          {data.phone && !isValidPhone(data.phone) && (
            <p className="text-xs mt-1" style={{ color: "red" }}>
              Please enter a valid phone number.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--foreground)" }}
          >
            ZIP Code <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="zipCode"
            data-testid="input-zip-code"
            type="text"
            value={data.zipCode}
            onChange={(e) => onChange({ zipCode: e.target.value })}
            placeholder="12345"
            maxLength={5}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2"
            style={inputStyle}
          />
          {data.zipCode && !isValidZip(data.zipCode) && (
            <p className="text-xs mt-1" style={{ color: "red" }}>
              ZIP code must be exactly 5 digits.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          data-testid="step-1-next-btn"
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
