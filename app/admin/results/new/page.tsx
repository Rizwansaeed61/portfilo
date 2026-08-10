"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save, ArrowLeft, TrendingUp, ShieldCheck } from "lucide-react";

export default function AdminNewResultPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    metric: "AED 4.2M+",
    title: "Client E-commerce Revenue",
    subtitle: "Generated for UAE retail brand across 12 months",
    category: "REVENUE",
    displayOrder: 1,
    status: "PUBLISHED",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.metric.trim() || !formData.title.trim()) return;

    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/results");
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/results"
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          title="Add Verified Performance Metric"
          subtitle="Add verified metrics and client proof highlights to display across trust metrics bars."
        />
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-amber-700 flex-shrink-0" />
        <span>Verification Notice: Ensure all added metrics align strictly with real verified client performance data.</span>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Metric result added successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <TrendingUp className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Metric Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Metric Value / Stat Highlight <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AED 4.2M+ or 4.8x ROAS"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-serif font-extrabold text-teal-700 text-base focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Metric Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-medium"
              >
                <option value="REVENUE">REVENUE (Generated Revenue)</option>
                <option value="AD_SPEND">AD_SPEND (Managed Spend)</option>
                <option value="EXPERIENCE">EXPERIENCE (Years / Markets)</option>
                <option value="CONVERSION">CONVERSION (ROAS / Leads)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Metric Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Total Client Revenue Generated"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Subtitle / Description
              </label>
              <input
                type="text"
                placeholder="e.g. Generated across UAE, USA and UK client brands"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })
                }
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
              >
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Link
            href="/admin/results"
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </Link>
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Metric Result
          </Button>
        </div>
      </form>
    </div>
  );
}
