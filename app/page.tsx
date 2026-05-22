import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-900">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <nav className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            InsuranceQuote
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/quote"
              className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              data-testid="nav-quote-btn"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Affordable Insurance for Everyone
          </h2>
          <p className="mb-10 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Get a personalized insurance quote in minutes. We'll help you find
            the right coverage for your needs at the best price.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="rounded-full bg-zinc-900 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              data-testid="cta-get-quote-btn"
            >
              Start Your Quote
            </Link>
            <Link
              href="/summary"
              className="rounded-full border border-zinc-300 bg-white px-8 py-4 text-lg font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
              data-testid="cta-view-summary-btn"
            >
              View Summary
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} InsuranceQuote. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
