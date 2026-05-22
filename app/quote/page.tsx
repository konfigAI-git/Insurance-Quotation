import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Get a Quote — InsureQuick",
};

export default function QuotePage() {
  return (
    <div data-testid="quote-page" className="flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl text-center mb-6">
        <h1
          data-testid="quote-page-heading"
          className="text-3xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Get Your Insurance Quote
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Complete the steps below to see your personalized quote.
        </p>
      </div>
      <QuoteForm />
    </div>
  );
}
