"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { initialMockIssues } from "@/lib/seo/storage";
import { SeoIssueItem, IssueSeverity } from "@/lib/seo/types";
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink,
  Filter,
  Eye,
  Check,
} from "lucide-react";

export default function AdminSeoIssuesPage() {
  const [issues, setIssues] = useState<SeoIssueItem[]>(initialMockIssues);
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");
  const [selectedIssue, setSelectedIssue] = useState<SeoIssueItem | null>(null);

  const filteredIssues = issues.filter((item) => {
    if (filterSeverity !== "ALL" && item.severity !== filterSeverity) return false;
    return true;
  });

  const getSeverityBadge = (severity: IssueSeverity) => {
    switch (severity) {
      case "CRITICAL":
        return <span className="bg-red-100 text-red-800 border border-red-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">P1 Critical</span>;
      case "HIGH":
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">P2 High</span>;
      case "MEDIUM":
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">P3 Medium</span>;
      case "LOW":
        return <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">P4 Low</span>;
    }
  };

  const handleResolveIssue = (id: string) => {
    setIssues(issues.map((i) => (i.id === id ? { ...i, status: "RESOLVED" } : i)));
    if (selectedIssue?.id === id) {
      setSelectedIssue({ ...selectedIssue, status: "RESOLVED" });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="SEO Issues Central Hub"
        subtitle="Review prioritized SEO issues, plain-language explanations, SEO impact analysis, and actionable resolution steps."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Filter by Severity:
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterSeverity === sev
                    ? "bg-teal-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-bold text-slate-500 font-mono">
          Showing {filteredIssues.length} Issues
        </span>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Priority & Severity</th>
                <th className="p-4">Issue Name & Category</th>
                <th className="p-4">Affected Pages</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">{getSeverityBadge(issue.severity)}</td>
                  <td className="p-4 space-y-1">
                    <p className="font-bold text-slate-900 text-xs font-serif">{issue.name}</p>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {issue.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                      {issue.affectedUrls.length} Page(s)
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        issue.status === "RESOLVED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold rounded-lg border border-teal-200 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Fix Guide
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Issue Explanation Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  {selectedIssue.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Severity Header */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    Category: {selectedIssue.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(selectedIssue.severity)}
                    <span className="font-mono text-slate-600">ID: {selectedIssue.issueCode}</span>
                  </div>
                </div>

                {selectedIssue.status !== "RESOLVED" && (
                  <button
                    onClick={() => handleResolveIssue(selectedIssue.id)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4" />
                    Mark as Resolved
                  </button>
                )}
              </div>

              {/* Plain Explanation */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                <span className="font-bold text-blue-900 block text-xs font-serif">
                  What is wrong?
                </span>
                <p className="text-blue-800 leading-relaxed">{selectedIssue.explanation}</p>
              </div>

              {/* Why it Matters */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block text-xs font-serif">
                  Why does it matter?
                </span>
                <p className="text-amber-800 leading-relaxed">{selectedIssue.whyItMatters}</p>
              </div>

              {/* How to Fix */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 block text-xs font-serif">
                  How to fix it?
                </span>
                <p className="text-emerald-800 leading-relaxed">{selectedIssue.howToFix}</p>
              </div>

              {/* Affected URLs */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
                  Affected URLs ({selectedIssue.affectedUrls.length})
                </span>
                <div className="space-y-1 font-mono text-xs">
                  {selectedIssue.affectedUrls.map((url) => (
                    <div
                      key={url}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <span className="text-teal-800 font-bold">{url}</span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-teal-700 flex items-center gap-1 text-[11px]"
                      >
                        <ExternalLink className="h-3 w-3" /> Visit Route
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedIssue(null)}
                className="px-5 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Close Issue Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
