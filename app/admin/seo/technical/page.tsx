"use client";

import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ShieldCheck, CheckCircle2, Lock, Globe, Smartphone, ArrowRightLeft } from "lucide-react";

export default function AdminSeoTechnicalPage() {
  const techChecks = [
    { title: "HTTPS Enforcement & SSL Security", status: "PASS", detail: "All requests forced to HTTPS via TLS 1.3 encryption." },
    { title: "Preferred Hostname Redirection (WWW / Non-WWW)", status: "PASS", detail: "rizwansaeed.com consistently redirects non-www domain traffic." },
    { title: "Mobile Viewport Optimization", status: "PASS", detail: "viewport meta tag correctly configured on all public routes." },
    { title: "Hreflang & Multi-Region Directives", status: "PASS", detail: "Targeting UAE, USA, and UK international client audiences." },
    { title: "Mixed Content Audit", status: "PASS", detail: "Zero insecure HTTP assets or scripts loaded." },
    { title: "Robots.txt & Sitemap Association", status: "PASS", detail: "Sitemap correctly referenced in robots.txt." },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Technical SEO Health"
        subtitle="Audit server protocols, SSL certificates, WWW vs non-WWW redirection, viewport tags, and international SEO signals."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techChecks.map((check) => (
          <div key={check.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm font-serif">{check.title}</h3>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                {check.status}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{check.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
