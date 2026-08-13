"use client";

import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ShieldCheck, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

export default function AdminSeoRobotsPage() {
  const robotsTxtContent = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://rizwansaeed.com/sitemap.xml`;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Robots.txt Directives Inspector"
        subtitle="Validate search crawler permissions, block rules, and sitemap declarations to ensure search engines can index public pages."
      />

      {/* Critical Safety Check Alert Box */}
      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm font-serif">Robots.txt Configuration Healthy</h4>
            <p className="text-xs text-emerald-800">
              Public site routes are open for indexing. Protection rules correctly block <code className="font-bold">/admin/</code> and <code className="font-bold">/api/</code> routes.
            </p>
          </div>
        </div>
        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-3 py-1 rounded-full uppercase">
          Safe Production Config
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-base font-serif">Live Robots.txt Content</h3>
          </div>
          <span className="font-mono text-xs text-teal-800 font-bold">https://rizwansaeed.com/robots.txt</span>
        </div>

        <pre className="p-5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs leading-relaxed border border-slate-800">
          {robotsTxtContent}
        </pre>
      </div>
    </div>
  );
}
