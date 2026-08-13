"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { MessageSquare, Calendar, Save, CheckCircle2, Trash2, Edit, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BookingItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  timeSlot: string;
  topic: string;
  status: "CONFIRMED" | "COMPLETED" | "PENDING" | "CANCELLED";
  createdAt?: string;
}

export default function AdminChatWidgetControlPage() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const [cmsConfig, setCmsConfig] = useState({
    whatsappNumber: "+92 306 4402649",
    whatsappMessage: "Hi Rizwan, I'd like to discuss a digital growth project.",
    adminName: "Rizwan Saeed",
    adminTitle: "Digital Growth Specialist · Online",
    avatarUrl: "/images/rizwan-saeed.png",
    themeColor: "emerald",
  });

  const [bookings, setBookings] = useState<BookingItem[]>([]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingItem | null>(null);

  const [formData, setFormData] = useState<BookingItem>({
    id: "",
    name: "",
    email: "",
    phone: "",
    date: "2026-08-15",
    timeSlot: "11:00 AM (UAE)",
    topic: "Meta Ads & E-Commerce Scaling",
    status: "CONFIRMED",
  });

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem("chat_widget_cms_config");
      if (savedConfig) {
        setCmsConfig((prev) => ({ ...prev, ...JSON.parse(savedConfig) }));
      }

      // Fetch bookings from Prisma DB
      fetch("/api/admin/bookings")
        .then((res) => res.json())
        .then((data) => {
          if (data?.bookings && data.bookings.length > 0) {
            setBookings(data.bookings);
            localStorage.setItem("admin_calendar_bookings", JSON.stringify(data.bookings));
          } else {
            const savedBookings = localStorage.getItem("admin_calendar_bookings");
            if (savedBookings) setBookings(JSON.parse(savedBookings));
          }
        })
        .catch(() => {
          const savedBookings = localStorage.getItem("admin_calendar_bookings");
          if (savedBookings) setBookings(JSON.parse(savedBookings));
        });
    } catch {
      // Fallback
    }
  }, []);

  const persistBookings = async (updatedList: BookingItem[]) => {
    setBookings(updatedList);
    try {
      localStorage.setItem("admin_calendar_bookings", JSON.stringify(updatedList));
    } catch {
      // Fallback
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");

    try {
      localStorage.setItem("chat_widget_cms_config", JSON.stringify(cmsConfig));
      setSuccess("Chat widget & WhatsApp settings saved successfully!");
      setTimeout(() => setSuccess(""), 3500);
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingBooking(null);
    setFormData({
      id: `book-${Date.now()}`,
      name: "",
      email: "",
      phone: "",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "11:00 AM (UAE)",
      topic: "Meta Ads & E-Commerce Scaling",
      status: "CONFIRMED",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (booking: BookingItem) => {
    setEditingBooking(booking);
    setFormData({ ...booking });
    setIsModalOpen(true);
  };

  const handleSaveBookingModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    let updated: BookingItem[];
    if (editingBooking) {
      updated = bookings.map((b) => (b.id === editingBooking.id ? { ...formData } : b));
      setSuccess("Appointment details updated successfully!");
    } else {
      updated = [{ ...formData, id: `book-${Date.now()}` }, ...bookings];
      setSuccess("New appointment logged successfully!");
    }

    try {
      await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback
    }

    persistBookings(updated);
    setIsModalOpen(false);
    setTimeout(() => setSuccess(""), 3500);
  };

  const handleDeleteBooking = async (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    try {
      await fetch(`/api/admin/bookings?id=${id}`, { method: "DELETE" });
    } catch {
      // Fallback
    }
    persistBookings(updated);
    setSuccess("Appointment removed successfully!");
    setTimeout(() => setSuccess(""), 3500);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader
        title="Floating Chat Widget & Calendar Bookings CMS"
        subtitle="Manage WhatsApp connection settings, prefilled messages, interactive calendar appointments, edit, add, or delete strategy call bookings."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{success}</span>
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

      {/* 2. Received Calendar Call Bookings Table with Full Add/Edit/Delete Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#00a896]" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">Strategy Call Appointments Booked</h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
              {bookings.length} Bookings Received
            </span>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Appointment</span>
            </button>
          </div>
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
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                    No strategy call bookings found. Click "Add New Appointment" to create one.
                  </td>
                </tr>
              ) : (
                bookings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 space-y-1">
                      <p className="font-bold text-slate-900 font-serif">{item.name}</p>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {item.email} {item.phone ? `· ${item.phone}` : ""}
                      </p>
                    </td>
                    <td className="p-4 font-mono font-bold text-teal-800">
                      {item.date} @ {item.timeSlot}
                    </td>
                    <td className="p-4 text-slate-600 font-bold">{item.topic || "General Strategy"}</td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                          item.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : item.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : item.status === "CANCELLED"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        {item.status || "CONFIRMED"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 rounded-lg text-teal-700 hover:bg-teal-50"
                        title="Edit Appointment"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(item.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="Remove Booking"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#00a896]" />
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  {editingBooking ? "Edit Strategy Call Appointment" : "Add Strategy Call Appointment"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBookingModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Client Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@techgrowth.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Call Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Time Slot *</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
                  >
                    <option value="10:00 AM (UAE)">10:00 AM (UAE)</option>
                    <option value="11:00 AM (UAE)">11:00 AM (UAE)</option>
                    <option value="11:30 AM (PKT)">11:30 AM (PKT)</option>
                    <option value="03:00 PM (EST)">03:00 PM (EST)</option>
                    <option value="06:30 PM (BST)">06:30 PM (BST)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Phone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+971 50 123 4567"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Appointment Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-bold"
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Project Goal / Topic</label>
                <input
                  type="text"
                  placeholder="Meta Ads & E-Commerce Scaling"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00a896] hover:bg-[#028090] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  {editingBooking ? "Update Appointment" : "Add Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
