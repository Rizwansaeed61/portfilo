import React from "react";
import Metadata from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AuthorByline } from "@/components/sections/AuthorByline";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EducationCertifications } from "@/components/sections/EducationCertifications";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { siteConfig } from "@/content/site-config";
import { Shield, Target, Sparkles, Award } from "lucide-react";

export const metadata = {
  title: "About Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
  description:
    "Learn about Rizwan Saeed's 5+ years of experience managing performance ad spend and Shopify builds for UAE, USA, and UK businesses.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Measurable Business Outcomes",
      desc: "Every campaign, ad set, and code edit must connect back to net revenue, target CPA, or qualified lead volume — never vanity metrics.",
      icon: Target,
    },
    {
      title: "Technical & Strategic Integration",
      desc: "True growth happens when media buying (Meta/Google Ads), web code (Shopify/Next.js), and tracking (CAPI/GA4) operate as one connected engine.",
      icon: Sparkles,
    },
    {
      title: "Direct Specialist Accountability",
      desc: "You work directly with the senior specialist planning your strategy and executing your code, eliminating agency communication lag.",
      icon: Shield,
    },
    {
      title: "Honest Scope & Client Respect",
      desc: "No exaggerated claims or guaranteed conversion percentages. Clear expectations, transparent reporting, and empirical data.",
      icon: Award,
    },
  ];

  return (
    <>
      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container>
          <Breadcrumbs items={[{ name: "About", url: "/about" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              Professional Story & Background
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
              About Rizwan Saeed
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Digital Marketing Manager, Performance Marketer and Shopify Developer with over 5 years of international experience across the UAE, USA and UK markets.
            </p>
          </div>
        </Container>
      </div>

      {/* Author Bio Block */}
      <AuthorByline />

      {/* Core Values & Working Philosophy */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200/60">
        <Container>
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Core Principles & Growth Philosophy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              The foundational standards that guide every advertising account, web development project, and client relationship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-warm-50/30 space-y-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <ExperienceTimeline />

      {/* Education & Credentials */}
      <EducationCertifications />

      {/* Final CTA */}
      <FinalCtaSection />
    </>
  );
}
