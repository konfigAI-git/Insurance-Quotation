import { useState, useEffect } from "react";
import vehiclesData from "./vehicles.json";

export function PersonalInfoStep({
  data,
  errors,
  onUpdate,
}: {
  data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    zipCode: string;
  };
  errors: Record<string, string>;
  onUpdate: (field: keyof typeof data, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={data.fullName}
          onChange={(e) => onUpdate("fullName", e.target.value)}
          className={`mt-1 block w-full rounded-lg border ${
            errors["fullName"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white`}
          placeholder="John Doe"
          data-testid="personal-full-name-input"
        />
        {errors["fullName"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-fullName">
            {errors["fullName"]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          className={`mt-1 block w-full rounded-lg border ${
            errors["email"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white`}
          placeholder="john@example.com"
          data-testid="personal-email-input"
        />
        {errors["email"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-email">
            {errors["email"]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => onUpdate("phoneNumber", e.target.value)}
          className={`mt-1 block w-full rounded-lg border ${
            errors["phoneNumber"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white`}
          placeholder="(555) 123-4567"
          data-testid="personal-phone-input"
        />
        {errors["phoneNumber"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-phoneNumber">
            {errors["phoneNumber"]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="zipCode"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          ZIP Code
        </label>
        <input
          type="text"
          id="zipCode"
          value={data.zipCode}
          onChange={(e) => onUpdate("zipCode", e.target.value)}
          className={`mt-1 block w-full rounded-lg border ${
            errors["zipCode"] ? "border-red-500" : "border-zinc-300"
          } bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white`}
          placeholder="12345"
          data-testid="personal-zip-input"
        />
        {errors["zipCode"] && (
          <p className="mt-1 text-sm text-red-500" data-testid="error-zipCode">
            {errors["zipCode"]}
          </p>
        )}
      </div>
    </div>
  );
}
