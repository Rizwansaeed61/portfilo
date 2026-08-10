"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  ShieldCheck,
  Eye,
} from "lucide-react";

interface Section {
  title: string;
  content: string;
}

export default function AdminLegalEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState(slug === "privacy" ? "Privacy Policy" : "Terms of Service");
  const [badgeText, setBadgeText] = useState("Legal Document");
  const [lastUpdated, setLastUpdated] = useState("August 8, 2026");
  const [noticeText, setNoticeText] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  useEffect(() => {
    fetchPageData();
  }, [slug]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/legal/${slug}`);
      const json = await res.json();

      if (json.success && json.page) {
        const page = json.page;
        setTitle(page.title || (slug === "privacy" ? "Privacy Policy" : "Terms of Service"));
        setBadgeText(page.badgeText || "Legal Document");
        setLastUpdated(page.lastUpdated || "August 8, 2026");
        setNoticeText(page.noticeText || "");
        setSeoTitle(page.seoTitle || "");
        setSeoDescription(page.seoDescription || "");

        if (page.sectionsJson) {
          try {
            setSections(JSON.parse(page.sectionsJson));
          } catch {
            setSections([]);
          }
        }
      }
    } catch (err) {
      console.error("Error loading legal page", err);
      setErrorMsg("Failed to load page data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = () => {
    const sectionNumber = sections.length + 1;
    setSections([
      ...sections,
      {
        title: `${sectionNumber}. New Section Title`,
        content: "Enter detailed clause or section text here...",
      },
    ]);
  };

  const handleUpdateSection = (index: number, field: "title" | "content", value: string) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleRemoveSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/admin/legal/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          badgeText,
          lastUpdated,
          noticeText,
          sections,
          seoTitle,
          seoDescription,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Failed to update legal document.");
      } else {
        setSuccessMsg("Legal document updated successfully! Live page updated.");
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error("Save error", err);
      setErrorMsg("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/legal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Compliance Overview</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-serif capitalize">
            Edit {title}
          </h1>
          <p className="text-xs text-slate-500">
            Live URL: <code className="font-mono text-teal-700 font-semibold">/{slug}</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Eye className="h-4 w-4 text-slate-500" />
            <span>Preview Live Page</span>
          </a>

          <button
            onClick={handleSubmit}
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
      </div>

      {/* Feedback messages */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="h-6 w-6 text-teal-700 animate-spin mr-3" />
          <span className="text-sm font-semibold text-slate-600">Loading document content...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Document Settings Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <FileText className="h-4 w-4 text-teal-700" />
              <h2 className="text-base font-bold text-slate-900 font-serif">
                Document Header Settings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Badge Tag
                </label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. Legal Document"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Last Updated Date
                </label>
                <input
                  type="text"
                  value={lastUpdated}
                  onChange={(e) => setLastUpdated(e.target.value)}
                  placeholder="e.g. August 8, 2026"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Notice Box Text (Optional Warning/Information Banner)
                </label>
                <textarea
                  rows={2}
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  placeholder="Notice text displayed at top of the policy page..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>
          </div>

          {/* Sections Editor Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
                <h2 className="text-base font-bold text-slate-900 font-serif">
                  Document Content & Clauses ({sections.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-50 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold hover:bg-teal-100 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add New Clause / Section</span>
              </button>
            </div>

            {sections.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-xs text-slate-500 mb-3">No sections added yet.</p>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add First Clause</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-md">
                        Clause #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(idx)}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Clause Title / Heading
                      </label>
                      <input
                        type="text"
                        required
                        value={section.title}
                        onChange={(e) => handleUpdateSection(idx, "title", e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 font-semibold focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Clause Description / Legal Details
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={section.content}
                        onChange={(e) => handleUpdateSection(idx, "content", e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 leading-relaxed focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEO Meta Tags Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 font-serif">
                SEO Meta Tags & Indexing
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize search engine titles and meta descriptions for search crawlers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={`e.g. ${title} | Rizwan Saeed`}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={`Short meta summary for search engines...`}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Link
              href="/admin/legal"
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Document...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Legal Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
