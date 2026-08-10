"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface ProjectItem {
  id: string;
  title: string;
  category: "UI/UX Design" | "Web Development" | "E-Commerce" | "SaaS & Dashboards";
  image: string;
  client: string;
  techStack: string[];
  metrics: string;
  summary: string;
  challenge: string;
  solution: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "findash-dashboard",
    title: "FinDash – Financial Analytics SaaS Dashboard",
    category: "SaaS & Dashboards",
    image: "/images/project-findash.png",
    client: "FinDash Global Inc.",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Chart.js", "Prisma"],
    metrics: "42% User Engagement Increase & Sub-sec Speed",
    summary: "A sleek, intuitive financial analytics dashboard enabling high-volume asset tracking, interactive line/donut charts, and real-time transaction reports.",
    challenge: "The existing legacy analytics platform suffered from cluttered data visualizers and slow load times for multi-account aggregated reports.",
    solution: "Designed a clean, light-mode design system with custom teal accent data visualizers, responsive sidebars, and fast server-side rendered metric widgets.",
  },
  {
    id: "greenly-plant-shop",
    title: "Greenly – E-Commerce Botany & Indoor Plant Shop",
    category: "E-Commerce",
    image: "/images/project-greenly.png",
    client: "Greenly Retail Ltd.",
    techStack: ["Shopify Plus", "Liquid", "Tailwind CSS", "Klaviyo", "Meta CAPI"],
    metrics: "3.4x Conversion Lift & $120K+ Monthly Sales",
    summary: "A modern, high-converting e-commerce web application featuring rich indoor plant collections, care guides, and seamless checkout flows.",
    challenge: "Low mobile conversion rates and high cart abandonment due to slow page loads and complex product filtering.",
    solution: "Re-engineered the storefront architecture with custom Liquid templates, instant AJAX add-to-cart drawers, and automated post-purchase email flows.",
  },
  {
    id: "wanderly-travel",
    title: "Wanderly – Travel & Luxury Hotel Booking Portal",
    category: "Web Development",
    image: "/images/project-wanderly.png",
    client: "Wanderly Travel Group",
    techStack: ["Next.js", "React 19", "Tailwind CSS", "Google Maps API"],
    metrics: "180% Growth in Direct Guest Bookings",
    summary: "An immersive travel discovery and destination booking platform showcasing top international hotels, tours, and interactive trip itineraries.",
    challenge: "High reliance on expensive 3rd-party online travel agencies (OTAs) with heavy commission fees.",
    solution: "Created an engaging direct booking experience with destination search filters, price comparison badges, and mobile-first booking steps.",
  },
  {
    id: "apex-industrial",
    title: "Apex Industrial – B2B Precision Manufacturing Portal",
    category: "Web Development",
    image: "/images/project-industrial.png",
    client: "Apex Industrial Solutions",
    techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Google Ads CAPI"],
    metrics: "65+ High-Ticket Commercial Inquiries / Month",
    summary: "A specialized B2B industrial catalog and quotation portal built to capture commercial manufacturing and supply chain buyers across the UAE & USA.",
    challenge: "Irrelevant consumer traffic wasting ad budget with zero commercial intent qualification.",
    solution: "Built a structured product category catalog, negative keyword filtering, and automated multi-step RFQ (Request for Quote) lead capture forms.",
  },
  {
    id: "urbankicks-streetwear",
    title: "UrbanKicks – Sneaker & Streetwear D2C E-Commerce Store",
    category: "E-Commerce",
    image: "/images/project-streetwear.png",
    client: "UrbanKicks Brands",
    techStack: ["Shopify", "Tailwind CSS", "Liquid", "Meta Ads CAPI"],
    metrics: "4.2x ROAS & 2.1s Mobile Speed",
    summary: "A high-energy dark-mode e-commerce storefront for limited-edition sneakers and urban fashion drops with real-time stock counters.",
    challenge: "Flash sale traffic spikes caused server lag and checkout timeouts during exclusive product drops.",
    solution: "Optimized asset compression, pre-loaded checkout assets, and implemented Meta Conversions API for accurate pixel attribution.",
  },
  {
    id: "uiux-consulting-system",
    title: "Enterprise SaaS Design System & UI Audit",
    category: "UI/UX Design",
    image: "/images/project-findash.png",
    client: "CloudScale Tech",
    techStack: ["Figma", "Design Tokens", "Tailwind CSS", "Component Library"],
    metrics: "98% Usability Score & 50% Faster Dev Sprints",
    summary: "Comprehensive UI/UX design system and accessibility overhaul for a multi-tenant enterprise cloud management software.",
    challenge: "Inconsistent component usage and accessibility violations across 20+ sub-pages.",
    solution: "Crafted a unified Figma design system, WCAG AA compliant contrast guidelines, and reusable React/Tailwind component primitives.",
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "UI/UX Design", "Web Development", "E-Commerce", "SaaS & Dashboards"];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <>
      <main className="bg-white py-12 sm:py-16 min-h-screen">
        <Container>
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a896]">
              PORTFOLIO & CASE STUDIES
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Featured Projects & Works
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              A curated selection of high-performing web applications, e-commerce stores, UI/UX design systems, and digital growth campaigns engineered for measurable impact.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#00a896] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-[#00a896] shadow-xs">
                    {project.category}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00a896] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Impact Metric Callout */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#00a896]">
                      {project.metrics}
                    </span>
                    <span className="text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Case Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-20 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Have a Similar Project in Mind?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Let's build a high-performing digital experience or e-commerce web application customized for your brand's growth targets.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#00a896] hover:bg-[#028090] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Your Project Inquiry
              </Link>
            </div>
          </div>
        </Container>
      </main>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors font-bold text-sm"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div className="space-y-1 pr-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00a896]">
                {selectedProject.category} · {selectedProject.client}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {selectedProject.title}
              </h3>
            </div>

            {/* Image Preview */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="600px"
                className="object-cover object-top"
              />
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-base">The Challenge</h4>
                <p>{selectedProject.challenge}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-base">The Solution</h4>
                <p>{selectedProject.solution}</p>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2 text-base">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Impact Metric */}
              <div className="p-4 rounded-xl bg-[#00a896]/10 border border-[#00a896]/30">
                <span className="text-xs font-bold text-[#00a896] uppercase tracking-wider block">
                  Measured Key Result
                </span>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {selectedProject.metrics}
                </p>
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
              >
                Close Preview
              </button>

              <Link
                href="/contact"
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-[#00a896] hover:bg-[#028090] text-white font-semibold text-xs transition-all shadow-sm"
              >
                Request Similar Project →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
