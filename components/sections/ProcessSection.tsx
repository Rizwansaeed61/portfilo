import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TopographicWaveBackground } from "@/components/ui/TopographicWaveBackground";
import { Search, Compass, Cpu, TrendingUp, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Audit & Strategy Review",
      icon: <Search className="w-6 h-6 text-[#00a896]" />,
      subtitle: "Deep-dive diagnostic of existing ad campaigns, pixel tracking, Shopify UX, and competitor positioning.",
      highlights: ["GA4 & Pixel Audit", "Shopify Speed & CRO", "Ad Spend Waste Check"],
    },
    {
      number: "02",
      title: "Growth Funnel Blueprint",
      icon: <Compass className="w-6 h-6 text-[#00a896]" />,
      subtitle: "Designing custom campaign structures, targeted offer hooks, Liquid landing pages, and audience personas.",
      highlights: ["Target CPA Modeling", "Offer Copywriting", "Multi-Touch Attribution"],
    },
    {
      number: "03",
      title: "Precision Campaign Execution",
      icon: <Cpu className="w-6 h-6 text-[#00a896]" />,
      subtitle: "Launching Meta Ads, Google Ads PPC, custom Liquid store modifications, and automated email flows.",
      highlights: ["Meta CAPI Setup", "Google Search & PMax", "Liquid Theme Customization"],
    },
    {
      number: "04",
      title: "Scale & Revenue Optimization",
      icon: <TrendingUp className="w-6 h-6 text-[#00a896]" />,
      subtitle: "Continuous bid optimization, creative iteration, retargeting funnels, and scaling net profitable ROAS.",
      highlights: ["Daily CPA Optimization", "Retargeting Sequences", "Monthly Revenue Growth"],
    },
  ];

  return (
    <section id="process" className="bg-white py-16 sm:py-24 border-b border-slate-200/80 relative overflow-hidden">
      <TopographicWaveBackground opacity={0.16} mode="light" />
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-extrabold uppercase tracking-widest text-[#00a896]">
            <ShieldCheck className="w-3.5 h-3.5" />
            4-STAGE DIGITAL GROWTH METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            How We Deliver Predictable Campaign ROI
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            A structured, data-first process designed to eliminate ad spend waste and build scalable e-commerce & lead generation systems.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative space-y-5 hover:border-[#00a896]/60"
            >
              <div className="space-y-4">
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 group-hover:bg-[#00a896] group-hover:text-white transition-colors">
                    {React.cloneElement(step.icon, {
                      className: "w-6 h-6 text-[#00a896] group-hover:text-white transition-colors",
                    })}
                  </div>
                  <span className="text-2xl font-black font-serif text-slate-300 group-hover:text-[#00a896] transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-serif leading-tight group-hover:text-[#00a896] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {step.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00a896] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00a896] hover:bg-[#028090] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <span>Book Your Free Growth Strategy Audit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
