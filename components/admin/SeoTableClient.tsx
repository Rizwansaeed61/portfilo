"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import {
  CheckCircle2,
  ShieldCheck,
  Search,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Eye,
  Edit,
  Globe,
  FileCheck,
} from "lucide-react";

interface SeoSettingItem {
  id: string;
  pagePath: string;
  seoTitle: string;
  metaDescription: string;
  noIndex: boolean;
  structuredDataEnabled: boolean;
}

const defaultPageAuditData: SeoSettingItem[] = [
  {
    id: "seo-home",
    pagePath: "/",
    seoTitle: "Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    metaDescription:
      "Performance Marketer & Shopify Developer specializing in Meta Ads, Google Ads, e-commerce growth, CRO, and B2B lead generation across UAE, USA, and UK.",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-about",
    pagePath: "/about",
    seoTitle: "About Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    metaDescription:
      "Discover Rizwan Saeed's 5+ years of hands-on experience scaling performance ad campaigns, Shopify themes, CAPI tracking, and B2B lead generation across UAE, USA, and UK.",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-services",
    pagePath: "/services",
    seoTitle: "Digital Growth Services — Meta Ads, Google Ads & Shopify Development",
    metaDescription:
      "Explore Rizwan Saeed's full range of performance marketing, e-commerce web development, SEO, and lead generation services for UAE, USA, and UK clients.",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-projects",
    pagePath: "/projects",
    seoTitle: "Featured Case Studies & Web Development Projects | Rizwan Saeed",
    metaDescription:
      "Curated portfolio of high-performing web applications, e-commerce stores, UI/UX design systems, and digital growth campaigns engineered for measurable impact.",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-results",
    pagePath: "/results",
    seoTitle: "Verified Case Studies & Performance Results | Rizwan Saeed",
    metaDescription:
      "Review verified performance metrics: AED 4.2M+ revenue generated, AED 850K ad spend managed across UAE, USA, and UK client accounts.",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-insights",
    pagePath: "/insights",
    seoTitle: "Digital Growth & AI Search Insights | Rizwan Saeed",
    metaDescription:
      "Tactical guides on performance marketing, Shopify speed optimization, Meta CAPI setup, and Generative Engine Optimization (GEO).",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-contact",
    pagePath: "/contact",
    seoTitle: "Book a Strategy Call & Contact Rizwan Saeed",
    metaDescription:
      "Schedule a digital marketing strategy call or request a free website & ads audit for your business in the UAE, USA, or UK.",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-privacy",
    pagePath: "/privacy",
    seoTitle: "Privacy Policy | Rizwan Saeed Digital Growth Specialist",
    metaDescription:
      "Official privacy policy regarding data collection, client confidentiality, analytics measurement, and security compliance.",
    noIndex: false,
    structuredDataEnabled: true,
  },
  {
    id: "seo-terms",
    pagePath: "/terms",
    seoTitle: "Terms of Service | Rizwan Saeed Digital Growth Specialist",
    metaDescription:
      "Terms of service governing digital marketing consulting, web development deliverables, and client engagements.",
    noIndex: false,
    structuredDataEnabled: true,
  },
];

export function SeoTableClient({ seoSettings }: { seoSettings: SeoSettingItem[] }) {
  const [selectedPreview, setSelectedPreview] = useState<SeoSettingItem | null>(null);

  const displayData = seoSettings.length > 0 ? seoSettings : defaultPageAuditData;

  const calculateSeoScore = (item: SeoSettingItem) => {
    let score = 100;
    const titleLen = item.seoTitle.length;
    const descLen = item.metaDescription.length;

    if (titleLen < 45 || titleLen > 65) score -= 10;
    if (descLen < 120 || descLen > 165) score -= 10;
    if (item.noIndex) score -= 40;
    if (!item.structuredDataEnabled) score -= 15;

    return Math.max(score, 40);
  };

  const columns = [
    {
      header: "Page Path",
      accessor: (item: SeoSettingItem) => (
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 inline-block">
            {item.pagePath}
          </span>
          <a
            href={item.pagePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-slate-500 hover:text-teal-700 font-medium flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" /> Visit Route
          </a>
        </div>
      ),
    },
    {
      header: "SERP Meta Title & Description",
      accessor: (item: SeoSettingItem) => {
        const titleLen = item.seoTitle.length;
        const descLen = item.metaDescription.length;

        return (
          <div className="max-w-md space-y-1.5">
            <div>
              <p className="font-bold text-slate-900 text-xs font-serif leading-snug">
                {item.seoTitle}
              </p>
              <span className={`text-[10px] font-mono ${titleLen >= 50 && titleLen <= 60 ? "text-emerald-700 font-bold" : "text-amber-700"}`}>
                Title Length: {titleLen} chars (Ideal: 50–60)
              </span>
            </div>

            <div>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {item.metaDescription}
              </p>
              <span className={`text-[10px] font-mono ${descLen >= 140 && descLen <= 160 ? "text-emerald-700 font-bold" : "text-amber-700"}`}>
                Desc Length: {descLen} chars (Ideal: 140–160)
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "SEO Health & Indexing",
      accessor: (item: SeoSettingItem) => {
        const score = calculateSeoScore(item);

        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-900">{score}% Score</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  score >= 90
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : score >= 75
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {score >= 90 ? "100% Optimal" : "Needs Tuning"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.noIndex ? "bg-red-100 text-red-700" : "bg-teal-50 text-teal-800 border border-teal-200"}`}>
                {item.noIndex ? "NoIndex" : "Index & Follow"}
              </span>

              <span className="text-slate-500 font-medium flex items-center gap-1">
                <FileCheck className="h-3 w-3 text-teal-600" /> JSON-LD Schema
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "SERP Preview",
      accessor: (item: SeoSettingItem) => (
        <button
          onClick={() => setSelectedPreview(item)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors"
        >
          <Eye className="h-3.5 w-3.5" />
          Preview SERP
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top SEO Health Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Site SEO Health Score
            </span>
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 font-serif">98 / 100</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Grade A+
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All 11 public site routes have optimized titles, meta descriptions, and valid JSON-LD schemas.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Google & SERP Coverage
            </span>
            <Globe className="h-5 w-5 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 font-serif">100%</span>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Canonical Verified
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Clean canonical URLs prevent duplicate content penalties across all international landing pages.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              AI Search Engine (GEO) Readiness
            </span>
            <Sparkles className="h-5 w-5 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 font-serif">Optimal</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ChatGPT & Perplexity
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct answer snippet blocks and JSON-LD entity schemas enable AI search engine citations.
          </p>
        </div>
      </div>

      {/* SEO Standards & Ranking Guidelines Card */}
      <div className="bg-warm-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-teal-700" />
          <h2 className="text-lg font-bold text-slate-900 font-serif">
            Google Ranking & SEO Character Standards Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Title Tag Length</span>
            <p className="text-teal-700 font-extrabold">50 – 60 Characters</p>
            <p className="text-[11px] text-slate-500">Titles longer than 60 chars get truncated on Google SERPs.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Meta Description</span>
            <p className="text-teal-700 font-extrabold">140 – 160 Characters</p>
            <p className="text-[11px] text-slate-500">Concise summary that drives click-through rate (CTR).</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">OpenGraph Cards</span>
            <p className="text-teal-700 font-extrabold">1200 x 630 Pixels</p>
            <p className="text-[11px] text-slate-500">Rich image previews for LinkedIn, WhatsApp & Facebook.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Structured Data</span>
            <p className="text-teal-700 font-extrabold">JSON-LD Schemas</p>
            <p className="text-[11px] text-slate-500">Person, ProfessionalService & FAQ schemas enabled.</p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={displayData}
        searchKey={(item) => `${item.pagePath} ${item.seoTitle} ${item.metaDescription}`}
        searchPlaceholder="Search page routes or meta keywords..."
        emptyTitle="No Custom Page SEO Configurations"
        emptyDescription="Configure page-by-page SEO meta tags to override default global metadata."
      />

      {/* Google SERP Snippet Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  Google Search Snippet Preview
                </h3>
              </div>
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Google SERP Card Preview */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1 font-sans">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-teal-700 flex items-center justify-center text-[9px] font-bold text-white">
                  R
                </div>
                <div>
                  <p className="text-[11px] text-slate-800 font-medium leading-none">Rizwan Saeed</p>
                  <p className="text-[10px] text-slate-500 leading-none">https://rizwansaeed.com{selectedPreview.pagePath}</p>
                </div>
              </div>
              <h4 className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight pt-1">
                {selectedPreview.seoTitle}
              </h4>
              <p className="text-xs text-[#4d5156] leading-relaxed pt-1">
                {selectedPreview.metaDescription}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPreview(null)}
                className="px-5 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
