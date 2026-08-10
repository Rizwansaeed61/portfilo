import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ClientProblemBlock() {
  const problems = [
    "Ad spend is increasing but lead quality remains poor or unqualified.",
    "Website traffic is not converting into actual inquiries or online sales.",
    "Tracking and attribution are incomplete (missing CAPI or GA4 events).",
    "Landing pages are slow, confusing, or unoptimized for mobile traffic.",
    "E-commerce stores suffer from high cart abandonment and low conversion rates.",
    "Marketing activities are disconnected across separate agencies or freelancers.",
    "Agencies report vanity clicks and impressions instead of actual net revenue."
  ];

  const businessImpacts = [
    "Wasted monthly ad budgets on cold, non-buying traffic.",
    "High Customer Acquisition Cost (CPA) eroding profit margins.",
    "Inability to scale ad spend with confidence due to poor conversion rates.",
    "Frustrated sales teams chasing fake or low-intent leads.",
    "Stagnant online store sales despite increasing visitor volume.",
    "Lost organic search market share to faster, structured competitors.",
    "Lack of clear attribution data to make informed business decisions."
  ];

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-slate-200/60">
      <Container>
        <SectionHeading
          badge="Growth Bottlenecks"
          questionH2="Are Your Ads, Website and Marketing Working as One Growth System?"
          subtitle="Disconnected campaigns and slow websites burn capital. Scaling requires connecting acquisition, conversion, and tracking into a single predictable pipeline."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Common Client Problems */}
          <Card variant="flat" className="border-red-200/80 bg-red-50/30">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-200/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  Common Growth Bottlenecks
                </h3>
                <p className="text-xs text-red-700 font-medium">What holds most businesses back</p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {problems.map((problem, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-800 leading-relaxed">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs font-bold mt-0.5">
                    ✕
                  </span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Right Column: Impact on Revenue & Growth */}
          <Card variant="flat" className="border-amber-200/80 bg-amber-50/30">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-200/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  Direct Business & Revenue Impact
                </h3>
                <p className="text-xs text-amber-800 font-medium">The hidden financial cost</p>
              </div>
            </div>

            <ul className="space-y-3.5">
              {businessImpacts.map((impact, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-800 leading-relaxed">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900 text-xs font-bold mt-0.5">
                    !
                  </span>
                  <span>{impact}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Closing Statement Callout */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white text-center sm:flex sm:items-center sm:justify-between gap-6 shadow-md">
          <div className="text-left space-y-1 mb-4 sm:mb-0">
            <p className="text-lg sm:text-xl font-bold font-serif text-white">
              You do not need more random marketing activity.
            </p>
            <p className="text-sm text-emerald-400 font-medium">
              You need a measurable acquisition and conversion system.
            </p>
          </div>

          <Button href="/contact" variant="primary" size="lg" className="whitespace-nowrap flex-shrink-0">
            Fix Your Growth System
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
