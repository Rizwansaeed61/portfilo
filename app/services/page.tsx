import React from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { siteConfig } from "@/content/site-config";

export const metadata = {
  title: "Digital Growth Services — Meta Ads, Google Ads & Shopify Development",
  description:
    "Explore Rizwan Saeed's full range of performance marketing, e-commerce web development, SEO, and lead generation services for UAE, USA, and UK clients.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Digital Growth Services — Meta Ads, Google Ads & Shopify Development",
    description: "Integrated digital marketing, Shopify web development, and CRO services for international brands.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/images/rizwan-saeed.jpg`, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Growth Services | Rizwan Saeed Specialist",
    description: "Performance ad management, Shopify development, and B2B lead generation across UAE, USA, and UK.",
    images: [`${siteConfig.url}/images/rizwan-saeed.jpg`],
  },
};

export default function ServicesOverviewPage() {
  return (
    <>
      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container>
          <Breadcrumbs items={[{ name: "Services", url: "/services" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              Services Overview
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
              Integrated Digital Growth & E-Commerce Services
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Every service is engineered around customer acquisition, conversion optimization, and verifiable business ROI across international markets.
            </p>
          </div>
        </Container>
      </div>

      {/* Services Grid */}
      <ServicesGrid />

      {/* Process Section */}
      <ProcessSection />

      {/* Final CTA */}
      <FinalCtaSection />
    </>
  );
}
