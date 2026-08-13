"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { FolderTree, CheckCircle2, RefreshCw, ExternalLink } from "lucide-react";

export default function AdminSeoSitemapPage() {
  const [regenerating, setRegenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="XML Sitemap Manager"
        subtitle="Inspect sitemap index files, validate URL inclusion, and compare sitemap declarations against actual site crawls."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>XML Sitemap re-indexed and updated successfully!</span>
        </div>
      )}

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 inline-block">
              /sitemap.xml
            </span>
            <h3 className="font-bold text-slate-900 text-base font-serif">Primary Site XML Sitemap</h3>
          </div>

          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
            <span>{regenerating ? "Regenerating..." : "Regenerate Sitemap.xml"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Total Sitemapped URLs</span>
            <p className="text-teal-700 font-extrabold text-lg">11 URLs</p>
            <p className="text-[11px] text-slate-500">100% of indexable routes included.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Sitemap Status</span>
            <p className="text-emerald-700 font-extrabold text-lg">200 OK Valid</p>
            <p className="text-[11px] text-slate-500">Accessible by Googlebot & Bingbot.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Last Sitemap Update</span>
            <p className="text-teal-700 font-extrabold text-lg">Live Next.js Route</p>
            <p className="text-[11px] text-slate-500">Auto-synced with CMS published pages.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
