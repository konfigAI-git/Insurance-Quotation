import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "InsureQuick — Get Your Auto Insurance Quote",
  description: "Get instant auto insurance quotes tailored to your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <footer
            data-testid="footer"
            className="border-t py-6 text-center text-sm"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            © {new Date().getFullYear()} InsureQuick. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
