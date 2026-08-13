"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { initialMockPages } from "@/lib/seo/storage";
import { SeoPageAudit } from "@/lib/seo/types";
import { FileText, Eye, CheckCircle2, AlertTriangle, ExternalLink, Globe, Search } from "lucide-react";

export default function AdminSeoPagesExplorerPage() {
  const [pages, setPages] = useState<SeoPageAudit[]>(initialMockPages);
  const [selectedPage, setSelectedPage] = useState<SeoPageAudit | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Pages SEO Explorer"
        subtitle="Detailed audit breakdown for every public route, including individual SEO scores, indexability, headings, word counts, and schema types."
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Route Path</th>
                <th className="p-4">SEO Health Score</th>
                <th className="p-4">Indexability</th>
                <th className="p-4">Meta Title & Description</th>
                <th className="p-4">Word Count</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 inline-block">
                      {page.url.replace("https://rizwansaeed.com", "") || "/"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white ${
                          page.seoScore >= 90
                            ? "bg-emerald-600"
                            : page.seoScore >= 80
                            ? "bg-teal-700"
                            : "bg-amber-500"
                        }`}
                      >
                        {page.seoScore}
                      </div>
                      <span className="font-bold text-slate-900">{page.seoScore}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        page.indexabilityStatus === "INDEXABLE"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {page.indexabilityStatus}
                    </span>
                  </td>
                  <td className="p-4 max-w-sm space-y-1">
                    <p className="font-bold text-slate-900 text-xs font-serif truncate">
                      {page.title}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{page.metaDescription}</p>
                  </td>
                  <td className="p-4 font-mono text-xs font-bold">{page.wordCount} words</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedPage(page)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold rounded-lg border border-teal-200 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Page Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page Audit Drawer Modal */}
      {selectedPage && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  Page Audit Checklist — {selectedPage.url}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPage(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900">HTTPS Protocol</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900">HTTP Status 200 OK</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900">Canonical Self-Reference</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900">Search Engine Indexable</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900">Single H1 Heading Tag</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-900">JSON-LD Schema Present</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPage(null)}
                className="px-5 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Close Audit Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
