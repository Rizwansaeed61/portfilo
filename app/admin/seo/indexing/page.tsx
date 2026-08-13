"use client";

import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { initialMockPages } from "@/lib/seo/storage";
import { Globe, CheckCircle2, ShieldAlert, Tag, ExternalLink } from "lucide-react";

export default function AdminSeoIndexingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Indexing & Coverage Dashboard"
        subtitle="Merge internal crawl indexability checks with Google Search Console coverage data to ensure all major landing pages are indexed."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Indexable Pages
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">11 / 11</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            100% Index Coverage
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Excluded / Noindex Pages
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">0</div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
            Clean Index Directives
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Canonical Alignment
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">100%</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            Self-Referencing Verified
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">URL Route</th>
                <th className="p-4">Internal Crawl Status</th>
                <th className="p-4">Google Index Status</th>
                <th className="p-4">Canonical URL</th>
                <th className="p-4">Indexability Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {initialMockPages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-teal-800">{page.url.replace("https://rizwansaeed.com", "") || "/"}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Indexable
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Indexed on Google
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-500 truncate max-w-xs">{page.canonicalUrl}</td>
                  <td className="p-4 text-slate-600">{page.indexabilityReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
