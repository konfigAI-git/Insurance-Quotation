import Link from "next/link";
import ComingSoonBanner from "./components/ComingSoonBanner";

export default function HomePage() {
  return (
    <div
      data-testid="home-page"
      className="flex-1 flex flex-col"
    >
      <ComingSoonBanner />
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full text-center">
        <div
          className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
          style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          Fast &bull; Simple &bull; Affordable
        </div>
        <h1
          data-testid="hero-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          style={{ color: "var(--foreground)" }}
        >
          Get Your Auto Insurance Quote in Minutes
        </h1>
        <p
          data-testid="hero-description"
          className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--muted-foreground)" }}
        >
          Compare Basic, Standard, and Premium coverage plans. Tailored pricing based on your
          vehicle and driving history — no hidden fees, no surprises.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quote"
            data-testid="hero-cta-btn"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Start Your Free Quote →
          </Link>
          <Link
            href="/quotes"
            data-testid="hero-history-btn"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold border transition-colors hover:opacity-80"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              backgroundColor: "var(--card)",
            }}
          >
            View Saved Quotes
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            { icon: "⚡", title: "Instant Quotes", desc: "Get coverage estimates in under 3 minutes." },
            { icon: "🔒", title: "Secure & Private", desc: "Your data never leaves your device." },
            { icon: "📋", title: "Multiple Plans", desc: "Choose Basic, Standard, or Premium coverage." },
          ].map((item, i) => (
            <div
              key={i}
              data-testid={`feature-card-${i}`}
              className="p-6 rounded-2xl border"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
