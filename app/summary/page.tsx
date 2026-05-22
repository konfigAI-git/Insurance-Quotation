import QuoteSummary from "@/components/QuoteSummary";

export const metadata = {
  title: "Your Quote Summary — InsureQuick",
};

export default function SummaryPage() {
  return (
    <div data-testid="summary-page" className="flex flex-col items-center py-8 px-4">
      <QuoteSummary />
    </div>
  );
}
