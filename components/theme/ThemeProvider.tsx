"use client";

import React, { useEffect } from "react";

export function applyThemeVariables(
  primary?: string | null,
  secondary?: string | null,
  darkBg?: string | null,
  fontFamily?: string | null
) {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  if (primary) {
    root.style.setProperty("--brand-teal", primary);
  }
  if (secondary) {
    root.style.setProperty("--brand-secondary", secondary);
  }
  if (darkBg) {
    root.style.setProperty("--brand-bg-dark", darkBg);
  }

  if (fontFamily) {
    if (fontFamily === "playfair") {
      root.style.setProperty("--site-font-heading", "var(--font-serif), serif");
    } else if (fontFamily === "inter") {
      root.style.setProperty("--site-font-heading", "var(--font-inter), sans-serif");
    } else if (fontFamily === "outfit") {
      root.style.setProperty("--site-font-heading", "var(--font-outfit), sans-serif");
    } else if (fontFamily === "cinzel") {
      root.style.setProperty("--site-font-heading", "var(--font-cinzel), serif");
    }
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const savedPrimary = localStorage.getItem("site_theme_primary");
      const savedSecondary = localStorage.getItem("site_theme_secondary");
      const savedDarkBg = localStorage.getItem("site_theme_darkbg");
      const savedFont = localStorage.getItem("site_theme_font");

      applyThemeVariables(savedPrimary, savedSecondary, savedDarkBg, savedFont);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  return <>{children}</>;
}
