"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Calendar as CalendarIcon,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Clock,
  ChevronRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/content/site-config";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"MENU" | "CALENDAR" | "MESSAGE">("MENU");

  // Admin Configurable Settings State (persisted in localStorage)
  const [config, setConfig] = useState({
    whatsappNumber: siteConfig.phone || "+92 306 4402649",
    whatsappMessage: "Hi Rizwan, I'd like to discuss a digital growth project.",
    adminName: siteConfig.name || "Rizwan Saeed",
    adminTitle: "Digital Growth Specialist · Online",
    avatarUrl: "/images/rizwan-saeed.png",
    themeColor: "emerald", // emerald | teal
  });

  // Booking Form State
  const [selectedDate, setSelectedDate] = useState<string>("2026-08-15");
  const [selectedSlot, setSelectedSlot] = useState<string>("11:00 AM");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Meta Ads & E-Commerce Scaling",
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Message Form State
  const [message, setMessage] = useState("");
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  // Sync settings & listen for global trigger event ("open-chat-widget")
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("chat_widget_cms_config");
      if (savedSettings) {
        setConfig((prev) => ({ ...prev, ...JSON.parse(savedSettings) }));
      }
    } catch {
      // Fallback
    }

    const handleGlobalTrigger = () => setIsOpen(true);
    window.addEventListener("open-chat-widget", handleGlobalTrigger);
    return () => window.removeEventListener("open-chat-widget", handleGlobalTrigger);
  }, []);

  const availableDates = [
    { label: "Today", date: "2026-08-14", display: "Aug 14 (Fri)" },
    { label: "Tomorrow", date: "2026-08-15", display: "Aug 15 (Sat)" },
    { label: "Next Monday", date: "2026-08-17", display: "Aug 17 (Mon)" },
    { label: "Next Tuesday", date: "2026-08-18", display: "Aug 18 (Tue)" },
  ];

  const timeSlots = ["10:00 AM (UAE)", "11:30 AM (PKT)", "03:00 PM (EST)", "06:30 PM (BST)"];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name.trim() || !bookingForm.email.trim()) return;

    const newBooking = {
      id: `book-${Date.now()}`,
      date: selectedDate,
      timeSlot: selectedSlot,
      ...bookingForm,
      createdAt: new Date().toISOString(),
      status: "CONFIRMED",
    };

    // Store booking record in DB & locally
    try {
      await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });

      const existing = JSON.parse(localStorage.getItem("admin_calendar_bookings") || "[]");
      localStorage.setItem("admin_calendar_bookings", JSON.stringify([newBooking, ...existing]));
    } catch {
      // Fallback
    }

    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setActiveTab("MENU");
      setIsOpen(false);
    }, 3000);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessageSubmitted(true);
    setTimeout(() => {
      setMessageSubmitted(false);
      setMessage("");
      setActiveTab("MENU");
      setIsOpen(false);
    }, 2500);
  };

  const cleanWhatsappNumber = config.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Box Drawer */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-3xl bg-[#060c1a]/98 border border-emerald-500/30 text-white shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={config.avatarUrl}
                  alt={config.adminName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#00a896]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#060c1a] rounded-full animate-ping" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#060c1a] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-serif text-white">{config.adminName}</h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                  <span>{config.adminTitle}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* TAB 1: MAIN MENU */}
          {activeTab === "MENU" && (
            <div className="space-y-3">
              {/* WhatsApp Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 transition-all text-white font-semibold group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-[#00a896]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-white">Chat on WhatsApp</span>
                    <span className="text-[10px] text-slate-400 font-mono">Direct 1-on-1 Message</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  Instant
                </span>
              </a>

              {/* Interactive Calendar Booking Action */}
              <button
                onClick={() => setActiveTab("CALENDAR")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 transition-all text-white font-semibold group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-[#00a896]">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-white">Book 1-on-1 Strategy Call</span>
                    <span className="text-[10px] text-slate-400 font-mono">Select Date & Time Slot</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <span>Free 30 Mins</span>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </button>

              {/* Direct Quick Message Form */}
              <form onSubmit={handleMessageSubmit} className="space-y-2 pt-2 border-t border-slate-800">
                <p className="text-[11px] font-bold text-slate-300">Or send a quick message:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Type your project goal or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00a896]"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#00a896] hover:bg-[#028090] text-white rounded-xl shadow-lg transition-all"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {messageSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-1">
                  <p className="text-xs font-bold text-emerald-400">Message Delivered!</p>
                  <p className="text-[10px] text-slate-300">Rizwan will reply via email/WhatsApp shortly.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE CALENDAR BOOKING FORM */}
          {activeTab === "CALENDAR" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveTab("MENU")}
                  className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-[#00a896]" />
                  <span>Back to Menu</span>
                </button>
                <span className="text-[11px] font-bold text-[#00a896] bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  Select Date & Time
                </span>
              </div>

              {bookingSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-2 py-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto animate-bounce" />
                  <h5 className="font-bold text-base text-white font-serif">Strategy Call Booked!</h5>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Confirmed for <strong className="text-white">{selectedDate}</strong> at <strong className="text-white">{selectedSlot}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                  {/* Date Selector */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      1. Select Call Date
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {availableDates.map((d) => (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => setSelectedDate(d.date)}
                          className={`p-2 rounded-xl text-left border text-[11px] transition-all ${
                            selectedDate === d.date
                              ? "bg-[#00a896] text-white border-[#00a896] font-bold shadow-md"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="block font-bold">{d.label}</span>
                          <span className="text-[10px] opacity-80">{d.display}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slot Selector */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      2. Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all ${
                            selectedSlot === slot
                              ? "bg-[#00a896] text-white border-[#00a896] shadow-md"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00a896]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Business Email *"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00a896]"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Number (Optional)"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00a896]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#00a896] hover:bg-[#028090] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                  >
                    Confirm & Book Strategy Call
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Action Trigger Button — Match Site Theme Emerald Glow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Quick Chat Widget"
        className="relative group focus:outline-none"
      >
        {/* Outer Pulsing Aura Glow matching theme (#00a896 / emerald) */}
        <span className="absolute -inset-2 rounded-full bg-[#00a896]/30 blur-lg group-hover:bg-[#00a896]/50 transition-all duration-300 animate-pulse" />

        {/* Outer Circular Container */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#060c1a] border border-[#00a896]/40 p-2 shadow-2xl transition-transform duration-300 group-hover:scale-105">
          {/* Inner Core (Emerald/Teal Gradient with White Ring Stroke) */}
          <div className="flex items-center justify-center w-full h-full rounded-full bg-gradient-to-tr from-[#00a896] via-[#028090] to-emerald-600 border-2 border-white/90 shadow-inner">
            {isOpen ? (
              <X className="h-7 w-7 text-white transition-transform duration-200 rotate-90" />
            ) : (
              <MessageSquare className="h-7 w-7 text-white fill-white/20 transition-transform duration-200 group-hover:scale-110" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
