import React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site-config";
import { TrendingUp, DollarSign, Award, Globe } from "lucide-react";

export function TrustMetricsBar({
  revenue = siteConfig.verifiedMetrics.revenueGenerated,
  adSpend = siteConfig.verifiedMetrics.adSpendManaged,
  experience = siteConfig.verifiedMetrics.yearsExperience,
  markets = siteConfig.verifiedMetrics.marketsServed,
}: {
  revenue?: string;
  adSpend?: string;
  experience?: string;
  markets?: string;
}) {
  const metrics = [
    {
      label: "Revenue Generated",
      value: revenue,
      icon: TrendingUp,
      context: "Direct & Assisted Sales",
    },
    {
      label: "Ad Spend Managed",
      value: adSpend,
      icon: DollarSign,
      context: "Meta & Google Ads",
    },
    {
      label: "International Experience",
      value: experience,
      icon: Award,
      context: "Digital & E-commerce",
    },
    {
      label: "Markets Served",
      value: markets,
      icon: Globe,
      context: "Global Client Scope",
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-10 sm:py-12 border-y border-slate-800">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex flex-col items-center text-center ${
                  idx !== 0 ? "pt-4 md:pt-0 md:pl-6" : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                  {item.label}
                </p>
                <span className="text-[11px] text-slate-400 mt-1">
                  {item.context}
                </span>
              </div>
            );
          })}
        </div>

        {/* Small clarification requirement */}
        <div className="mt-8 text-center pt-6 border-t border-slate-800/60">
          <p className="text-xs text-slate-400 font-medium">
            * Results achieved across hospitality, retail, e-commerce and B2B projects.
          </p>
        </div>
      </Container>
    </section>
  );
}
