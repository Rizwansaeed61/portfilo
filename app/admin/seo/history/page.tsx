"use client";

import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { initialMockScans } from "@/lib/seo/storage";
import { History, TrendingUp, ShieldCheck } from "lucide-react";

export default function AdminSeoHistoryPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Audit History & Progress Trends"
        subtitle="Review historical site audits, compare SEO score progression over time, and verify issue resolution trends."
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm font-serif">Historical Audit Crawl Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Scan Date & Time</th>
                <th className="p-4">Audit Type</th>
                <th className="p-4">SEO Health Score</th>
                <th className="p-4">Pages Crawled</th>
                <th className="p-4">Critical Issues</th>
                <th className="p-4">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {initialMockScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900">
                    {new Date(scan.startedAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {scan.scanType} AUDIT
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-700 font-serif text-sm">{scan.seoScore} / 100</td>
                  <td className="p-4 font-mono">{scan.pagesScanned} pages</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {scan.criticalIssuesCount} Critical
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-500">{scan.durationSeconds}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
