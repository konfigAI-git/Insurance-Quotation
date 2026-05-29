"use client";

import { useState } from "react";

export default function ComingSoonBanner() {
  const [visible, setVisible] = useState(true);

  const dismissBanner = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      data-testid="coming-soon-banner"
      onClick={dismissBanner}
      aria-label="Close coming soon banner"
      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium cursor-pointer hover:opacity-95 transition-opacity"
      style={{ backgroundColor: "#1d4ed8", color: "#ffffff" }}
    >
      <span className="flex-1" />
      <span
        data-testid="banner-text"
        className="flex-1 text-center"
      >
        Coming Soon: New Features!
      </span>
      <span className="flex-1 flex justify-end">
        <span
          data-testid="banner-close-btn"
          aria-hidden="true"
          className="ml-4 p-1 rounded"
        >
          &#x2715;
        </span>
      </span>
    </button>
  );
}
