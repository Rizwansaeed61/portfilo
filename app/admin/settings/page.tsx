"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { CheckCircle2, Save, Settings, ShieldAlert, Globe, Bell, Image as ImageIcon } from "lucide-react";

export default function AdminGeneralSettingsPage() {
  const [formData, setFormData] = useState({
    siteName: "Rizwan Saeed Portfolio & Agency",
    siteUrl: "https://rizwansaddique.site",
    defaultMetaTitle: "Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    availabilityBadge: "Available for selected international projects",
    adminNotificationEmail: "Hello@RizwanSaddique.site",
    targetMarkets: "UAE, USA, UK, International",
    siteLogo: "/images/rizwan-saeed.png",
    siteFavicon: "/images/rizwan-saeed.png",
    maintenanceMode: false,
    enableAuditFormNotifications: true,
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem("site_logo_url");
      const savedFavicon = localStorage.getItem("site_favicon_url");
      if (savedLogo || savedFavicon) {
        setFormData((prev) => ({
          ...prev,
          siteLogo: savedLogo || prev.siteLogo,
          siteFavicon: savedFavicon || prev.siteFavicon,
        }));
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      localStorage.setItem("site_logo_url", formData.siteLogo);
      localStorage.setItem("site_favicon_url", formData.siteFavicon);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="General Site Settings"
        subtitle="Manage global application configuration, domain URL, email notifications, and maintenance mode."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>General site settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Site Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Settings className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Site Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Site Name / Brand Title
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Primary Domain URL
              </label>
              <input
                type="text"
                value={formData.siteUrl}
                onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Default Browser Title Format
            </label>
            <input
              type="text"
              value={formData.defaultMetaTitle}
              onChange={(e) => setFormData({ ...formData, defaultMetaTitle: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Hero Availability Badge Text
              </label>
              <input
                type="text"
                value={formData.availabilityBadge}
                onChange={(e) => setFormData({ ...formData, availabilityBadge: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Target International Markets
              </label>
              <input
                type="text"
                value={formData.targetMarkets}
                onChange={(e) => setFormData({ ...formData, targetMarkets: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            {/* Site Logo & Favicon Direct Upload Box */}
            <div className="pt-6 border-t border-slate-100 space-y-6 sm:col-span-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900 font-serif">
                  Website Branding Logo & Browser Tab Favicon
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Header / Brand Logo */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Header & Navigation Brand Logo (Direct Computer Upload)
                  </label>
                  <ImageUploader
                    value={formData.siteLogo}
                    onChange={(newUrl) => setFormData({ ...formData, siteLogo: newUrl })}
                  />
                </div>

                {/* Browser Favicon */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Browser Tab Icon / Favicon (Direct Computer Upload)
                  </label>
                  <ImageUploader
                    value={formData.siteFavicon}
                    onChange={(newUrl) => setFormData({ ...formData, siteFavicon: newUrl })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Notification Email */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Bell className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Notifications & Leads</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Notification Email
              </label>
              <input
                type="email"
                value={formData.adminNotificationEmail}
                onChange={(e) =>
                  setFormData({ ...formData, adminNotificationEmail: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center pt-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={formData.enableAuditFormNotifications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      enableAuditFormNotifications: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
                />
                <label htmlFor="notifications" className="text-xs font-bold text-slate-700">
                  Send email alert when a client submits Contact / Free Audit request
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* System & Maintenance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <ShieldAlert className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Maintenance Mode</h2>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div>
              <p className="text-xs font-bold text-amber-900">Enable Public Site Maintenance Mode</p>
              <p className="text-[11px] text-amber-700">
                When enabled, visitors will see a temporary holding page. Admin panel remains accessible.
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.maintenanceMode}
              onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
              className="h-5 w-5 rounded text-amber-700 focus:ring-amber-600"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save General Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
