"use client";

import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { initialMockPages } from "@/lib/seo/storage";
import { FolderTree, Link2, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function AdminSeoInternalLinksPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Internal Links & Orphan Page Detector"
        subtitle="Analyze inbound and outbound internal link architecture, click depth from homepage, anchor text distribution, and orphan page risks."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Orphan Pages Detected</span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">0</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            100% Linked Internal Architecture
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Click Depth</span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">2 Clicks</div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
            Optimal Search Accessibility
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Internal Links</span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">142</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            High Internal PageRank Flow
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Page Path</th>
                <th className="p-4">Inbound Internal Links</th>
                <th className="p-4">Outbound Internal Links</th>
                <th className="p-4">Click Depth</th>
                <th className="p-4">Orphan Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {initialMockPages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-teal-800">{page.url.replace("https://rizwansaeed.com", "") || "/"}</td>
                  <td className="p-4 font-bold text-slate-900">{page.internalInboundLinks} links</td>
                  <td className="p-4 text-slate-600">{page.internalOutboundLinks} links</td>
                  <td className="p-4 font-mono text-teal-800 font-bold">Depth {page.clickDepth}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Healthy Link Flow
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
