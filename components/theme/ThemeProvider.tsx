"use client";

import React, { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load saved colors from localStorage if available
    try {
      const savedPrimary = localStorage.getItem("site_theme_primary");
      const savedSecondary = localStorage.getItem("site_theme_secondary");

      if (savedPrimary) {
        document.documentElement.style.setProperty("--brand-teal", savedPrimary);
      }
      if (savedSecondary) {
        document.documentElement.style.setProperty("--brand-secondary", savedSecondary);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  return <>{children}</>;
}
