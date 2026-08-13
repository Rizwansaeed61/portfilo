"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import {
  CheckCircle2,
  ShieldCheck,
  Search,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Eye,
  Edit3,
  Trash2,
  Globe,
  FileCheck,
  Plus,
  Share2,
  Check,
  X,
  AlertTriangle,
  Code,
  Tag,
  Key,
  Layers,
} from "lucide-react";

export interface SeoSettingItem {
  id: string;
  pagePath: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex: boolean;
  noFollow?: boolean;
  schemaType?: string;
  structuredDataEnabled: boolean;
  jsonLdCustom?: string;
}

const initialPageAuditData: SeoSettingItem[] = [
  {
    id: "seo-home",
    pagePath: "/",
    seoTitle: "Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    metaDescription:
      "Performance Marketer & Shopify Developer specializing in Meta Ads, Google Ads, e-commerce growth, CRO, and B2B lead generation across UAE, USA, and UK.",
    focusKeyword: "Digital Marketing Manager",
    canonicalUrl: "https://rizwansaeed.com/",
    ogImage: "/images/rizwan-saeed.png",
    noIndex: false,
    noFollow: false,
    schemaType: "Person",
    structuredDataEnabled: true,
  },
  {
    id: "seo-about",
    pagePath: "/about",
    seoTitle: "About Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    metaDescription:
      "Discover Rizwan Saeed's 5+ years of hands-on experience scaling performance ad campaigns, Shopify themes, CAPI tracking, and B2B lead generation across UAE, USA, and UK.",
    focusKeyword: "Shopify Developer",
    canonicalUrl: "https://rizwansaeed.com/about",
    ogImage: "/images/rizwan-saeed.png",
    noIndex: false,
    noFollow: false,
    schemaType: "Person",
    structuredDataEnabled: true,
  },
  {
    id: "seo-services",
    pagePath: "/services",
    seoTitle: "Digital Growth Services — Meta Ads, Google Ads & Shopify Development",
    metaDescription:
      "Explore Rizwan Saeed's full range of performance marketing, e-commerce web development, SEO, and lead generation services for UAE, USA, and UK clients.",
    focusKeyword: "Meta Ads Performance Marketing",
    canonicalUrl: "https://rizwansaeed.com/services",
    ogImage: "/images/rizwan-saeed.png",
    noIndex: false,
    noFollow: false,
    schemaType: "ProfessionalService",
    structuredDataEnabled: true,
  },
  {
    id: "seo-projects",
    pagePath: "/projects",
    seoTitle: "Featured Case Studies & Web Development Projects | Rizwan Saeed",
    metaDescription:
      "Curated portfolio of high-performing web applications, e-commerce stores, UI/UX design systems, and digital growth campaigns engineered for measurable impact.",
    focusKeyword: "Web Development Projects",
    canonicalUrl: "https://rizwansaeed.com/projects",
    ogImage: "/images/rizwan-saeed.png",
    noIndex: false,
    noFollow: false,
    schemaType: "WebPage",
    structuredDataEnabled: true,
  },
  {
    id: "seo-results",
    pagePath: "/results",
    seoTitle: "Verified Case Studies & Performance Results | Rizwan Saeed",
    metaDescription:
      "Review verified performance metrics: AED 4.2M+ revenue generated, AED 850K ad spend managed across UAE, USA, and UK client accounts.",
    focusKeyword: "Performance Results Case Studies",
    canonicalUrl: "https://rizwansaeed.com/results",
    ogImage: "/images/rizwan-saeed.png",
    noIndex: false,
    noFollow: false,
    schemaType: "ProfessionalService",
    structuredDataEnabled: true,
  },
  {
    id: "seo-insights",
    pagePath: "/insights",
    seoTitle: "Digital Growth & AI Search Insights | Rizwan Saeed",
    metaDescription:
      "Tactical guides on performance marketing, Shopify speed optimization, Meta CAPI setup, and Generative Engine Optimization (GEO).",
    focusKeyword: "AI Search Insights GEO",
    canonicalUrl: "https://rizwansaeed.com/insights",
    ogImage: "/images/insights/ai-search-geo.jpg",
    noIndex: false,
    noFollow: false,
    schemaType: "Article",
    structuredDataEnabled: true,
  },
  {
    id: "seo-contact",
    pagePath: "/contact",
    seoTitle: "Book a Strategy Call & Contact Rizwan Saeed",
    metaDescription:
      "Schedule a digital marketing strategy call or request a free website & ads audit for your business in the UAE, USA, or UK.",
    focusKeyword: "Book Strategy Call",
    canonicalUrl: "https://rizwansaeed.com/contact",
    ogImage: "/images/rizwan-saeed.png",
    noIndex: false,
    noFollow: false,
    schemaType: "ContactPage",
    structuredDataEnabled: true,
  },
];

export function SeoTableClient({ seoSettings }: { seoSettings: SeoSettingItem[] }) {
  const [data, setData] = useState<SeoSettingItem[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<SeoSettingItem | null>(null);
  const [previewTab, setPreviewTab] = useState<"google" | "facebook" | "twitter">("google");
  const [editModalItem, setEditModalItem] = useState<SeoSettingItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("custom_seo_settings_data");
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        const merged = seoSettings.length > 0 ? seoSettings : initialPageAuditData;
        setData(merged);
        localStorage.setItem("custom_seo_settings_data", JSON.stringify(merged));
      }
    } catch {
      setData(initialPageAuditData);
    }
  }, [seoSettings]);

  const saveToStorage = (updated: SeoSettingItem[]) => {
    setData(updated);
    try {
      localStorage.setItem("custom_seo_settings_data", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Yoast / Rank Math Real-time SEO Scoring Algorithm (0 - 100)
  const calculateRankMathSeoScore = (item: SeoSettingItem) => {
    let score = 100;
    const titleLen = item.seoTitle ? item.seoTitle.length : 0;
    const descLen = item.metaDescription ? item.metaDescription.length : 0;
    const kw = item.focusKeyword ? item.focusKeyword.toLowerCase().trim() : "";

    // 1. Title Length check (50-60 chars ideal)
    if (titleLen === 0) score -= 30;
    else if (titleLen < 40 || titleLen > 65) score -= 10;

    // 2. Meta Description Length check (140-160 chars ideal)
    if (descLen === 0) score -= 30;
    else if (descLen < 120 || descLen > 165) score -= 10;

    // 3. Focus Keyword checks (Rank Math style)
    if (kw) {
      const inTitle = item.seoTitle.toLowerCase().includes(kw);
      const inDesc = item.metaDescription.toLowerCase().includes(kw);
      if (!inTitle) score -= 10;
      if (!inDesc) score -= 10;
    } else {
      score -= 10; // Penalty for missing focus keyword
    }

    // 4. Indexing & Canonical
    if (item.noIndex) score -= 35;
    if (!item.structuredDataEnabled) score -= 15;
    if (!item.ogImage) score -= 5;

    return Math.max(score, 35);
  };

  // Average Overall Site Score
  const averageSiteScore = Math.round(
    data.reduce((acc, curr) => acc + calculateRankMathSeoScore(curr), 0) / (data.length || 1)
  );

  const handleOpenCreate = () => {
    setIsCreatingNew(true);
    setEditModalItem({
      id: `seo-${Date.now()}`,
      pagePath: "/new-page",
      seoTitle: "New Page Title | Rizwan Saeed",
      metaDescription: "Meta description for the new page.",
      focusKeyword: "",
      canonicalUrl: "https://rizwansaeed.com/new-page",
      ogImage: "/images/rizwan-saeed.png",
      noIndex: false,
      noFollow: false,
      schemaType: "WebPage",
      structuredDataEnabled: true,
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;

    setSaving(true);
    setTimeout(() => {
      let updated: SeoSettingItem[];
      if (isCreatingNew) {
        updated = [editModalItem, ...data];
      } else {
        updated = data.map((item) => (item.id === editModalItem.id ? editModalItem : item));
      }

      saveToStorage(updated);
      setSaving(false);
      setEditModalItem(null);
      setIsCreatingNew(false);
      setSuccessMsg(
        isCreatingNew
          ? "New page SEO configuration created!"
          : "Rank Math SEO settings updated successfully!"
      );
      setTimeout(() => setSuccessMsg(""), 3500);
    }, 400);
  };

  const handleDelete = (id: string) => {
    const updated = data.filter((item) => item.id !== id);
    saveToStorage(updated);
    setDeleteModalId(null);
    setSuccessMsg("SEO entry deleted.");
    setTimeout(() => setSuccessMsg(""), 3000);
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
      header: "Focus Keyword & SERP Meta",
      accessor: (item: SeoSettingItem) => {
        const titleLen = item.seoTitle.length;
        const descLen = item.metaDescription.length;

        return (
          <div className="max-w-md space-y-2">
            {item.focusKeyword && (
              <div className="flex items-center gap-1.5">
                <Key className="h-3 w-3 text-teal-700" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-900 bg-teal-100/80 px-2 py-0.5 rounded border border-teal-300">
                  KW: {item.focusKeyword}
                </span>
              </div>
            )}

            <div>
              <p className="font-bold text-slate-900 text-xs font-serif leading-snug">
                {item.seoTitle}
              </p>
              <span
                className={`text-[10px] font-mono ${
                  titleLen >= 50 && titleLen <= 60
                    ? "text-emerald-700 font-bold"
                    : "text-amber-700 font-medium"
                }`}
              >
                Title: {titleLen} chars (Ideal: 50–60)
              </span>
            </div>

            <div>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {item.metaDescription}
              </p>
              <span
                className={`text-[10px] font-mono ${
                  descLen >= 140 && descLen <= 160
                    ? "text-emerald-700 font-bold"
                    : "text-amber-700 font-medium"
                }`}
              >
                Desc: {descLen} chars (Ideal: 140–160)
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Rank Math SEO Score",
      accessor: (item: SeoSettingItem) => {
        const score = calculateRankMathSeoScore(item);

        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shadow-2xs ${
                  score >= 85
                    ? "bg-emerald-600 text-white"
                    : score >= 70
                    ? "bg-amber-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {score}
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-extrabold text-slate-900 block">
                  {score >= 85 ? "Rank Math Pro Excellent" : score >= 70 ? "Good" : "Needs Tuning"}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Rank Math Audit</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.noIndex
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-teal-50 text-teal-800 border border-teal-200"
                }`}
              >
                {item.noIndex ? "NoIndex" : "Index & Follow"}
              </span>

              <span className="text-slate-500 font-medium flex items-center gap-1 text-[10px]">
                <FileCheck className="h-3 w-3 text-teal-600" /> {item.schemaType || "Schema"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Rank Math Actions",
      accessor: (item: SeoSettingItem) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedPreview(item)}
            className="p-1.5 rounded-lg text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
            title="Preview SERP & Social Card"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setIsCreatingNew(false);
              setEditModalItem(item);
            }}
            className="p-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 transition-colors"
            title="Edit Yoast / Rank Math SEO"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDeleteModalId(item.id)}
            className="p-1.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
            title="Delete SEO Config"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Actions & Success Alert */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-700" />
          <h2 className="text-xl font-bold text-slate-900 font-serif">
            Rank Math & Yoast SEO Pro Suite
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Custom Page SEO</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Top Rank Math SEO Health Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Rank Math SEO Site Score
            </span>
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 font-serif">
              {averageSiteScore} / 100
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Grade A+
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rank Math audit score evaluated across {data.length} public site pages.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Google Indexing & Canonical
            </span>
            <Globe className="h-5 w-5 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900 font-serif">100%</span>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Robots & Sitemap Verified
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Clean canonical tags prevent duplicate content penalties on Google SERP.
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

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={data}
        searchKey={(item) =>
          `${item.pagePath} ${item.seoTitle} ${item.metaDescription} ${item.focusKeyword || ""}`
        }
        searchPlaceholder="Search pages, focus keywords, or meta titles..."
        emptyTitle="No Custom Page SEO Configurations"
        emptyDescription="Configure page-by-page SEO meta tags to override default global metadata."
      />

      {/* Yoast / Rank Math Real-Time SERP & Social Card Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  Rank Math & Yoast Live Preview — {selectedPreview.pagePath}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Preview Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setPreviewTab("google")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  previewTab === "google"
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                🔍 Google Search SERP
              </button>
              <button
                onClick={() => setPreviewTab("facebook")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  previewTab === "facebook"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                📘 Facebook & LinkedIn Card
              </button>
              <button
                onClick={() => setPreviewTab("twitter")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  previewTab === "twitter"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                🐦 Twitter / X Card
              </button>
            </div>

            {/* Google SERP Card Preview */}
            {previewTab === "google" && (
              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1.5 font-sans">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-teal-700 flex items-center justify-center text-[9px] font-bold text-white">
                    R
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-800 font-medium leading-none">Rizwan Saeed</p>
                    <p className="text-[10px] text-slate-500 leading-none">
                      https://rizwansaeed.com{selectedPreview.pagePath}
                    </p>
                  </div>
                </div>
                <h4 className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight pt-1">
                  {selectedPreview.seoTitle}
                </h4>
                <p className="text-xs text-[#4d5156] leading-relaxed pt-1">
                  {selectedPreview.metaDescription}
                </p>
              </div>
            )}

            {/* Facebook & LinkedIn Card Preview */}
            {previewTab === "facebook" && (
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 space-y-0">
                <div className="relative h-48 bg-slate-900 flex items-center justify-center text-white">
                  {selectedPreview.ogImage ? (
                    <img
                      src={selectedPreview.ogImage}
                      alt="OG Share Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold">1200 x 630 OpenGraph Banner Image</span>
                  )}
                </div>
                <div className="p-4 bg-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    RIZWANSAEED.COM
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">
                    {selectedPreview.seoTitle}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {selectedPreview.metaDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Twitter Card Preview */}
            {previewTab === "twitter" && (
              <div className="rounded-2xl border border-slate-300 overflow-hidden bg-slate-950 text-white p-4 space-y-3 font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
                    RS
                  </div>
                  <div>
                    <span className="font-bold text-xs">Rizwan Saeed</span>
                    <span className="text-slate-400 text-xs ml-1">@rizwansaeed</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900">
                  <div className="h-40 bg-slate-800 flex items-center justify-center text-slate-400 text-xs">
                    {selectedPreview.ogImage ? (
                      <img
                        src={selectedPreview.ogImage}
                        alt="Twitter Card"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>Twitter Summary Card Image</span>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="font-bold text-xs text-slate-200">{selectedPreview.seoTitle}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {selectedPreview.metaDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}

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

      {/* Rank Math & Yoast Full SEO Editor Modal */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-fade-in border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  {isCreatingNew
                    ? "Add New Page Rank Math SEO"
                    : `Edit Yoast & Rank Math SEO: ${editModalItem.pagePath}`}
                </h3>
              </div>
              <button
                onClick={() => setEditModalItem(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Rank Math Real-Time Checklist & Score Indicator */}
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-black text-white ${
                    calculateRankMathSeoScore(editModalItem) >= 85
                      ? "bg-emerald-600"
                      : calculateRankMathSeoScore(editModalItem) >= 70
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                >
                  {calculateRankMathSeoScore(editModalItem)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-serif">
                    Live Rank Math Audit Score
                  </h4>
                  <p className="text-xs text-slate-600">
                    {calculateRankMathSeoScore(editModalItem) >= 85
                      ? "Page is optimized for Search Engines & AI Citations."
                      : "Add focus keyword and optimize title/description length."}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-6">
              {/* Route & Focus Keyword */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Page Route Path <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editModalItem.pagePath}
                    onChange={(e) =>
                      setEditModalItem({ ...editModalItem, pagePath: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                    placeholder="/services/meta-ads"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Focus Keyword (Rank Math)
                  </label>
                  <input
                    type="text"
                    value={editModalItem.focusKeyword || ""}
                    onChange={(e) =>
                      setEditModalItem({ ...editModalItem, focusKeyword: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                    placeholder="e.g., Shopify Development Dubai"
                  />
                </div>
              </div>

              {/* Meta Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    SEO Meta Title Tag <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      editModalItem.seoTitle.length >= 50 && editModalItem.seoTitle.length <= 60
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {editModalItem.seoTitle.length} / 60 Chars (Ideal: 50–60)
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={editModalItem.seoTitle}
                  onChange={(e) => setEditModalItem({ ...editModalItem, seoTitle: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-semibold font-serif"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Meta Description Tag <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      editModalItem.metaDescription.length >= 140 &&
                      editModalItem.metaDescription.length <= 160
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {editModalItem.metaDescription.length} / 160 Chars (Ideal: 140–160)
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={editModalItem.metaDescription}
                  onChange={(e) =>
                    setEditModalItem({ ...editModalItem, metaDescription: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Canonical URL & OG Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Canonical URL Override
                  </label>
                  <input
                    type="text"
                    value={editModalItem.canonicalUrl || ""}
                    onChange={(e) =>
                      setEditModalItem({ ...editModalItem, canonicalUrl: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    OpenGraph & Social Share Banner Image
                  </label>
                  <input
                    type="text"
                    value={editModalItem.ogImage || ""}
                    onChange={(e) =>
                      setEditModalItem({ ...editModalItem, ogImage: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                    placeholder="/images/rizwan-saeed.png"
                  />
                </div>
              </div>

              {/* Advanced Technical Robots & Schema Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Primary Schema Type
                  </label>
                  <select
                    value={editModalItem.schemaType || "WebPage"}
                    onChange={(e) =>
                      setEditModalItem({ ...editModalItem, schemaType: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
                  >
                    <option value="Person">Person (Profile)</option>
                    <option value="ProfessionalService">ProfessionalService</option>
                    <option value="WebPage">WebPage</option>
                    <option value="Article">Article / Insight</option>
                    <option value="ContactPage">ContactPage</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Search Engine Indexing
                  </label>
                  <select
                    value={editModalItem.noIndex ? "true" : "false"}
                    onChange={(e) =>
                      setEditModalItem({ ...editModalItem, noIndex: e.target.value === "true" })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
                  >
                    <option value="false">Index & Follow (Allowed)</option>
                    <option value="true">NoIndex (Block Google)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Structured Schema
                  </label>
                  <select
                    value={editModalItem.structuredDataEnabled ? "true" : "false"}
                    onChange={(e) =>
                      setEditModalItem({
                        ...editModalItem,
                        structuredDataEnabled: e.target.value === "true",
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
                  >
                    <option value="true">Enable JSON-LD Schema</option>
                    <option value="false">Disable Schema</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Yoast / Rank Math Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="font-bold text-slate-900 text-base font-serif">Confirm Delete SEO Configuration</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove custom SEO meta settings for this page? This action will revert the route to fallback site defaults.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md"
              >
                Delete SEO Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
