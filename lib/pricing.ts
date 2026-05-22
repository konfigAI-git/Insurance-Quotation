import pricingData from "@/data/pricing.json";

interface PricingData {
  plans: Array<{
    id: string;
    name: string;
    baseRate: number;
    deductible: number;
    features: string[];
  }>;
  drivingHistoryMultipliers: Record<string, number>;
  vehicleYearMultipliers: { new: number; mid: number; old: number };
  makeMultipliers: Record<string, number>;
}

const pricing = pricingData as PricingData;

function getYearMultiplier(year: string): number {
  const y = parseInt(year, 10);
  const current = new Date().getFullYear();
  if (y >= current - 3) return pricing.vehicleYearMultipliers.new;
  if (y >= current - 10) return pricing.vehicleYearMultipliers.mid;
  return pricing.vehicleYearMultipliers.old;
}

export function calculatePremium(
  planId: string,
  drivingHistory: string,
  vehicleYear: string,
  vehicleMake: string
): number {
  const plan = pricing.plans.find((p) => p.id === planId);
  if (!plan) return 0;
  const drivingMult = pricing.drivingHistoryMultipliers[drivingHistory] ?? 1.0;
  const yearMult = getYearMultiplier(vehicleYear);
  const makeMult = pricing.makeMultipliers[vehicleMake] ?? 1.0;
  return Math.round(plan.baseRate * drivingMult * yearMult * makeMult);
}

export function getPlans() {
  return pricing.plans;
}
