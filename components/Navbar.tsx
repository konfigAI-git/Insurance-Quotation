"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      data-testid="navbar"
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          data-testid="nav-logo-link"
          className="text-xl font-bold"
          style={{ color: "var(--primary)" }}
        >
          InsureQuick
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            data-testid="nav-home-link"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--foreground)" }}
          >
            Home
          </Link>
          <Link
            href="/quote"
            data-testid="nav-quote-link"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--foreground)" }}
          >
            Get Quote
          </Link>
          <button
            data-testid="theme-toggle-btn"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="p-2 rounded-lg border transition-colors"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--muted)",
              color: "var(--foreground)",
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
