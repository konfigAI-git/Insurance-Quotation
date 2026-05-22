"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { SavedQuote, QUOTE_STORAGE_KEY } from "@/lib/types";

export default function QuoteHistory() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(QUOTE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        startTransition(() => setQuotes(parsed));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLoad = (quote: SavedQuote) => {
    sessionStorage.setItem("insureQuickQuoteData", JSON.stringify(quote));
    router.push("/summary");
  };

  return (
    <div data-testid="quote-history" className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <h1
          data-testid="history-heading"
          className="text-3xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Saved Quotes
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          All your previously saved insurance quotes.
        </p>
      </div>

      {quotes.length === 0 ? (
        <div data-testid="history-empty" className="text-center py-16">
          <p className="text-lg mb-4" style={{ color: "var(--muted-foreground)" }}>
            No saved quotes yet.
          </p>
          <button
            data-testid="history-start-btn"
            onClick={() => router.push("/quote")}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Get Your First Quote
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {quotes.map((q) => (
            <li
              key={q.id}
              data-testid={`history-item-${q.id}`}
              className="rounded-xl border p-5 flex items-center justify-between gap-4"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                  {q.fullName} — {q.vehicleYear} {q.vehicleMake} {q.vehicleModel}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  {q.coverageType.charAt(0).toUpperCase() + q.coverageType.slice(1)} Plan · $
                  {q.monthlyPremium}/mo · Saved{" "}
                  {new Date(q.savedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                data-testid={`history-view-btn-${q.id}`}
                onClick={() => handleLoad(q)}
                className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold"
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
