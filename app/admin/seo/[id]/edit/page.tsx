"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminEditSeoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    pagePath: "/",
    seoTitle: "",
    metaDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogImage: "",
    noIndex: false,
    schemaType: "Person",
    structuredDataEnabled: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("custom_seo_settings_data");
      if (stored) {
        const list = JSON.parse(stored);
        const matched = list.find((item: any) => item.id === id || id.includes(item.id));
        if (matched) {
          setFormData({
            pagePath: matched.pagePath,
            seoTitle: matched.seoTitle,
            metaDescription: matched.metaDescription,
            focusKeyword: matched.focusKeyword || "",
            canonicalUrl: matched.canonicalUrl || `https://rizwansaeed.com${matched.pagePath}`,
            ogImage: matched.ogImage || "/images/rizwan-saeed.png",
            noIndex: matched.noIndex || false,
            schemaType: matched.schemaType || "Person",
            structuredDataEnabled: matched.structuredDataEnabled !== false,
          });
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }, [id]);

  const calculateScore = () => {
    let score = 100;
    if (formData.seoTitle.length < 50 || formData.seoTitle.length > 60) score -= 10;
    if (formData.metaDescription.length < 140 || formData.metaDescription.length > 160) score -= 10;
    if (!formData.focusKeyword) score -= 10;
    if (formData.noIndex) score -= 40;
    return Math.max(score, 40);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const stored = localStorage.getItem("custom_seo_settings_data");
      const list = stored ? JSON.parse(stored) : [];
      const updatedList = list.map((item: any) =>
        item.id === id ? { ...item, ...formData } : item
      );

      localStorage.setItem("custom_seo_settings_data", JSON.stringify(updatedList));

      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/seo");
        router.refresh();
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/seo"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to SEO Manager</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">
            Edit Page SEO: {formData.pagePath}
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Config ID: <code className="font-semibold text-teal-700">{id}</code>
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>SEO settings updated successfully! Redirecting...</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="h-6 w-6 text-teal-700 animate-spin mr-3" />
          <span className="text-sm font-semibold text-slate-600">Loading SEO editor...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Rank Math Audit Score Box */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white ${
                  calculateScore() >= 85
                    ? "bg-emerald-600"
                    : calculateScore() >= 70
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              >
                {calculateScore()}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Rank Math Pro Optimization Score
                </h3>
                <p className="text-xs text-slate-500">
                  {calculateScore() >= 85
                    ? "High ranking potential for Google SERP."
                    : "Ensure title length is 50-60 chars and focus keyword is added."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Page Route Path <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.pagePath}
                  onChange={(e) => setFormData({ ...formData, pagePath: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Focus Keyword (Rank Math)
                </label>
                <input
                  type="text"
                  value={formData.focusKeyword}
                  onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  SEO Title Tag <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    formData.seoTitle.length >= 50 && formData.seoTitle.length <= 60
                      ? "text-emerald-700"
                      : "text-amber-700"
                  }`}
                >
                  {formData.seoTitle.length} / 60 Chars
                </span>
              </div>
              <input
                type="text"
                required
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-semibold font-serif"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Description <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    formData.metaDescription.length >= 140 && formData.metaDescription.length <= 160
                      ? "text-emerald-700"
                      : "text-amber-700"
                  }`}
                >
                  {formData.metaDescription.length} / 160 Chars
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  OpenGraph Share Image
                </label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Link
              href="/admin/seo"
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Link>
            <Button type="submit" variant="primary" size="lg" isLoading={saving}>
              <Save className="h-4 w-4 mr-2" />
              Save SEO Changes
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
