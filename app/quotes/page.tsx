import QuoteHistory from "@/components/QuoteHistory";

export const metadata = {
  title: "Saved Quotes — InsureQuick",
};

export default function QuotesPage() {
  return (
    <div data-testid="quotes-page" className="flex flex-col items-center py-8 px-4">
      <QuoteHistory />
    </div>
  );
}
