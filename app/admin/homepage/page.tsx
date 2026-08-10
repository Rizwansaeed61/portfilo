"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save, Sparkles, Loader2 } from "lucide-react";

export default function AdminHomepageCMS() {
  const [heroState, setHeroState] = useState({
    smallLabel: "Available for selected international projects",
    name: "Rizwan Saeed",
    title: "Digital Growth Specialist",
    mainHeading: "Need More Qualified Leads, Online Sales and Measurable ROI?",
    supportingText: "I help businesses grow through performance marketing, high-converting websites, Shopify development and intelligent automation.",
    subheadline: "Digital Marketing Manager and Shopify Developer with 5+ years of international experience across the UAE, USA and UK.",
    primaryCtaText: "Book a Free Strategy Call",
    primaryCtaUrl: "/contact",
    secondaryCtaText: "View My Results",
    secondaryCtaUrl: "/results",
    portraitImage: "/images/rizwan-saeed.png",
    availabilityBadge: "Available for selected international projects",
    active: true,
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      // Simulate server save & revalidate
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
        title="Homepage CMS Management"
        subtitle="Manage hero headline, CTAs, availability badge, portrait image, and platform tools displayed on the main landing page."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span>Homepage Hero updated successfully! Public cache revalidated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Hero Section Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-700" />
              Hero Section Settings
            </h2>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={heroState.active}
                onChange={(e) => setHeroState({ ...heroState, active: e.target.checked })}
                className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
              />
              <label htmlFor="active" className="text-xs font-bold text-slate-700">
                Enable Hero Section
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Small Top Label
              </label>
              <input
                type="text"
                value={heroState.smallLabel}
                onChange={(e) => setHeroState({ ...heroState, smallLabel: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Availability Badge Text
              </label>
              <input
                type="text"
                value={heroState.availabilityBadge}
                onChange={(e) => setHeroState({ ...heroState, availabilityBadge: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                value={heroState.name}
                onChange={(e) => setHeroState({ ...heroState, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Professional Title
              </label>
              <input
                type="text"
                value={heroState.title}
                onChange={(e) => setHeroState({ ...heroState, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Main H1 Heading (Buyer Outcome)
            </label>
            <textarea
              rows={2}
              value={heroState.mainHeading}
              onChange={(e) => setHeroState({ ...heroState, mainHeading: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Supporting Text Paragraph
            </label>
            <textarea
              rows={3}
              value={heroState.supportingText}
              onChange={(e) => setHeroState({ ...heroState, supportingText: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          {/* CTAs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Primary CTA Button Label
                </label>
                <input
                  type="text"
                  value={heroState.primaryCtaText}
                  onChange={(e) => setHeroState({ ...heroState, primaryCtaText: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Primary CTA Destination URL
                </label>
                <input
                  type="text"
                  value={heroState.primaryCtaUrl}
                  onChange={(e) => setHeroState({ ...heroState, primaryCtaUrl: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Secondary CTA Button Label
                </label>
                <input
                  type="text"
                  value={heroState.secondaryCtaText}
                  onChange={(e) => setHeroState({ ...heroState, secondaryCtaText: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Secondary CTA Destination URL
                </label>
                <input
                  type="text"
                  value={heroState.secondaryCtaUrl}
                  onChange={(e) => setHeroState({ ...heroState, secondaryCtaUrl: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Portrait Image Uploader */}
          <div className="pt-4 border-t border-slate-100">
            <ImageUploader
              label="Hero Portrait Image Asset"
              value={heroState.portraitImage}
              onChange={(url) => setHeroState({ ...heroState, portraitImage: url })}
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 font-bold shadow-md"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Homepage Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
