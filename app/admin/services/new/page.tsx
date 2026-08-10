"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save, ArrowLeft, Briefcase, Plus, Trash2 } from "lucide-react";

export default function AdminNewServicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    iconName: "TrendingUp",
    shortDescription: "",
    fullDescription: "",
    deliverables: ["Comprehensive Audit", "Strategic Execution Plan"],
    displayOrder: 1,
    status: "PUBLISHED",
    featured: true,
  });

  const [newDel, setNewDel] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleAddDeliverable = () => {
    if (newDel.trim() && !formData.deliverables.includes(newDel.trim())) {
      setFormData({ ...formData, deliverables: [...formData.deliverables, newDel.trim()] });
      setNewDel("");
    }
  };

  const handleRemoveDeliverable = (idx: number) => {
    setFormData({
      ...formData,
      deliverables: formData.deliverables.filter((_, i) => i !== idx),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/services");
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/services"
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          title="Add New Growth Service"
          subtitle="Configure service offering, deliverables, icon, order, and public details."
        />
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Service created successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Briefcase className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Service Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Service Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Meta Ads & Performance Scaling"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: formData.slug ? formData.slug : generateSlug(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                URL Slug
              </label>
              <input
                type="text"
                placeholder="meta-ads"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Icon Name (Lucide Icon)
              </label>
              <select
                value={formData.iconName}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-medium"
              >
                <option value="TrendingUp">TrendingUp (Performance)</option>
                <option value="ShoppingBag">ShoppingBag (Shopify)</option>
                <option value="Search">Search (SEO & Google Ads)</option>
                <option value="Target">Target (Lead Gen)</option>
                <option value="Layout">Layout (Landing Pages)</option>
                <option value="BarChart3">BarChart3 (Analytics)</option>
              </select>
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

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Short Teaser Description
            </label>
            <input
              type="text"
              placeholder="Short 1-2 sentence card summary..."
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Full Service Overview
            </label>
            <textarea
              rows={4}
              placeholder="Detailed service narrative, value proposition, and strategy..."
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
            />
          </div>

          {/* Deliverables */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Key Deliverables Included
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-teal-600 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add deliverable (e.g. Meta CAPI Server Setup)..."
                value={newDel}
                onChange={(e) => setNewDel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddDeliverable}>
                <Plus className="h-3.5 w-3.5 mr-1 text-teal-700" />
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Link
            href="/admin/services"
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </Link>
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Create Service
          </Button>
        </div>
      </form>
    </div>
  );
}
