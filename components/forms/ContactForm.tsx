"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { submitContactForm, ContactActionResult } from "@/actions/contact";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/content/site-config";
import { CheckCircle2, AlertCircle, Loader2, Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Sparkles, Clock, Globe } from "lucide-react";

interface ContactFormProps {
  defaultService?: string;
  defaultType?: string;
  hideSidebar?: boolean;
}

export function ContactForm({ defaultService, defaultType, hideSidebar = false }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactActionResult, FormData>(
    submitContactForm,
    { success: false }
  );

  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedStart = useRef(false);

  const handleFormFocus = () => {
    if (!hasTrackedStart.current) {
      trackEvent("contact_form_start");
      hasTrackedStart.current = true;
    }
  };

  useEffect(() => {
    if (state.success) {
      trackEvent("contact_form_submit", { status: "success" });
      if (formRef.current) {
        formRef.current.reset();
      }
    } else if (state.error) {
      trackEvent("contact_form_submit", { status: "error", error: state.error });
    }
  }, [state]);

  const formFields = (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xl space-y-6">
      {/* Success Banner */}
      {state.success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Inquiry received successfully! Rizwan Saeed will personally reply within 12-24 hours.</span>
        </div>
      )}

      {/* Error Banner */}
      {state.error && !state.success && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <form
        ref={formRef}
        action={formAction}
        onFocus={handleFormFocus}
        className="space-y-4"
        noValidate
      >
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="websiteUrlHoneypot" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Header Badge & Title */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00a896]">
            <Sparkles className="w-4 h-4" />
            <span>Project Strategy & Growth Audit</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
            12-24h Response
          </span>
        </div>

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="e.g. Alex Morgan"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#00a896] focus:ring-2 focus:ring-[#00a896]/20 focus:outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Work Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="alex@company.com"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#00a896] focus:ring-2 focus:ring-[#00a896]/20 focus:outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Row 2: Phone & Service Select */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+971 50 123 4567"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#00a896] focus:ring-2 focus:ring-[#00a896]/20 focus:outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Primary Service Required <span className="text-red-500">*</span>
            </label>
            <select
              name="requiredService"
              defaultValue={defaultService || "Meta Ads & Paid Social"}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#00a896] focus:ring-2 focus:ring-[#00a896]/20 focus:outline-none transition-all cursor-pointer"
            >
              <option value="Meta Ads & Paid Social">Meta Ads (Facebook & Instagram Advertising)</option>
              <option value="Google Ads & Intent PPC">Google Ads (Search & Performance Max)</option>
              <option value="Shopify & Liquid Development">Shopify Store Build & Liquid Customization</option>
              <option value="B2B Lead Gen & Automations">B2B Lead Generation & Automated CRM Funnel</option>
              <option value="SEO & AI Search Optimization">SEO & AI Search Optimization (GEO)</option>
              <option value="Full Digital Growth Strategy">Full Digital Growth Strategy (All-in-One)</option>
            </select>
          </div>
        </div>

        {/* Hidden inputs to supply required backend form fields */}
        <input type="hidden" name="country" value="International" />
        <input type="hidden" name="mainGoal" value="Project Strategy & Audit Inquiry" />
        <input type="hidden" name="monthlyBudget" value="$1,500 - $5,000+ / month" />
        <input type="hidden" name="consent" value="on" />

        {/* Row 3: Message Textarea */}
        <div className="space-y-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Project Overview & Goals <span className="text-red-500">*</span>
          </label>
          <textarea
            name="projectDetails"
            required
            rows={4}
            placeholder="Tell me about your current ad spend, website goals, target markets (UAE, USA, UK), or challenges..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#00a896] focus:ring-2 focus:ring-[#00a896]/20 focus:outline-none transition-all font-medium"
          ></textarea>
        </div>

        {/* Submit & Direct Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#00a896] hover:bg-[#028090] text-white px-7 py-3.5 rounded-xl font-extrabold text-xs shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Inquiry...
              </>
            ) : (
              <>
                <span>Submit Strategy Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 px-5 py-3.5 rounded-xl font-bold text-xs transition-all hover:border-emerald-400"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Quick Chat on WhatsApp</span>
          </a>
        </div>
      </form>
    </div>
  );

  if (hideSidebar) {
    return formFields;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Left Column: Dark VIP Contact Info Box */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#00a896]" />
            DIRECT CONTACT & BOOKING
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Start Your Growth Project
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Ready to scale online sales or generate high-quality B2B leads? Connect directly with Rizwan Saeed for a free growth strategy review.
          </p>
        </div>

        {/* Dark Luxury Contact Card */}
        <div className="bg-[#060c1a] text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00a896] pb-3 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED DIRECT CHANNELS</span>
          </div>

          <div className="space-y-3.5">
            {/* Work Email */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#00a896]/60 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00a896]/20 flex items-center justify-center text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white transition-colors flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Work Email</p>
                <p className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-[#00a896] transition-colors">{siteConfig.email}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#00a896]/60 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00a896]/20 flex items-center justify-center text-[#00a896] group-hover:bg-[#00a896] group-hover:text-white transition-colors flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Phone / WhatsApp</p>
                <p className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-[#00a896] transition-colors">{siteConfig.phone}</p>
              </div>
            </a>

            {/* Location & Markets */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-[#00a896]/20 flex items-center justify-center text-[#00a896] flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location & Core Markets</p>
                <p className="text-xs font-bold text-slate-200">Multan, PK · Serving UAE 🇦🇪, USA 🇺🇸 & UK 🇬🇧</p>
              </div>
            </div>
          </div>

          {/* Response Guarantee Badge */}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Clock className="w-4 h-4 text-[#00a896]" />
            <span>24-Hour Response Guarantee (Personally Reviewed)</span>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Form Box */}
      <div className="lg:col-span-7">
        {formFields}
      </div>
    </div>
  );
}
