"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site-config";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, PhoneCall, ShieldCheck, CheckCircle2 } from "lucide-react";

export function FinalCtaSection() {
  const handleCtaClick = (type: "strategy_call" | "whatsapp" | "audit") => {
    if (type === "strategy_call") {
      trackEvent("book_strategy_call_click", { location: "final_cta" });
    } else if (type === "whatsapp") {
      trackEvent("whatsapp_click", { location: "final_cta" });
    } else {
      trackEvent("audit_request_click", { location: "final_cta" });
    }
  };

  return (
    <section className="bg-slate-950 text-white py-16 sm:py-24 border-b border-slate-800">
      <Container size="narrow">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Start Your Digital Growth Project
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-white leading-tight">
            Ready to Turn Your Website and Advertising Into a Growth System?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Share your current challenges, goals and marketing setup. You will receive a practical recommendation on the best next step for your business.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              onClick={() => handleCtaClick("strategy_call")}
              className="w-full sm:w-auto"
            >
              Book a Free Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick("whatsapp")}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-semibold text-base hover:bg-slate-800 transition-colors"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              Message on WhatsApp
            </a>
          </div>

          {/* Third option audit link */}
          <div className="pt-2">
            <Link
              href="/contact?type=audit"
              onClick={() => handleCtaClick("audit")}
              className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              <ShieldCheck className="h-4 w-4 mr-1.5" />
              Request a Free Website & Ads Audit →
            </Link>
          </div>

          {/* Reassurance points */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              No-obligation initial discussion
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Clear, practical next steps
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              International clients welcome (UAE, USA, UK)
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
