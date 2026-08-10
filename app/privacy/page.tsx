import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/content/site-config";
import { prisma } from "@/lib/db/prisma";

export async function generateMetadata() {
  const page = await prisma.legalPage.findUnique({
    where: { slug: "privacy" },
  });

  return {
    title: page?.seoTitle || page?.title || "Privacy Policy | Rizwan Saeed",
    description:
      page?.seoDescription ||
      "Privacy Policy for Rizwan Saeed's personal-brand and performance marketing website.",
    alternates: {
      canonical: `${siteConfig.url}/privacy`,
    },
  };
}

export default async function PrivacyPage() {
  const page = await prisma.legalPage.findUnique({
    where: { slug: "privacy" },
  });

  const title = page?.title || "Privacy Policy";
  const badgeText = page?.badgeText || "Legal Document";
  const lastUpdated = page?.lastUpdated || "August 8, 2026";
  const noticeText =
    page?.noticeText ||
    "Notice: This document is a privacy policy clearly outlining how client and user data is processed.";

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
        title: "1. Information We Collect",
        content:
          "When you submit a project inquiry or contact request through this website, we collect your full name, work email address, phone or WhatsApp number, company name, website URL, target market, and project details.",
      },
      {
        title: "2. How We Use Your Information",
        content:
          "Information submitted via our contact forms is strictly used to evaluate your business requirements, communicate regarding your strategy session, and provide requested digital marketing recommendations. We do not sell or share personal data with third parties.",
      },
      {
        title: "3. Analytics & Cookies",
        content:
          "This website uses privacy-conscious analytics (Google Analytics 4, GTM, Meta Pixel) to measure site traffic and event interactions. You can manage or disable cookie preferences in your browser settings.",
      },
      {
        title: "4. Data Protection & Security",
        content:
          "We implement industry-standard input validation, honeypot spam protection, and server-side encryption to safeguard your data against unauthorized access.",
      },
      {
        title: "5. Contact Information",
        content: `For privacy-related inquiries or data removal requests, contact: ${siteConfig.email}`,
      },
    ];
  }

  return (
    <>
      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container size="narrow">
          <Breadcrumbs items={[{ name: title, url: "/privacy" }]} />

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
