"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Settings, Save, CheckCircle2, ShieldCheck, Sparkles, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSeoSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    domain: "https://rizwansaddique.site",
    sitemapUrl: "https://rizwansaddique.site/sitemap.xml",
    crawlerConcurrency: 3,
    requestTimeoutMs: 10000,
    maxPagesPerRun: 500,
    autoScanFrequency: "WEEKLY",
    aiEnabled: true,
    excludedPathPrefixes: "/admin, /api, /login, /logout",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    }, 500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="SEO Command Center Settings"
        subtitle="Configure internal crawler concurrency, SSRF protection boundaries, automated scan frequencies, and AI SEO integration."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>SEO Command Center settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Domain & Sitemap Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="h-5 w-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-base font-serif">Domain & Sitemap Settings</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="block font-bold uppercase tracking-wider text-slate-700">Target Website Domain</label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold uppercase tracking-wider text-slate-700">Primary Sitemap URL</label>
              <input
                type="text"
                value={formData.sitemapUrl}
                onChange={(e) => setFormData({ ...formData, sitemapUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Crawler & SSRF Boundaries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Lock className="h-5 w-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-base font-serif">Crawler Rate Limiting & SSRF Boundaries</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="block font-bold uppercase tracking-wider text-slate-700">Concurrent Requests</label>
              <input
                type="number"
                value={formData.crawlerConcurrency}
                onChange={(e) => setFormData({ ...formData, crawlerConcurrency: parseInt(e.target.value) || 3 })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold uppercase tracking-wider text-slate-700">Request Timeout (ms)</label>
              <input
                type="number"
                value={formData.requestTimeoutMs}
                onChange={(e) => setFormData({ ...formData, requestTimeoutMs: parseInt(e.target.value) || 10000 })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold uppercase tracking-wider text-slate-700">Auto Scan Frequency</label>
              <select
                value={formData.autoScanFrequency}
                onChange={(e) => setFormData({ ...formData, autoScanFrequency: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
              >
                <option value="MANUAL">Manual Trigger Only</option>
                <option value="DAILY">Daily Automatic Audit</option>
                <option value="WEEKLY">Weekly Automatic Audit</option>
                <option value="MONTHLY">Monthly Automatic Audit</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block font-bold uppercase tracking-wider text-slate-700">Excluded Path Prefixes</label>
            <input
              type="text"
              value={formData.excludedPathPrefixes}
              onChange={(e) => setFormData({ ...formData, excludedPathPrefixes: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Command Center Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
