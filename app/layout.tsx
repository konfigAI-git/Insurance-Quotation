import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-900 dark:text-white">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
              <nav className="mx-auto flex max-w-5xl items-center justify-between">
                <Link
                  href="/"
                  className="text-2xl font-bold text-zinc-900 transition-colors hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300"
                  data-testid="nav-home-link"
                >
                  InsuranceQuote
                </Link>
                <div className="flex items-center gap-4">
                  <Link
                    href="/quote"
                    className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:block"
                    data-testid="nav-quote-link"
                  >
                    Get a Quote
                  </Link>
                  <Link
                    href="/summary"
                    className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:block"
                    data-testid="nav-summary-link"
                  >
                    Summary
                  </Link>
                  <ThemeToggle />
                </div>
              </nav>
            </header>
            <main className="flex flex-1 flex-col">{children}</main>
            <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mx-auto max-w-5xl text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  © {new Date().getFullYear()} InsuranceQuote. All rights
                  reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
