"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { experienceData } from "@/content/experience";
import {
  CheckCircle2,
  Save,
  ArrowLeft,
  Briefcase,
  Loader2,
} from "lucide-react";

export default function AdminEditExperiencePage({
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
    role: "",
    company: "",
    period: "",
    location: "",
    isCurrent: false,
    isFeatured: true,
    active: true,
    displayOrder: 1,
  });

  useEffect(() => {
    loadExperienceData();
  }, [id]);

  const loadExperienceData = () => {
    setLoading(true);
    const matched =
      experienceData.find((e) => e.id === id || id.includes(e.id)) || experienceData[0];

    if (matched) {
      setFormData({
        role: matched.role,
        company: matched.company,
        period: matched.period,
        location: matched.location,
        isCurrent: matched.isCurrent || false,
        isFeatured: matched.isFeatured !== false,
        active: matched.active !== false,
        displayOrder: matched.displayOrder || 1,
      });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim()) return;

    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/experience");
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
            href="/admin/experience"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Roles</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">
            Edit Experience Role: {formData.role}
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Entry ID: <code className="font-semibold text-teal-700">{id}</code>
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
          <span>Experience role updated successfully! Redirecting...</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="h-6 w-6 text-teal-700 animate-spin mr-3" />
          <span className="text-sm font-semibold text-slate-600">Loading role editor...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Briefcase className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">Role & Company Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Role Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Company / Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Time Period
                </label>
                <input
                  type="text"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Location / Region
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                  Featured Layout
                </label>
                <select
                  value={formData.isFeatured ? "true" : "false"}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.value === "true" })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-medium"
                >
                  <option value="true">Yes (Expanded)</option>
                  <option value="false">No (Compact)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Status
                </label>
                <select
                  value={formData.active ? "true" : "false"}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.value === "true" })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isCurrent"
                checked={formData.isCurrent}
                onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
              />
              <label htmlFor="isCurrent" className="text-xs font-bold text-slate-700">
                Mark as Current Role (Present)
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Link
              href="/admin/experience"
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Link>
            <Button type="submit" variant="primary" size="lg" isLoading={saving}>
              <Save className="h-4 w-4 mr-2" />
              Save Role Changes
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
