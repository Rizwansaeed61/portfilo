import React from "react";
import { Container } from "@/components/ui/Container";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

export function EducationCertifications() {
  const credentials = [
    {
      type: "Degree",
      title: "Bachelor of Science in Information Technology",
      institution: "Bahauddin Zakariya University (BZU)",
      year: "2019",
      icon: GraduationCap,
      details: "Core foundation in information systems, software development, database design, and web technologies.",
    },
    {
      type: "Certification",
      title: "Certification in Media Buying",
      institution: "Meta Blueprint",
      year: "2020",
      icon: Award,
      details: "Verified proficiency in Meta ad campaign architecture, CBO scaling, Conversions API, and retargeting.",
    },
    {
      type: "Certification",
      title: "Certification in Google Ads",
      institution: "Google",
      year: "2020",
      icon: Award,
      details: "Certified search intent optimization, Performance Max bidding strategies, and Google Analytics conversion tracking.",
    },
  ];

  return (
    <section className="bg-warm-50/60 py-12 sm:py-16 border-b border-slate-200/60">
      <Container>
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
            Academic & Professional Qualifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mt-3">
            Education and Verified Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    {item.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base font-serif leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-1">
                    {item.institution}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {item.details}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Professional Credential</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
