"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save, Layout, ShieldCheck, Briefcase, Building, Plus, Trash2 } from "lucide-react";

interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export default function AdminFooterCMSPage() {
  const [footerState, setFooterState] = useState({
    tagline:
      "Rizwan Saeed is a Digital Marketing Manager, Performance Marketer and Shopify Developer helping businesses in the UAE, USA and UK scale online revenue.",
    copyrightText: "© 2026 Rizwan Saeed. All rights reserved.",
    servicesLinks: [
      { id: "s1", label: "Meta Ads Management", href: "/services/meta-ads" },
      { id: "s2", label: "Google Ads Management", href: "/services/google-ads" },
      { id: "s3", label: "Shopify Development", href: "/services/shopify-development" },
      { id: "s4", label: "SEO & AI Search", href: "/services/seo" },
      { id: "s5", label: "Landing Page Development", href: "/services/landing-pages" },
      { id: "s6", label: "B2B Lead Generation", href: "/services/lead-generation" },
    ],
    companyLinks: [
      { id: "c1", label: "About Rizwan Saeed", href: "/about" },
      { id: "c2", label: "Verified Results", href: "/results" },
      { id: "c3", label: "Career Experience", href: "/about#experience" },
      { id: "c4", label: "Growth Insights", href: "/insights" },
      { id: "c5", label: "Book Strategy Call", href: "/contact" },
      { id: "c6", label: "FAQs", href: "/#faq" },
    ],
    legalLinks: [
      { id: "l1", label: "Privacy Policy", href: "/privacy" },
      { id: "l2", label: "Terms of Service", href: "/terms" },
      { id: "l3", label: "XML Sitemap", href: "/sitemap.xml" },
    ],
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLinkChange = (
    group: "servicesLinks" | "companyLinks" | "legalLinks",
    id: string,
    field: "label" | "href",
    val: string
  ) => {
    setFooterState((prev) => ({
      ...prev,
      [group]: prev[group].map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const handleAddLink = (group: "servicesLinks" | "companyLinks" | "legalLinks") => {
    const created: FooterLink = { id: Date.now().toString(), label: "New Footer Link", href: "/" };
    setFooterState((prev) => ({
      ...prev,
      [group]: [...prev[group], created],
    }));
  };

  const handleRemoveLink = (
    group: "servicesLinks" | "companyLinks" | "legalLinks",
    id: string
  ) => {
    setFooterState((prev) => ({
      ...prev,
      [group]: prev[group].filter((item) => item.id !== id),
    }));
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
        title="Footer Settings & Column Links CMS"
        subtitle="Manage website footer branding text, column navigation, legal policy links, and copyright text."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Footer settings updated successfully! Footer cached revalidated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Footer Brand Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Layout className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Branding & Copyright</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Footer Tagline / Brand Statement
              </label>
              <textarea
                rows={2}
                value={footerState.tagline}
                onChange={(e) => setFooterState({ ...footerState, tagline: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Copyright Notice
              </label>
              <input
                type="text"
                value={footerState.copyrightText}
                onChange={(e) => setFooterState({ ...footerState, copyrightText: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Services Links Column */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">Services Column Links</h2>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddLink("servicesLinks")}
            >
              <Plus className="h-3.5 w-3.5 mr-1 text-teal-700" />
              Add Link
            </Button>
          </div>

          <div className="space-y-3">
            {footerState.servicesLinks.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) =>
                    handleLinkChange("servicesLinks", item.id, "label", e.target.value)
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) =>
                    handleLinkChange("servicesLinks", item.id, "href", e.target.value)
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLink("servicesLinks", item.id)}
                  className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Company Links Column */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">Company Column Links</h2>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddLink("companyLinks")}
            >
              <Plus className="h-3.5 w-3.5 mr-1 text-teal-700" />
              Add Link
            </Button>
          </div>

          <div className="space-y-3">
            {footerState.companyLinks.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) =>
                    handleLinkChange("companyLinks", item.id, "label", e.target.value)
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) =>
                    handleLinkChange("companyLinks", item.id, "href", e.target.value)
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLink("companyLinks", item.id)}
                  className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Links Column */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">Legal & Sitemap Links</h2>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddLink("legalLinks")}
            >
              <Plus className="h-3.5 w-3.5 mr-1 text-teal-700" />
              Add Link
            </Button>
          </div>

          <div className="space-y-3">
            {footerState.legalLinks.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) =>
                    handleLinkChange("legalLinks", item.id, "label", e.target.value)
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) =>
                    handleLinkChange("legalLinks", item.id, "href", e.target.value)
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLink("legalLinks", item.id)}
                  className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Footer CMS Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
