"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site-config";
import { mainNavigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { Menu, X, PhoneCall } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem("site_logo_url");
      if (savedLogo) {
        setCustomLogo(savedLogo);
      }
    } catch {
      // Fallback
    }
  }, []);

  // Scroll detection for header background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleCtaClick = (type: "strategy_call" | "whatsapp") => {
    if (type === "strategy_call") {
      trackEvent("book_strategy_call_click", { location: "header" });
    } else {
      trackEvent("whatsapp_click", { location: "header_mobile" });
    }
  };

  return (
    <>
      {/* Skip to Content for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo / Monogram */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none rounded-md"
              aria-label="Rizwan Saeed — Homepage"
            >
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Site Logo"
                  className="h-9 w-auto max-w-[140px] object-contain rounded-md"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00a896] text-white font-serif font-bold text-base tracking-wider shadow-sm group-hover:bg-[#028090] transition-colors">
                  RS
                </div>
              )}
              <span className="font-extrabold text-slate-900 text-lg tracking-wider uppercase group-hover:text-[#00a896] transition-colors">
                RIZWAN <span className="text-[#00a896] font-light">SAEED</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-sm font-semibold transition-all hover:text-teal-600 focus-visible:outline-none py-1 relative ${
                      isActive
                        ? "text-teal-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:rounded-full"
                        : "text-slate-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                onClick={() => handleCtaClick("strategy_call")}
                className="bg-[#00a896] hover:bg-[#028090] text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                Let's Talk
              </Link>
            </div>

            {/* Mobile Actions (WhatsApp CTA + Hamburger) */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCtaClick("whatsapp")}
                className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Contact on WhatsApp"
              >
                <PhoneCall className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center h-10 w-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-x-0 top-20 z-50 bottom-0 bg-white border-t border-slate-200 p-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-fade-in"
          >
            <div className="space-y-4">
              <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
                {mainNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium py-2.5 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-emerald-50 text-emerald-800 font-semibold"
                          : "text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-3 mt-6">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCtaClick("strategy_call");
                }}
              >
                Book a Strategy Call
              </Button>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCtaClick("whatsapp");
                }}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg border border-slate-300 text-slate-800 font-medium hover:bg-slate-50 transition-colors"
              >
                <PhoneCall className="h-4 w-4 text-emerald-600" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
