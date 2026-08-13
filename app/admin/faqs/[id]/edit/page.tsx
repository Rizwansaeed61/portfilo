"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { faqsData } from "@/content/faqs";
import {
  CheckCircle2,
  Save,
  ArrowLeft,
  HelpCircle,
  Code,
  Loader2,
} from "lucide-react";

export default function AdminEditFAQPage({
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
    question: "",
    answer: "",
    category: "General",
    displayOrder: 1,
    status: "PUBLISHED",
    enableSchema: true,
  });

  useEffect(() => {
    loadFaqData();
  }, [id]);

  const loadFaqData = () => {
    setLoading(true);
    const matched =
      faqsData.find((f) => f.id === id || id.includes(f.id)) || faqsData[0];

    if (matched) {
      setFormData({
        question: matched.question,
        answer: matched.answer,
        category: matched.category || "General",
        displayOrder: matched.displayOrder || 1,
        status: "PUBLISHED",
        enableSchema: matched.enableSchema !== false,
      });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/faqs");
        router.refresh();
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/faqs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All FAQs</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">
            Edit FAQ Question
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            FAQ ID: <code className="font-semibold text-teal-700">{id}</code>
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
          <span>FAQ question updated successfully! Redirecting...</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="h-6 w-6 text-teal-700 animate-spin mr-3" />
          <span className="text-sm font-semibold text-slate-600">Loading FAQ editor...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <HelpCircle className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">FAQ Details</h2>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Question Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Answer Explanation <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category Group
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Display Order Priority
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
                  Publish Status
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

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="schema"
                checked={formData.enableSchema}
                onChange={(e) => setFormData({ ...formData, enableSchema: e.target.checked })}
                className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
              />
              <label htmlFor="schema" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Code className="h-3.5 w-3.5 text-teal-700" />
                Enable FAQPage JSON-LD Structured Data Schema
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Link
              href="/admin/faqs"
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Link>
            <Button type="submit" variant="primary" size="lg" isLoading={saving}>
              <Save className="h-4 w-4 mr-2" />
              Save FAQ Changes
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
