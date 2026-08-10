"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TopographicWaveBackground } from "@/components/ui/TopographicWaveBackground";
import { siteConfig } from "@/content/site-config";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, TrendingUp, Award, Sparkles } from "lucide-react";

export function HeroSection() {
  const handleCtaClick = (name: "work" | "cv") => {
    if (name === "work") {
      trackEvent("service_card_click", { location: "hero_work" });
    } else {
      trackEvent("download_cv_click", { location: "hero_cv" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white bg-dot-grid py-12 sm:py-16 lg:py-24 border-b border-slate-100">
      {/* 3D Topographic Wave Contour Lines Artwork */}
      <TopographicWaveBackground opacity={0.14} mode="light" />

      {/* Background Decorative Gradient Spheres */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-50/60 rounded-full blur-2xl -z-10 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & Action Buttons */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Selected International Projects (UAE · USA · UK)</span>
            </div>

            {/* Main Name & Profession */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#00a896]">
                HELLO, I'M
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none font-serif">
                Rizwan Saeed
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#028090] tracking-tight">
                Digital Marketing Manager & Shopify Developer
              </h2>
            </div>

            {/* Paragraph Bio */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Specializing in paid performance marketing, lead generation systems, and high-converting Shopify store builds for hospitality, retail, and B2B brands across the UAE, USA, and UK.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects"
                onClick={() => handleCtaClick("work")}
                className="inline-flex items-center justify-center gap-2 bg-[#00a896] hover:bg-[#028090] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                View Selected Work
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="/contact"
                onClick={() => handleCtaClick("cv")}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#00a896] text-[#00a896] hover:bg-[#00a896] hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-2xs"
              >
                Book Growth Audit
                <Sparkles className="w-4 h-4" />
              </a>
            </div>

            {/* Tools Stack Strip */}
            <div className="pt-8 border-t border-slate-100 space-y-3">
              <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">
                CORE MARKETING & TECH STACK
              </span>

              <div className="flex flex-wrap items-center gap-2.5 text-slate-700 text-xs font-semibold">
                <span className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg transition-colors">Meta Ads (FB/IG)</span>
                <span className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg transition-colors">Google Search & PMax</span>
                <span className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg transition-colors">Shopify Liquid</span>
                <span className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg transition-colors">WordPress / WooCommerce</span>
                <span className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg transition-colors">Klaviyo Email</span>
                <span className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg transition-colors">GA4 & CAPI</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Portrait Image with Floating Metric Cards */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Soft Teal Glowing Circle Backdrop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#00a896]/20 blur-3xl -z-10 pointer-events-none" />

              {/* Main Portrait Frame */}
              <div className="relative w-full aspect-square sm:aspect-[4/4.2] overflow-hidden rounded-3xl bg-transparent border border-slate-200/60 shadow-xl">
                <Image
                  src="/images/rizwan-saeed.png"
                  alt="Rizwan Saeed — Digital Marketing Manager & Shopify Developer"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Floating Metric Card 1: Revenue (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:top-6 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 animate-fade-in">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 flex-shrink-0">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900 font-serif">AED 4.2M+</p>
                  <p className="text-[11px] font-semibold text-slate-500">Revenue Generated</p>
                </div>
              </div>

              {/* Floating Metric Card 2: Experience (Bottom Right) */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 animate-fade-in">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 flex-shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900 font-serif">5+ Years</p>
                  <p className="text-[11px] font-semibold text-slate-500">Global Ad & Web Exp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
