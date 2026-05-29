"use client";

import { useState } from "react";

export default function ComingSoonBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      data-testid="coming-soon-banner"
      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium"
      style={{ backgroundColor: "#1d4ed8", color: "#ffffff" }}
    >
      <div className="flex-1" />
      <p
        data-testid="banner-text"
        className="flex-1 text-center"
      >
        Coming Soon: New Features!
      </p>
      <div className="flex-1 flex justify-end">
        <button
          data-testid="banner-close-btn"
          onClick={() => setVisible(false)}
          aria-label="Close banner"
          className="ml-4 p-1 rounded hover:opacity-70 transition-opacity"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
