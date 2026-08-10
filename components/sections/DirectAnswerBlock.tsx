import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Sparkles, ArrowRight } from "lucide-react";

export function DirectAnswerBlock() {
  return (
    <section className="bg-slate-50 py-10 sm:py-12 border-b border-slate-200/60">
      <Container size="narrow">
        <div className="relative rounded-2xl bg-white p-6 sm:p-8 border-2 border-emerald-500/40 shadow-sm">
          {/* AI Search Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Direct Answer — Executive Summary</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mb-3">
            How can Rizwan Saeed help grow your business?
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Rizwan helps businesses generate qualified leads, increase online sales and improve marketing ROI through Google Ads, Meta Ads, SEO, Shopify development, landing-page optimization and analytics. Every strategy is built around measurable business outcomes rather than impressions, followers or vanity metrics.
          </p>

          {/* Contextual Internal Links for SEO */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
            <span className="text-slate-500">Explore Core Areas:</span>
            <Link
              href="/services"
              className="inline-flex items-center text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Growth Services <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
            <Link
              href="/results"
              className="inline-flex items-center text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Verified Results <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Contact & Booking <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
