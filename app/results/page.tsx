import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { TrustMetricsBar } from "@/components/sections/TrustMetricsBar";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { siteConfig } from "@/content/site-config";

export const metadata = {
  title: "Verified Case Studies & Performance Results | Rizwan Saeed",
  description:
    "Review verified performance metrics: AED 4.2M+ revenue generated, AED 850K ad spend managed across UAE, USA, and UK client accounts.",
  alternates: {
    canonical: `${siteConfig.url}/results`,
  },
};

export default function ResultsPage() {
  return (
    <>
      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container>
          <Breadcrumbs items={[{ name: "Results", url: "/results" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              Measurable Performance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
              Verified Track Record & Case Study Outcomes
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Empirical proof from performance ad campaigns, e-commerce stores, and digital growth projects across the UAE, USA and UK.
            </p>
          </div>
        </Container>
      </div>

      <TrustMetricsBar />
      <ResultsSection />
      <FinalCtaSection />
    </>
  );
}
