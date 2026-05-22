export interface QuoteFormData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  // Step 2: Vehicle Info
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  // Step 3: Coverage
  drivingHistory: string;
  coverageType: string;
}

export interface SavedQuote extends QuoteFormData {
  id: string;
  savedAt: string;
  monthlyPremium: number;
  deductible: number;
}

export const DRIVING_HISTORY_OPTIONS = [
  { value: "clean", label: "Clean (No accidents)" },
  { value: "one_accident", label: "1 Accident" },
  { value: "two_plus_accidents", label: "2+ Accidents" },
  { value: "dui", label: "DUI / Major Violation" },
];

export const QUOTE_STORAGE_KEY = "insureQuickQuotes";
