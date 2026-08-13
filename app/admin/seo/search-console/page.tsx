"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { initialSearchConsoleMetrics } from "@/lib/seo/storage";
import { BarChart, TrendingUp, Globe, ExternalLink, Calendar, Search } from "lucide-react";

export default function AdminSeoSearchConsolePage() {
  const [metrics, setMetrics] = useState(initialSearchConsoleMetrics);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Google Search Console Integration"
        subtitle="Track real-time organic clicks, search impressions, click-through rates (CTR), average SERP positions, and top performing search queries."
      />

      {/* Source Attribution Label */}
      <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-center justify-between text-xs font-semibold text-blue-900">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-blue-700" />
          <span>Data Source: Google Search Console API (28 Days Performance Window)</span>
        </div>
        <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-blue-300">
          Source: Google Search Console
        </span>
      </div>

      {/* Metric Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Organic Clicks
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">1,145</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            +14.2% vs previous period
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Search Impressions
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">14,850</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            +18.6% vs previous period
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Average CTR
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">7.71%</div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
            +0.4% CTR improvement
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Average SERP Position
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">2.8</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            Page 1 Google Ranking
          </span>
        </div>
      </div>

      {/* Top Performing Queries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm font-serif">Top Performing Organic Search Queries</h3>
          <span className="text-xs text-slate-500 font-mono">Last 28 Days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Search Keyword</th>
                <th className="p-4">Landing Page</th>
                <th className="p-4">Clicks</th>
                <th className="p-4">Impressions</th>
                <th className="p-4">CTR</th>
                <th className="p-4">Avg Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {metrics.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900 font-serif">{item.query}</td>
                  <td className="p-4 font-mono text-teal-800">{item.page}</td>
                  <td className="p-4 font-bold text-slate-900">{item.clicks}</td>
                  <td className="p-4 text-slate-600">{item.impressions}</td>
                  <td className="p-4 font-bold text-emerald-700">{item.ctr}%</td>
                  <td className="p-4 font-mono text-teal-800 font-bold">#{item.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
