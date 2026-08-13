"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  CheckCircle2,
  Save,
  Palette,
  Sparkles,
  RefreshCw,
  Check,
  Layout,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sliders,
  Layers,
  Award,
  Type,
  Image as ImageIcon,
} from "lucide-react";

import { applyThemeVariables } from "@/components/theme/ThemeProvider";

export default function AdminThemeColorsCMSPage() {
  const [primaryColor, setPrimaryColor] = useState("#00a896");
  const [secondaryColor, setSecondaryColor] = useState("#028090");
  const [darkBgColor, setDarkBgColor] = useState("#060c1a");
  const [bgPattern, setBgPattern] = useState("topographic");
  const [fontFamily, setFontFamily] = useState("playfair");
  const [siteLogo, setSiteLogo] = useState("/images/rizwan-saeed.png");
  const [siteFavicon, setSiteFavicon] = useState("/images/rizwan-saeed.png");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // 10 Luxury Color Presets
  const presets = [
    {
      name: "Emerald & Teal (Default)",
      primary: "#00a896",
      secondary: "#028090",
      darkBg: "#060c1a",
      tag: "Hospitality & Tech",
    },
    {
      name: "Dubai Royal Gold",
      primary: "#d4af37",
      secondary: "#b8860b",
      darkBg: "#120e03",
      tag: "Luxury & Enterprise",
    },
    {
      name: "Abu Dhabi Sovereign Gold",
      primary: "#c5a059",
      secondary: "#9b7b38",
      darkBg: "#16130b",
      tag: "VVIP Sovereign",
    },
    {
      name: "Electric Sapphire",
      primary: "#2563eb",
      secondary: "#0284c7",
      darkBg: "#030712",
      tag: "SaaS & Performance",
    },
    {
      name: "Deep Velvet Violet",
      primary: "#8b5cf6",
      secondary: "#6d28d9",
      darkBg: "#090514",
      tag: "Creative & Agency",
    },
    {
      name: "Sunset Crimson & Rose",
      primary: "#e11d48",
      secondary: "#be123c",
      darkBg: "#140409",
      tag: "High Conversion",
    },
    {
      name: "Cyberpunk Emerald & Lime",
      primary: "#10b981",
      secondary: "#84cc16",
      darkBg: "#02120b",
      tag: "Modern Growth",
    },
    {
      name: "Oceanic Turquoise & Cyan",
      primary: "#06b6d4",
      secondary: "#0284c7",
      darkBg: "#04161c",
      tag: "Fresh E-Commerce",
    },
    {
      name: "Luxury Espresso & Copper",
      primary: "#c2410c",
      secondary: "#9a3412",
      darkBg: "#120703",
      tag: "Bespoke & Elegant",
    },
    {
      name: "Sleek Obsidian & Platinum",
      primary: "#3b82f6",
      secondary: "#475569",
      darkBg: "#090d16",
      tag: "Minimalist Executive",
    },
  ];

  useEffect(() => {
    try {
      const savedPrimary = localStorage.getItem("site_theme_primary");
      const savedSecondary = localStorage.getItem("site_theme_secondary");
      const savedDarkBg = localStorage.getItem("site_theme_darkbg");
      const savedPattern = localStorage.getItem("site_theme_pattern");
      const savedFont = localStorage.getItem("site_theme_font");
      const savedLogo = localStorage.getItem("site_logo_url");
      const savedFavicon = localStorage.getItem("site_favicon_url");
      if (savedPrimary) setPrimaryColor(savedPrimary);
      if (savedSecondary) setSecondaryColor(savedSecondary);
      if (savedDarkBg) setDarkBgColor(savedDarkBg);
      if (savedPattern) setBgPattern(savedPattern);
      if (savedFont) setFontFamily(savedFont);
      if (savedLogo) setSiteLogo(savedLogo);
      if (savedFavicon) setSiteFavicon(savedFavicon);

      applyThemeVariables(savedPrimary, savedSecondary, savedDarkBg, savedFont);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleApplyPreset = (primary: string, secondary: string, darkBg: string) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
    setDarkBgColor(darkBg);
    updateLiveTheme(primary, secondary, darkBg, fontFamily);
  };

  const updateLiveTheme = (primary: string, secondary: string, darkBg: string, font?: string) => {
    applyThemeVariables(primary, secondary, darkBg, font || fontFamily);
  };

  const handleSelectFont = (font: string) => {
    setFontFamily(font);
    updateLiveTheme(primaryColor, secondaryColor, darkBgColor, font);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      localStorage.setItem("site_theme_primary", primaryColor);
      localStorage.setItem("site_theme_secondary", secondaryColor);
      localStorage.setItem("site_theme_darkbg", darkBgColor);
      localStorage.setItem("site_theme_pattern", bgPattern);
      localStorage.setItem("site_theme_font", fontFamily);
      localStorage.setItem("site_logo_url", siteLogo);
      localStorage.setItem("site_favicon_url", siteFavicon);
      updateLiveTheme(primaryColor, secondaryColor, darkBgColor, fontFamily);

      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPrimaryColor("#00a896");
    setSecondaryColor("#028090");
    setDarkBgColor("#060c1a");
    setBgPattern("topographic");
    setFontFamily("playfair");
    localStorage.removeItem("site_theme_primary");
    localStorage.removeItem("site_theme_secondary");
    localStorage.removeItem("site_theme_darkbg");
    localStorage.removeItem("site_theme_pattern");
    localStorage.removeItem("site_theme_font");
    updateLiveTheme("#00a896", "#028090", "#060c1a", "playfair");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Theme & Website Brand Colors CMS"
        subtitle="Customize primary brand accent colors, dark section backgrounds, background wave patterns, and live theme presets across your portfolio website."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Website brand colors saved successfully! Live website theme updated.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Preset Palettes & Custom Controls */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-8">
          {/* 10 Preset Palettes Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-teal-700" />
                <h2 className="text-lg font-bold text-slate-900 font-serif">
                  Curated Executive Palettes (One-Click)
                </h2>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 hover:text-teal-700 flex items-center gap-1"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Default
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {presets.map((preset) => {
                const isSelected =
                  primaryColor.toLowerCase() === preset.primary.toLowerCase();
                return (
                  <div
                    key={preset.name}
                    onClick={() => handleApplyPreset(preset.primary, preset.secondary, preset.darkBg)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-3 relative ${
                      isSelected
                        ? "border-teal-600 bg-teal-50/40 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 font-serif">
                        {preset.name}
                      </span>
                      {isSelected && <Check className="h-4 w-4 text-teal-700" />}
                    </div>

                    {/* Color Swatch Circles */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 rounded-full border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: preset.primary }}
                        title="Primary Color"
                      />
                      <div
                        className="h-6 w-6 rounded-full border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: preset.secondary }}
                        title="Secondary Accent"
                      />
                      <div
                        className="h-6 w-6 rounded-full border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: preset.darkBg }}
                        title="Dark Section BG"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded ml-auto">
                        {preset.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Background Vector Pattern Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Layers className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Background Vector Art & Contour Waves
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setBgPattern("topographic")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  bgPattern === "topographic"
                    ? "border-teal-600 bg-teal-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">3D Topographic Waves</span>
                  {bgPattern === "topographic" && <Check className="h-4 w-4 text-teal-700" />}
                </div>
                <p className="text-[11px] text-slate-500">Subtle 3D contour lines (Executive Style)</p>
              </div>

              <div
                onClick={() => setBgPattern("dotgrid")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  bgPattern === "dotgrid"
                    ? "border-teal-600 bg-teal-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Dot Grid Matrix</span>
                  {bgPattern === "dotgrid" && <Check className="h-4 w-4 text-teal-700" />}
                </div>
                <p className="text-[11px] text-slate-500">Tech & SaaS dot grid backdrop</p>
              </div>

              <div
                onClick={() => setBgPattern("clean")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  bgPattern === "clean"
                    ? "border-teal-600 bg-teal-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Clean Ambient Glow</span>
                  {bgPattern === "clean" && <Check className="h-4 w-4 text-teal-700" />}
                </div>
                <p className="text-[11px] text-slate-500">Minimalist soft radial blur background</p>
              </div>
            </div>
          </div>

          {/* Typography & Font Pairings Customizer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Type className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Website Typography & Font Family Selector
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Playfair Display */}
              <div
                onClick={() => handleSelectFont("playfair")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  fontFamily === "playfair"
                    ? "border-teal-600 bg-teal-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 font-serif">Playfair Display</span>
                  {fontFamily === "playfair" && <Check className="h-4 w-4 text-teal-700" />}
                </div>
                <p className="text-xs text-slate-500 font-serif italic">"Classic Executive & Luxury Serif"</p>
              </div>

              {/* Inter */}
              <div
                onClick={() => handleSelectFont("inter")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  fontFamily === "inter"
                    ? "border-teal-600 bg-teal-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 font-sans">Inter Sans</span>
                  {fontFamily === "inter" && <Check className="h-4 w-4 text-teal-700" />}
                </div>
                <p className="text-xs text-slate-500 font-sans">"Modern Minimalist Corporate Sans"</p>
              </div>

              {/* Outfit */}
              <div
                onClick={() => handleSelectFont("outfit")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  fontFamily === "outfit"
                    ? "border-teal-600 bg-teal-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Outfit Geometric</span>
                  {fontFamily === "outfit" && <Check className="h-4 w-4 text-teal-700" />}
                </div>
                <p className="text-xs text-slate-500">"Bold High-Impact Agency Style"</p>
              </div>

              {/* Cinzel */}
              <div
                onClick={() => handleSelectFont("cinzel")}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
                  fontFamily === "cinzel"
                    ? "border-teal-600 bg-teal-50/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Cinzel Royal</span>
                  {fontFamily === "cinzel" && <Check className="h-4 w-4 text-teal-700" />}
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">"VVIP Royal Enterprise Luxury"</p>
              </div>
            </div>
          </div>

          {/* Site Logo & Favicon Computer Upload Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <ImageIcon className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Website Branding Logo & Browser Favicon (Direct Computer Upload)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Header Logo */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Header & Navigation Brand Logo
                </label>
                <ImageUploader
                  value={siteLogo}
                  onChange={(newUrl) => setSiteLogo(newUrl)}
                />
              </div>

              {/* Favicon */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Browser Tab Favicon Icon
                </label>
                <ImageUploader
                  value={siteFavicon}
                  onChange={(newUrl) => setSiteFavicon(newUrl)}
                />
              </div>
            </div>
          </div>

          {/* Custom Color Code Pickers */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Sparkles className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Custom Hex Codes & Fine-Tuning
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Primary Color Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Primary Accent Color
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      updateLiveTheme(e.target.value, secondaryColor, darkBgColor);
                    }}
                    className="h-10 w-12 rounded-lg border border-slate-300 cursor-pointer p-1 bg-white"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      updateLiveTheme(e.target.value, secondaryColor, darkBgColor);
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono uppercase font-bold"
                  />
                </div>
              </div>

              {/* Secondary Color Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Secondary Accent Color
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                      updateLiveTheme(primaryColor, e.target.value, darkBgColor);
                    }}
                    className="h-10 w-12 rounded-lg border border-slate-300 cursor-pointer p-1 bg-white"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                      updateLiveTheme(primaryColor, e.target.value, darkBgColor);
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono uppercase font-bold"
                  />
                </div>
              </div>

              {/* Dark Background Tone Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Dark Section BG Tone
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    type="color"
                    value={darkBgColor}
                    onChange={(e) => {
                      setDarkBgColor(e.target.value);
                      updateLiveTheme(primaryColor, secondaryColor, e.target.value);
                    }}
                    className="h-10 w-12 rounded-lg border border-slate-300 cursor-pointer p-1 bg-white"
                  />
                  <input
                    type="text"
                    value={darkBgColor}
                    onChange={(e) => {
                      setDarkBgColor(e.target.value);
                      updateLiveTheme(primaryColor, secondaryColor, e.target.value);
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono uppercase font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Button type="submit" variant="primary" size="lg" isLoading={saving}>
              <Save className="h-4 w-4 mr-2" />
              Save Theme & Design System
            </Button>
          </div>
        </form>

        {/* Right Column: Live Interactive Theme Component Preview */}
        <div className="lg:col-span-5 space-y-6 sticky top-8">
          <div
            className="text-white rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl border border-slate-800/80 transition-colors relative overflow-hidden"
            style={{ backgroundColor: darkBgColor }}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layout className="h-5 w-5" style={{ color: primaryColor }} />
                <h3 className="font-bold text-white text-sm font-serif">
                  Live Theme UI Preview
                </h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                Real-Time Render
              </span>
            </div>

            {/* Live Hero Portrait & Status Card */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-[#00a896] flex-shrink-0">
                <Image
                  src="/images/rizwan-saeed.png"
                  alt="Rizwan Saeed"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-white font-serif">
                  <span>Rizwan Saeed</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00a896]" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Digital Marketing Manager & Shopify Developer
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Selected Projects</span>
                </div>
              </div>
            </div>

            {/* Header Logo Preview */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  RS
                </div>
                <span className="font-extrabold text-xs text-white uppercase tracking-wider">
                  RIZWAN <span style={{ color: primaryColor }}>SAEED</span>
                </span>
              </div>
              <span
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                Let's Talk
              </span>
            </div>

            {/* Stat Counter Metric Preview */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Verified Metric Counter
              </span>
              <div className="text-3xl font-black font-serif text-white tracking-tight">
                AED 4.2M+
              </div>
              <p className="text-xs font-bold text-slate-300">
                Client Online Revenue Generated
              </p>
            </div>

            {/* Service Card Preview */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span
                  className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}20` }}
                >
                  Acquisition
                </span>
              </div>
              <h4 className="font-bold text-white text-sm font-serif">Meta Ads & Paid Social</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scalable Meta campaign setups targeting CPA, ROAS, and custom CAPI attribution.
              </p>
              <div
                className="flex items-center gap-1 text-xs font-extrabold pt-1"
                style={{ color: primaryColor }}
              >
                <span>Explore Service Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Action Buttons Preview */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                CTA Action Buttons
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md transition-all hover:scale-105"
                  style={{ backgroundColor: primaryColor }}
                >
                  Submit Inquiry
                </button>
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border bg-slate-900"
                  style={{ color: primaryColor, borderColor: primaryColor }}
                >
                  WhatsApp Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


