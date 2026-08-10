"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/Button";
import { Save, CheckCircle2, User, Loader2, AlertCircle } from "lucide-react";

export default function AdminProfilePage() {
  const [profileState, setProfileState] = useState({
    name: "Rizwan Saeed",
    title: "Digital Marketing Manager, Performance Marketer & Shopify Developer",
    shortBio: "Helping businesses in the UAE, USA, UK and worldwide acquire qualified leads, scale online revenue and build high-converting e-commerce systems.",
    fullBio: "Rizwan Saeed is a Digital Marketing Manager and Shopify Developer specializing in performance marketing, lead generation, e-commerce growth and conversion-focused web development. He has managed campaigns and digital projects for hospitality, retail and B2B brands across the UAE, USA and UK.",
    location: "Multan, Pakistan",
    email: "Hello@RizwanSaddique.site",
    phone: "+92 306 4402649",
    whatsapp: "+923064402649",
    linkedin: "https://linkedin.com/in/rizwansaeed610",
    yearsExperience: "5+ Years",
    marketsServed: "UAE · USA · UK",
    photoUrl: "/images/rizwan-saeed.png",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch("/api/admin/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileState),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "Failed to update profile.");
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch {
      setError("An unexpected error occurred while saving profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Personal Profile & Admin Username Settings"
        subtitle="Update your admin display name, login email, professional bio, LinkedIn link, and profile portrait photo."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span>Profile and admin username updated successfully! Database and public site cache revalidated.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <User className="h-5 w-5 text-teal-700" />
              Admin Credentials & Public Biography
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Full Name (Username)
              </label>
              <input
                type="text"
                required
                value={profileState.name}
                onChange={(e) => setProfileState({ ...profileState, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Professional Title
              </label>
              <input
                type="text"
                required
                value={profileState.title}
                onChange={(e) => setProfileState({ ...profileState, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Login & Contact Email
              </label>
              <input
                type="email"
                required
                value={profileState.email}
                onChange={(e) => setProfileState({ ...profileState, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                value={profileState.phone}
                onChange={(e) => setProfileState({ ...profileState, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={profileState.linkedin}
                onChange={(e) => setProfileState({ ...profileState, linkedin: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Location
              </label>
              <input
                type="text"
                value={profileState.location}
                onChange={(e) => setProfileState({ ...profileState, location: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Short Bio Summary
            </label>
            <textarea
              rows={2}
              value={profileState.shortBio}
              onChange={(e) => setProfileState({ ...profileState, shortBio: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Full Professional Biography
            </label>
            <textarea
              rows={4}
              value={profileState.fullBio}
              onChange={(e) => setProfileState({ ...profileState, fullBio: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <ImageUploader
              label="Author Profile Photo"
              value={profileState.photoUrl}
              onChange={(url) => setProfileState({ ...profileState, photoUrl: url })}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={saving} className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 font-bold shadow-md">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating Profile...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Profile & Username
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
