import React from "react";
import { Container } from "@/components/ui/Container";
import { TrendingUp, DollarSign, Award, Globe, ShieldCheck } from "lucide-react";

export function ResultsSection() {
  const metrics = [
    {
      value: "AED 4.2M+",
      label: "Client Revenue Generated",
      subtitle: "Verified cross-platform e-commerce & hospitality sales",
      icon: <TrendingUp className="w-7 h-7 text-[#00a896]" />,
    },
    {
      value: "AED 850K+",
      label: "Performance Ad Spend Managed",
      subtitle: "Meta & Google Ads campaigns managed with positive ROAS",
      icon: <DollarSign className="w-7 h-7 text-[#00a896]" />,
    },
    {
      value: "5+ Years",
      label: "International Growth Experience",
      subtitle: "Scaling brands across D2C, B2B, and hospitality",
      icon: <Award className="w-7 h-7 text-[#00a896]" />,
    },
    {
      value: "USA · UK · UAE",
      label: "Core Target Markets Served",
      subtitle: "Localized campaign structures and multi-currency systems",
      icon: <Globe className="w-7 h-7 text-[#00a896]" />,
    },
  ];

  return (
    <section className="bg-[#060c1a] bg-dot-grid-dark text-white py-16 sm:py-24 border-b border-slate-800">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-bold uppercase tracking-widest text-[#00a896]">
            <ShieldCheck className="w-3.5 h-3.5" />
            VERIFIED METRICS & PERFORMANCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
            Results That Impact Net Bottom Line
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Focusing strictly on customer acquisition cost (CPA), return on ad spend (ROAS), and scalable online revenue.
          </p>
        </div>

        {/* 4 Stat Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 p-7 rounded-2xl border border-slate-800/80 hover:border-[#00a896]/60 transition-all text-left space-y-4 hover:-translate-y-1 shadow-xl"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                {metric.icon}
              </div>

              {/* Number Stat */}
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-serif">
                {metric.value}
              </div>

              {/* Label & Subtitle */}
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-200">
                  {metric.label}
                </p>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {metric.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
