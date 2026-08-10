"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { defaultProjects, ProjectItem } from "@/content/projects-config";
import { Sparkles, ArrowRight, ExternalLink, X, CheckCircle2, Globe, TrendingUp, Layers, Eye } from "lucide-react";

export function SelectedProjects() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(defaultProjects);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("site_projects_data");
      if (saved) {
        setProjectsList(JSON.parse(saved));
      }
    } catch {
      // Fallback to default list
    }
  }, []);

  // Filter Categories
  const categories = [
    { id: "All", label: "All Projects" },
    { id: "Hospitality", label: "Hospitality" },
    { id: "B2B", label: "B2B Lead Gen" },
    { id: "Shopify", label: "Shopify & E-Comm" },
  ];

  const filteredProjects = projectsList.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Hospitality") return project.category.toLowerCase().includes("hospitality");
    if (activeCategory === "B2B") return project.category.toLowerCase().includes("b2b");
    if (activeCategory === "Shopify") return project.category.toLowerCase().includes("shopify") || project.category.toLowerCase().includes("e-commerce");
    return true;
  });

  return (
    <section id="projects" className="bg-slate-50/90 py-16 sm:py-24 border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Grid Pattern & Vignette Mask */}
      <div className="absolute inset-0 bg-grid-pattern mask-radial-fade opacity-65 pointer-events-none" />

      {/* Animated Ambient Glowing Orbs */}
      <div className="absolute -top-24 -left-28 w-[550px] h-[550px] bg-gradient-to-tr from-teal-400/20 via-emerald-300/15 to-cyan-400/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 -right-36 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-400/20 via-teal-300/15 to-emerald-400/15 rounded-full blur-3xl pointer-events-none animate-float-delayed" />
      <div className="absolute -bottom-28 left-1/3 w-[450px] h-[450px] bg-gradient-to-t from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00a896] bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00a896]" />
              <span>FEATURED WORK & CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
              Selected Growth Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Proven campaign & e-commerce store executions delivered across UAE, USA, and UK clients with verified ROI impact.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-[#00a896] to-[#028090] hover:from-[#028090] hover:to-[#05668d] px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 self-start md:self-auto shrink-0"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const count = cat.id === "All"
              ? projectsList.length
              : projectsList.filter((p) => {
                  if (cat.id === "Hospitality") return p.category.toLowerCase().includes("hospitality");
                  if (cat.id === "B2B") return p.category.toLowerCase().includes("b2b");
                  if (cat.id === "Shopify") return p.category.toLowerCase().includes("shopify") || p.category.toLowerCase().includes("e-commerce");
                  return true;
                }).length;

            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-2xs"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl card-glow-teal transition-all duration-300 flex flex-col hover:-translate-y-2"
            >
              {/* Browser Mockup Frame Header */}
              <div className="bg-slate-100/90 px-3.5 py-2.5 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block" />
                </div>
                <div className="bg-white/80 border border-slate-200/70 rounded-md px-3 py-0.5 text-[10px] font-mono text-slate-500 flex items-center gap-1 max-w-[170px] truncate">
                  <Globe className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                  <span className="truncate">{project.domain || project.liveUrl?.replace("https://", "") || "live-preview.com"}</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedModalProject(project)}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Location Badge */}
                <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 shadow-sm flex items-center gap-1">
                  <span>{project.country}</span>
                </span>

                {/* Quick View Overlay Button */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-3.5 h-3.5 text-[#00a896]" />
                    <span>View Case Study</span>
                  </span>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00a896] bg-teal-50/80 px-2 py-0.5 rounded border border-teal-100">
                      {project.category}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setSelectedModalProject(project)}
                    className="text-lg font-extrabold text-slate-900 font-serif leading-snug group-hover:text-[#00a896] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Strategy Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metric Highlight & Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/80 shadow-2xs">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{project.metric}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedModalProject(project)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    {project.liveUrl && project.liveUrl !== "#" ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#00a896] hover:text-[#028090] bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedModalProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#00a896] hover:text-[#028090] bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Case Study Modal Popup */}
      {selectedModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedModalProject(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Frame */}
            <div className="bg-slate-950 p-6 text-white rounded-t-3xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00a896] bg-teal-950/80 border border-teal-800/60 px-3 py-1 rounded-full inline-block mb-3">
                {selectedModalProject.category} • {selectedModalProject.country}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif leading-tight">
                {selectedModalProject.title}
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-xl">
                Client: <span className="text-white font-semibold">{selectedModalProject.client}</span>
              </p>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              {/* Metric Hero Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Primary Key Metric Achieved</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-950 font-serif">
                    {selectedModalProject.metric}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-emerald-700" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Executive Summary</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedModalProject.description}
                </p>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedModalProject.challenge || "Low conversion rate and high acquisition costs across existing advertising channels."}
                  </p>
                </div>

                <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-100 space-y-2">
                  <div className="flex items-center gap-2 text-[#00a896] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Strategic Solution</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedModalProject.solution || "Full-funnel campaign restructuring, localized search strategy, and conversion rate optimization."}
                  </p>
                </div>
              </div>

              {/* Verified Results List */}
              {selectedModalProject.results && selectedModalProject.results.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Verified Impact & Key Deliverables</h4>
                  <div className="space-y-2">
                    {selectedModalProject.results.map((res, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-800">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-6 bg-slate-50 border-t border-slate-200/80 rounded-b-3xl flex items-center justify-between gap-4">
              {selectedModalProject.liveUrl && selectedModalProject.liveUrl !== "#" ? (
                <a
                  href={selectedModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white bg-[#00a896] hover:bg-[#028090] px-5 py-3 rounded-xl transition-all shadow-md"
                >
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-xs text-slate-500 font-medium">Internal / NDA Client Project Execution</span>
              )}

              <button
                onClick={() => setSelectedModalProject(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
