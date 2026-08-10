"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { Save, CheckCircle2, BarChart, Loader2 } from "lucide-react";

export default function AnalyticsSettingsPage() {
  const [analyticsState, setAnalyticsState] = useState({
    ga4Id: "G-XXXXXXXXXX",
    gtmId: "GTM-XXXXXXX",
    metaPixelId: "1234567890",
    linkedInTagId: "123456",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics & Conversion Tracking Settings"
        subtitle="Manage measurement IDs for Google Analytics 4, Tag Manager, Meta Pixel, and LinkedIn Insight Tag."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span>Analytics settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <BarChart className="h-5 w-5 text-teal-700" />
          <h2 className="font-bold text-slate-900 text-base font-serif">Integration Keys</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Google Analytics 4 (GA4) Measurement ID
            </label>
            <input
              type="text"
              value={analyticsState.ga4Id}
              onChange={(e) => setAnalyticsState({ ...analyticsState, ga4Id: e.target.value })}
              placeholder="G-XXXXXXXXXX"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Google Tag Manager (GTM) Container ID
            </label>
            <input
              type="text"
              value={analyticsState.gtmId}
              onChange={(e) => setAnalyticsState({ ...analyticsState, gtmId: e.target.value })}
              placeholder="GTM-XXXXXXX"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Meta Pixel ID (Facebook & Instagram)
            </label>
            <input
              type="text"
              value={analyticsState.metaPixelId}
              onChange={(e) => setAnalyticsState({ ...analyticsState, metaPixelId: e.target.value })}
              placeholder="1234567890"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              LinkedIn Insight Tag Partner ID
            </label>
            <input
              type="text"
              value={analyticsState.linkedInTagId}
              onChange={(e) => setAnalyticsState({ ...analyticsState, linkedInTagId: e.target.value })}
              placeholder="123456"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 shadow-md"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving Keys...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Analytics Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
