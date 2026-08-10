"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { trackEvent } from "@/lib/analytics";
import {
  TrendingUp,
  Search,
  ShoppingBag,
  Zap,
  ArrowRight,
} from "lucide-react";

export function ServicesGrid() {
  const servicesList = [
    {
      title: "Meta Ads & Paid Social",
      slug: "meta-ads",
      description: "Data-driven Meta (Facebook & Instagram) ad campaigns built around target CPA, Conversions API (CAPI), and scalable ROAS.",
      icon: <TrendingUp className="w-6 h-6 text-[#00a896]" />,
      tag: "Acquisition & ROAS",
    },
    {
      title: "Google Ads & Intent PPC",
      slug: "google-ads",
      description: "High-commercial intent Google Search & Performance Max campaigns capturing active buyers in UAE, USA & UK.",
      icon: <Search className="w-6 h-6 text-[#00a896]" />,
      tag: "Commercial Intent",
    },
    {
      title: "Shopify & Liquid Development",
      slug: "shopify-development",
      description: "Custom, lightning-fast Shopify store builds, theme Liquid extensions, payment gateways, and conversion rate optimization.",
      icon: <ShoppingBag className="w-6 h-6 text-[#00a896]" />,
      tag: "E-Commerce Systems",
    },
    {
      title: "B2B Lead Gen & Automations",
      slug: "lead-generation",
      description: "Automated acquisition funnels, conditional lead qualification forms, Klaviyo CRM workflows, and instant team alerts.",
      icon: <Zap className="w-6 h-6 text-[#00a896]" />,
      tag: "Qualified Inquiries",
    },
  ];

  return (
    <section id="services" className="bg-white py-16 sm:py-24 border-b border-slate-100">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-2 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a896]">
            WHAT I DO & HOW I DRIVE GROWTH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Core Growth Services
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto font-normal">
            Integrating paid digital advertising, custom e-commerce web development, and lead automation engines into one scalable framework.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicesList.map((service, idx) => (
            <Link
              key={idx}
              href={`/services/${service.slug}`}
              onClick={() => trackEvent("service_card_click", { service: service.title })}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:border-[#00a896]/50 hover:-translate-y-1 relative"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                  {service.tag}
                </span>

                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#00a896]/10 flex items-center justify-center group-hover:bg-[#00a896] group-hover:text-white transition-all">
                  <div className="group-hover:[&_svg]:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00a896] transition-colors font-serif">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* Bottom Learn More Link */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00a896] group-hover:text-[#028090]">
                <span>Explore Service Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
