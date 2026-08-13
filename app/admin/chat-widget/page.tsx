"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { MessageSquare, Calendar, PhoneCall, Save, CheckCircle2, User, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminChatWidgetControlPage() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cmsConfig, setCmsConfig] = useState({
    whatsappNumber: "+92 306 4402649",
    whatsappMessage: "Hi Rizwan, I'd like to discuss a digital growth project.",
    adminName: "Rizwan Saeed",
    adminTitle: "Digital Growth Specialist · Online",
    avatarUrl: "/images/rizwan-saeed.png",
    themeColor: "emerald",
  });

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem("chat_widget_cms_config");
      if (savedConfig) {
        setCmsConfig((prev) => ({ ...prev, ...JSON.parse(savedConfig) }));
      }

      const savedBookings = localStorage.getItem("admin_calendar_bookings");
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      } else {
        // Sample booking fallback
        setBookings([
          {
            id: "book-sample-1",
            date: "2026-08-15",
            timeSlot: "11:00 AM (UAE)",
            name: "John Miller",
            email: "john@techgrowth.io",
            phone: "+971 50 123 4567",
            topic: "Meta Ads & E-Commerce Scaling",
            createdAt: new Date().toISOString(),
            status: "CONFIRMED",
          },
        ]);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      localStorage.setItem("chat_widget_cms_config", JSON.stringify(cmsConfig));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("admin_calendar_bookings", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader
        title="Floating Chat Widget & Calendar Bookings CMS"
        subtitle="Manage WhatsApp connection settings, prefilled messages, interactive calendar appointment slots, and view client bookings."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Chat widget & WhatsApp settings saved successfully!</span>
        </div>
      )}

      {/* 1. CMS Settings Configuration Form */}
      <form onSubmit={handleSaveConfig} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <MessageSquare className="h-5 w-5 text-[#00a896]" />
          <h3 className="font-bold text-slate-900 text-base font-serif">Widget Configuration & WhatsApp Link</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1.5">
            <label className="block font-bold uppercase tracking-wider text-slate-700">WhatsApp Phone Number</label>
            <input
              type="text"
              required
              value={cmsConfig.whatsappNumber}
              onChange={(e) => setCmsConfig({ ...cmsConfig, whatsappNumber: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-mono font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold uppercase tracking-wider text-slate-700">Display Name & Status Title</label>
            <input
              type="text"
              required
              value={cmsConfig.adminTitle}
              onChange={(e) => setCmsConfig({ ...cmsConfig, adminTitle: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="block font-bold uppercase tracking-wider text-slate-700">WhatsApp Prefilled Message</label>
          <input
            type="text"
            required
            value={cmsConfig.whatsappMessage}
            onChange={(e) => setCmsConfig({ ...cmsConfig, whatsappMessage: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Widget Settings
          </Button>
        </div>
      </form>

      {/* 2. Received Calendar Call Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#00a896]" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">Strategy Call Appointments Booked</h3>
          </div>
          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
            {bookings.length} Bookings Received
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Client Name & Email</th>
                <th className="p-4">Selected Date & Time</th>
                <th className="p-4">Topic / Goal</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {bookings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 space-y-1">
                    <p className="font-bold text-slate-900 font-serif">{item.name}</p>
                    <p className="text-slate-500 font-mono text-[11px]">{item.email} {item.phone ? `· ${item.phone}` : ""}</p>
                  </td>
                  <td className="p-4 font-mono font-bold text-teal-800">
                    {item.date} @ {item.timeSlot}
                  </td>
                  <td className="p-4 text-slate-600 font-bold">{item.topic || "General Strategy"}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {item.status || "CONFIRMED"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteBooking(item.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="Remove Booking"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
