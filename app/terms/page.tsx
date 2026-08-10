import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/content/site-config";
import { prisma } from "@/lib/db/prisma";

export async function generateMetadata() {
  const page = await prisma.legalPage.findUnique({
    where: { slug: "terms" },
  });

  return {
    title: page?.seoTitle || page?.title || "Terms of Service | Rizwan Saeed",
    description:
      page?.seoDescription ||
      "Terms of Service for Rizwan Saeed's personal-brand website and performance marketing consulting.",
    alternates: {
      canonical: `${siteConfig.url}/terms`,
    },
  };
}

export default async function TermsPage() {
  const page = await prisma.legalPage.findUnique({
    where: { slug: "terms" },
  });

  const title = page?.title || "Terms of Service";
  const badgeText = page?.badgeText || "Legal Document";
  const lastUpdated = page?.lastUpdated || "August 8, 2026";
  const noticeText =
    page?.noticeText ||
    "Notice: This document outlines the terms and conditions for using this website and consulting services.";

  let sections: Array<{ title: string; content: string }> = [];
  if (page?.sectionsJson) {
    try {
      sections = JSON.parse(page.sectionsJson);
    } catch {
      sections = [];
    }
  }

  if (sections.length === 0) {
    sections = [
      {
        title: "1. Website Usage",
        content: `By accessing and using this website (${siteConfig.url}), you agree to comply with these terms. The content provided on this site is for informational and business consulting inquiry purposes.`,
      },
      {
        title: "2. Intellectual Property",
        content:
          "All original text, strategy frameworks, code samples, and website assets are owned by Rizwan Saeed unless otherwise stated. Reproduction without written consent is prohibited.",
      },
      {
        title: "3. Performance Disclaimers",
        content:
          "Case studies and historical revenue metrics (e.g., AED 4.2M+ Revenue) reflect past project outcomes. Advertising performance depends on market factors, ad budgets, product offer quality, and audience demand. We do not guarantee specific monetary returns or fixed conversion rates.",
      },
      {
        title: "4. Service Agreements",
        content:
          "Specific client engagements, ad management retainers, and web development projects are governed by separate, formal master service agreements (MSAs) executed prior to project kickoff.",
      },
    ];
  }

  return (
    <>
      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container size="narrow">
          <Breadcrumbs items={[{ name: title, url: "/terms" }]} />

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
              {badgeText}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              {title}
            </h1>
            <p className="text-xs text-slate-500">Last updated: {lastUpdated}</p>
          </div>
        </Container>
      </div>

      <section className="bg-white py-12 sm:py-16 border-b border-slate-200/60">
        <Container size="narrow">
          <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-700 leading-relaxed">
            {noticeText && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                {noticeText}
              </div>
            )}

            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 font-serif">{sec.title}</h2>
                <p className="whitespace-pre-line text-slate-700 leading-relaxed">{sec.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
