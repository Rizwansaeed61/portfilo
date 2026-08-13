"use client";

import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { TrendingUp, Key, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

export default function AdminSeoKeywordsPage() {
  const keywordGroups = [
    { rankRange: "Positions 1 – 3", count: 8, label: "Top 3 Gold Rankings", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { rankRange: "Positions 4 – 10", count: 14, label: "Page 1 First Fold", color: "bg-teal-100 text-teal-800 border-teal-300" },
    { rankRange: "Positions 11 – 20", count: 9, label: "Page 2 Opportunities", color: "bg-amber-100 text-amber-800 border-amber-300" },
    { rankRange: "Positions 21 – 50", count: 12, label: "Growing Terms", color: "bg-slate-100 text-slate-700 border-slate-300" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Keyword Rankings & Opportunities"
        subtitle="Track target search queries, position movements, top 3 rankings, and high-impression page-2 optimization opportunities."
      />

      {/* Keyword Distribution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {keywordGroups.map((group) => (
          <div key={group.rankRange} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              {group.rankRange}
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-serif">{group.count} Keywords</div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border inline-block ${group.color}`}>
              {group.label}
            </span>
          </div>
        ))}
      </div>

      {/* Optimization Opportunities Box */}
      <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-700" />
          <h3 className="font-bold text-slate-900 text-base font-serif">
            High-Impression Keyword Opportunities (Page 2 to Page 1)
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          These target keywords receive significant impressions but sit on positions 4–15. Tweaking titles, headings, and internal links can quickly push them to top-3 placements.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-1">
            <span className="font-bold text-slate-900 block">"performance marketing manager uae"</span>
            <p className="text-emerald-700 font-bold">Position #4.1 · 2,900 Impressions · CTR 7.2%</p>
            <p className="text-[11px] text-slate-500">Action: Add query to H2 heading on /services/meta-ads.</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-1">
            <span className="font-bold text-slate-900 block">"shopify cro developer"</span>
            <p className="text-emerald-700 font-bold">Position #6.2 · 1,850 Impressions · CTR 8.6%</p>
            <p className="text-[11px] text-slate-500">Action: Update meta description to highlight CRO results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
