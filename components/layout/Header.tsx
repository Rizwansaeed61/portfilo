"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site-config";
import { mainNavigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { Menu, X, PhoneCall, Sparkles } from "lucide-react";

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

  // Scroll detection
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
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00a896] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none font-bold text-xs"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full pt-3 pb-2 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
        <div className="mx-auto max-w-7xl pointer-events-auto">
          {/* Floating Dark Glass Header Bar (FunnelCore Style) */}
          <div
            className={`rounded-2xl sm:rounded-full transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between border shadow-2xl backdrop-blur-md ${
              scrolled
                ? "bg-[#060c1a]/95 border-slate-700/80 ring-1 ring-white/10 shadow-emerald-950/30"
                : "bg-[#060c1a]/90 border-slate-800/90 ring-1 ring-white/5"
            }`}
          >
            {/* Logo / Brand Monogram */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none"
              aria-label="Rizwan Saeed — Homepage"
            >
              {customLogo ? (
                <img
                  src={customLogo}
                  alt="Site Logo"
                  className="h-9 w-auto max-w-[130px] object-contain rounded-lg"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00a896] text-white font-serif font-extrabold text-sm tracking-wider shadow-md group-hover:scale-105 transition-transform ring-2 ring-[#00a896]/30">
                  RS
                </div>
              )}

              <span className="font-extrabold text-white text-base sm:text-lg tracking-wider uppercase">
                RIZWAN <span className="text-[#00a896] font-light">SAEED</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href || (item.href === "/" && pathname === "/");
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs font-bold uppercase tracking-wider transition-all duration-200 py-1.5 relative ${
                      isActive
                        ? "text-[#00a896] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#00a896] after:rounded-full font-extrabold"
                        : "text-slate-200 hover:text-[#00a896]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                onClick={() => handleCtaClick("strategy_call")}
                className="bg-[#00a896] hover:bg-[#028090] text-white px-6 py-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <span>Let's Talk</span>
              </Link>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCtaClick("whatsapp")}
                className="flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-500/20 text-[#00a896] border border-[#00a896]/40 hover:bg-[#00a896] hover:text-white transition-colors"
                aria-label="Contact on WhatsApp"
              >
                <PhoneCall className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800 focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-x-3 top-20 z-50 bg-[#060c1a]/98 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden animate-fade-in pointer-events-auto max-h-[85vh]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#00a896]">
                  Navigation Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
                {mainNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-sm font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? "bg-[#00a896] text-white font-extrabold shadow-md"
                          : "text-slate-300 hover:bg-slate-900 hover:text-[#00a896]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3 mt-6">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full text-xs font-bold uppercase tracking-wider rounded-xl py-3"
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
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
              >
                <PhoneCall className="h-4 w-4 text-[#00a896]" />
                Message on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
