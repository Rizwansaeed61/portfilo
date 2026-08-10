import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonData } from "@/content/comparison";
import { CheckCircle2, MinusCircle, Check } from "lucide-react";

export function ComparisonTable() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200/60">
      <Container>
        <SectionHeading
          badge="Clear Differentiation"
          questionH2="What Is Different About Working With a Growth-Focused Specialist?"
          subtitle="How an integrated technical and media buying approach compares to hiring isolated freelancers or large multi-tiered agencies."
        />

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="py-4 px-6 text-sm font-bold font-serif w-1/4">Evaluation Criteria</th>
                <th className="py-4 px-6 text-sm font-bold font-serif text-slate-300 w-1/4">Typical Freelancer</th>
                <th className="py-4 px-6 text-sm font-bold font-serif text-slate-300 w-1/4">Traditional Agency</th>
                <th className="py-4 px-6 text-sm font-bold font-serif text-emerald-400 bg-slate-950 w-1/4">
                  Rizwan&apos;s Growth Approach
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 text-sm">
              {comparisonData.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={idx % 2 === 0 ? "bg-white" : "bg-warm-50/30"}
                >
                  <td className="py-4 px-6 font-bold text-slate-900">{row.feature}</td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-start gap-2">
                      <MinusCircle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{row.freelancer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="flex items-start gap-2">
                      <MinusCircle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{row.agency}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-900 font-medium bg-emerald-50/40 border-l border-emerald-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{row.rizwanApproach}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Friendly Card View */}
        <div className="block lg:hidden space-y-6">
          {comparisonData.map((row) => (
            <div
              key={row.feature}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs"
            >
              <h3 className="font-bold text-slate-900 text-base font-serif border-b border-slate-100 pb-2">
                {row.feature}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-500 block mb-1">Typical Freelancer:</span>
                  <p className="text-slate-700">{row.freelancer}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 block mb-1">Traditional Agency:</span>
                  <p className="text-slate-700">{row.agency}</p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-800 flex items-center gap-1 mb-1">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Rizwan&apos;s Growth Approach:
                  </span>
                  <p className="text-slate-900 font-medium">{row.rizwanApproach}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
