"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ExternalLink,
  Edit,
  Globe,
  Loader2,
  CheckCircle,
  FileCode,
} from "lucide-react";

interface LegalPageItem {
  id: string;
  slug: string;
  title: string;
  badgeText: string;
  lastUpdated: string;
  updatedAt: string;
}

export default function AdminLegalOverviewPage() {
  const [pages, setPages] = useState<LegalPageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/legal");
      const json = await res.json();
      if (json.success && json.pages) {
        setPages(json.pages);
      }
    } catch (err) {
      console.error("Failed to load legal pages", err);
    } finally {
      setLoading(false);
    }
  };

  const defaultPages = [
    {
      slug: "privacy",
      title: "Privacy Policy",
      badgeText: "Legal Document",
      lastUpdated: "August 8, 2026",
      liveUrl: "/privacy",
      description: "Explains how user data, project inquiries, cookies, and privacy are handled.",
    },
    {
      slug: "terms",
      title: "Terms of Service",
      badgeText: "Legal Document",
      lastUpdated: "August 8, 2026",
      liveUrl: "/terms",
      description: "Governs website usage, intellectual property, performance disclaimers, and engagements.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Compliance & Legal Management</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">
            Compliance & Legal Pages
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage Privacy Policy, Terms of Service, and compliance disclosures shown on your website.
          </p>
        </div>

        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 shadow-2xs transition-colors"
        >
          <FileCode className="h-4 w-4 text-teal-700" />
          <span>View XML Sitemap</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </a>
      </div>

      {/* Legal Pages Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="h-6 w-6 text-teal-700 animate-spin mr-3" />
          <span className="text-sm font-semibold text-slate-600">Loading legal documents...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defaultPages.map((def) => {
            const dbRecord = pages.find((p) => p.slug === def.slug);
            const title = dbRecord?.title || def.title;
            const lastUpdated = dbRecord?.lastUpdated || def.lastUpdated;
            const badgeText = dbRecord?.badgeText || def.badgeText;

            return (
              <div
                key={def.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold uppercase tracking-wider border border-teal-200">
                      {badgeText}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-emerald-500" /> Live Status: Published
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-serif">{title}</h2>
                    <p className="text-xs text-slate-500 mt-1">{def.description}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-500">Last Updated:</span>
                    <span className="font-bold text-slate-900">{lastUpdated}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    href={`/admin/legal/${def.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit Page Content</span>
                  </Link>

                  <a
                    href={def.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Preview Live Page"
                  >
                    <Globe className="h-3.5 w-3.5 text-slate-600" />
                    <span>View Live</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Additional Compliance Info Box */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          <span>XML Sitemap & Dynamic Compliance Info</span>
        </div>
        <h3 className="text-base font-bold font-serif">
          Automatic SEO & Legal Compliance Engine
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          All edits made here immediately update live website routes (<code className="text-amber-300 font-mono">/privacy</code>, <code className="text-amber-300 font-mono">/terms</code>) and automatically sync with your dynamically generated <code className="text-amber-300 font-mono">/sitemap.xml</code>.
        </p>
      </div>
    </div>
  );
}
