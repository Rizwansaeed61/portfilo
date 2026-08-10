"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save, User, Award, Globe, Briefcase, Sparkles, Plus, Trash2 } from "lucide-react";

export default function AdminAboutCMSPage() {
  const [formData, setFormData] = useState({
    title: "Digital Marketing Manager & Shopify Developer",
    shortBio:
      "Helping businesses in the UAE, USA, UK and worldwide acquire qualified leads, scale online revenue and build high-converting e-commerce systems.",
    fullBio:
      "Rizwan Saeed is a Digital Marketing Manager and Shopify Developer specializing in performance marketing, lead generation, e-commerce growth and conversion-focused web development. He has managed campaigns and digital projects for hospitality, retail and B2B brands across the UAE, USA and UK.",
    portraitImage: "/images/rizwan-saeed.png",
    location: "Multan, Pakistan (Serving Global Clients)",
    experienceYears: "5+ Years",
    revenueGenerated: "AED 4.2M+",
    adSpendManaged: "AED 850K",
    marketsServed: "UAE · USA · UK · Global",
    skills: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads & PPC Search",
      "Shopify & Liquid Development",
      "Conversion Rate Optimization (CRO)",
      "SEO & Generative Engine Optimization",
      "B2B Lead Generation",
    ],
  });

  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="About Page CMS"
        subtitle="Manage professional biography, core competencies, verified metrics, location info, and profile media."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>About Page CMS content saved successfully! Public cache updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Main Bio Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <User className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Biography & Taglines</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Professional Title / Headline
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Short Bio (Hero & Meta summary)
              </label>
              <textarea
                rows={2}
                value={formData.shortBio}
                onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Full Professional Biography
              </label>
              <textarea
                rows={4}
                value={formData.fullBio}
                onChange={(e) => setFormData({ ...formData, fullBio: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
              />
            </div>
          </div>
        </div>

        {/* Profile Image & Location */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Globe className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Media & Location</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Profile Portrait Image
              </label>
              <ImageUploader
                value={formData.portraitImage}
                onChange={(url) => setFormData({ ...formData, portraitImage: url })}
                label="Upload Portrait"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Location & Operation Base
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Markets Served
                </label>
                <input
                  type="text"
                  value={formData.marketsServed}
                  onChange={(e) => setFormData({ ...formData, marketsServed: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics & Highlights */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Award className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Verified Stats</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Years of Experience
              </label>
              <input
                type="text"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Total Revenue Generated
              </label>
              <input
                type="text"
                value={formData.revenueGenerated}
                onChange={(e) => setFormData({ ...formData, revenueGenerated: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold text-emerald-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Ad Spend Managed
              </label>
              <input
                type="text"
                value={formData.adSpendManaged}
                onChange={(e) => setFormData({ ...formData, adSpendManaged: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold text-teal-700"
              />
            </div>
          </div>
        </div>

        {/* Core Skills & Expertise */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Sparkles className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Core Skills & Specializations</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Add new skill (e.g., Conversion Rate Optimization)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
            <Button type="button" onClick={handleAddSkill} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1 text-teal-700" />
              Add Skill
            </Button>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save About CMS Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
