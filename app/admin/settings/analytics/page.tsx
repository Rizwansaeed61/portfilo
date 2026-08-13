"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  Save,
  CheckCircle2,
  BarChart,
  Loader2,
  Code2,
  Terminal,
  FileCode,
  Sparkles,
  Zap,
} from "lucide-react";

export default function AnalyticsSettingsPage() {
  const [activeTab, setActiveTab] = useState<"keys" | "header" | "footer" | "css">("keys");

  const [analyticsState, setAnalyticsState] = useState({
    ga4Id: "G-XXXXXXXXXX",
    gtmId: "GTM-XXXXXXX",
    metaPixelId: "1234567890",
    linkedInTagId: "123456",
    tikTokPixelId: "",
    clarityId: "",
    headerCustomCode: `<!-- Custom Header Scripts & Verification Tags -->\n<meta name="facebook-domain-verification" content="abcdef1234567890" />`,
    footerCustomCode: `<!-- Custom Body/Footer Scripts (e.g. Live Chat & Webhooks) -->\n<script>\n  console.log("Custom footer scripts initialized");\n</script>`,
    customCss: `/* Custom CSS Overrides */\n.custom-accent-badge {\n  background: linear-gradient(135deg, #059669 0%, #0d9488 100%);\n}`,
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const insertSnippet = (field: "headerCustomCode" | "footerCustomCode", snippet: string) => {
    setAnalyticsState((prev) => ({
      ...prev,
      [field]: prev[field] ? `${prev[field]}\n\n${snippet}` : snippet,
    }));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics, Tracking & Custom Code Settings"
        subtitle="Manage measurement IDs for Google Analytics, Tag Manager, Meta Pixel, TikTok, and inject custom Header/Footer HTML, JS, or CSS scripts."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Analytics & Custom Code settings saved successfully!</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("keys")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "keys"
              ? "bg-teal-700 text-white shadow-md"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <BarChart className="h-4 w-4" />
          <span>Integration Keys</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("header")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "header"
              ? "bg-teal-700 text-white shadow-md"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span>Header Custom Code (&lt;head&gt;)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("footer")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "footer"
              ? "bg-teal-700 text-white shadow-md"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Terminal className="h-4 w-4" />
          <span>Footer Custom Code (&lt;/body&gt;)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("css")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "css"
              ? "bg-teal-700 text-white shadow-md"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileCode className="h-4 w-4" />
          <span>Custom CSS Overrides</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
        {/* TAB 1: INTEGRATION KEYS */}
        {activeTab === "keys" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BarChart className="h-5 w-5 text-teal-700" />
              <h2 className="font-bold text-slate-900 text-base font-serif">
                Analytics & Ad Platform Pixel IDs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Analytics 4 (GA4) Measurement ID
                </label>
                <input
                  type="text"
                  value={analyticsState.ga4Id}
                  onChange={(e) => setAnalyticsState({ ...analyticsState, ga4Id: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Google Tag Manager (GTM) Container ID
                </label>
                <input
                  type="text"
                  value={analyticsState.gtmId}
                  onChange={(e) => setAnalyticsState({ ...analyticsState, gtmId: e.target.value })}
                  placeholder="GTM-XXXXXXX"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Pixel ID (Facebook & Instagram)
                </label>
                <input
                  type="text"
                  value={analyticsState.metaPixelId}
                  onChange={(e) => setAnalyticsState({ ...analyticsState, metaPixelId: e.target.value })}
                  placeholder="1234567890"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  LinkedIn Insight Tag Partner ID
                </label>
                <input
                  type="text"
                  value={analyticsState.linkedInTagId}
                  onChange={(e) => setAnalyticsState({ ...analyticsState, linkedInTagId: e.target.value })}
                  placeholder="123456"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  TikTok Pixel ID
                </label>
                <input
                  type="text"
                  value={analyticsState.tikTokPixelId}
                  onChange={(e) => setAnalyticsState({ ...analyticsState, tikTokPixelId: e.target.value })}
                  placeholder="CXXXXXXXXXXXXXXX"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Microsoft Clarity Project ID
                </label>
                <input
                  type="text"
                  value={analyticsState.clarityId}
                  onChange={(e) => setAnalyticsState({ ...analyticsState, clarityId: e.target.value })}
                  placeholder="XXXXXXXXXX"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HEADER CUSTOM CODE */}
        {activeTab === "header" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-teal-700" />
                <h2 className="font-bold text-slate-900 text-base font-serif">
                  Header Custom Code Scripts (&lt;head&gt;)
                </h2>
              </div>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                Injected into &lt;head&gt;
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Add custom HTML, JavaScript tracking scripts, site verification meta tags, or Google Tag Manager header snippets here.
            </p>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 mr-1">Quick Snippets:</span>
                <button
                  type="button"
                  onClick={() =>
                    insertSnippet(
                      "headerCustomCode",
                      `<!-- Meta Domain Verification -->\n<meta name="facebook-domain-verification" content="YOUR_VERIFICATION_CODE" />`
                    )
                  }
                  className="text-[10px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded border border-teal-200 flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3 text-teal-600" /> Meta Domain Verification
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertSnippet(
                      "headerCustomCode",
                      `<!-- Custom Head Script -->\n<script>\n  // Add custom JS logic here\n</script>`
                    )
                  }
                  className="text-[10px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded border border-teal-200 flex items-center gap-1"
                >
                  <Zap className="h-3 w-3 text-teal-600" /> Custom Script Tag
                </button>
              </div>

              <textarea
                rows={10}
                value={analyticsState.headerCustomCode}
                onChange={(e) => setAnalyticsState({ ...analyticsState, headerCustomCode: e.target.value })}
                placeholder="<!-- Paste your custom <head> HTML / JavaScript scripts here... -->"
                className="w-full rounded-xl border border-slate-300 p-4 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none bg-slate-900 text-teal-300 resize-y leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* TAB 3: FOOTER CUSTOM CODE */}
        {activeTab === "footer" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-teal-700" />
                <h2 className="font-bold text-slate-900 text-base font-serif">
                  Footer Custom Code Scripts (&lt;/body&gt;)
                </h2>
              </div>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                Injected before &lt;/body&gt;
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Add live chat widgets (Tawk.to, Intercom, WhatsApp widget scripts), popups, or bottom-of-body analytics triggers here.
            </p>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 mr-1">Quick Snippets:</span>
                <button
                  type="button"
                  onClick={() =>
                    insertSnippet(
                      "footerCustomCode",
                      `<!-- Floating WhatsApp Chat Widget -->\n<script>\n  window.whatsappConfig = {\n    phone: "+971501234567",\n    message: "Hi Rizwan, I would like to inquire about your services!"\n  };\n</script>`
                    )
                  }
                  className="text-[10px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded border border-teal-200 flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3 text-teal-600" /> WhatsApp Widget Script
                </button>
              </div>

              <textarea
                rows={10}
                value={analyticsState.footerCustomCode}
                onChange={(e) => setAnalyticsState({ ...analyticsState, footerCustomCode: e.target.value })}
                placeholder="<!-- Paste your custom </body> HTML / JS scripts here... -->"
                className="w-full rounded-xl border border-slate-300 p-4 text-xs font-mono bg-slate-900 text-teal-300 focus:border-teal-600 focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOM CSS */}
        {activeTab === "css" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-teal-700" />
                <h2 className="font-bold text-slate-900 text-base font-serif">
                  Custom CSS Styling Overrides
                </h2>
              </div>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                Global Inline CSS
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Add custom CSS rules to override typography, colors, padding, or hide specific elements globally.
            </p>

            <textarea
              rows={10}
              value={analyticsState.customCss}
              onChange={(e) => setAnalyticsState({ ...analyticsState, customCss: e.target.value })}
              placeholder="/* Add your custom CSS styling rules here... */"
              className="w-full rounded-xl border border-slate-300 p-4 text-xs font-mono bg-slate-900 text-teal-300 focus:border-teal-600 focus:outline-none resize-y leading-relaxed"
            />
          </div>
        )}

        <div className="pt-4 border-t border-slate-100">
          <Button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 px-8 shadow-md"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving Settings & Scripts...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Analytics & Custom Code Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
