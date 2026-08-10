"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { defaultProjects, ProjectItem } from "@/content/projects-config";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  Sparkles,
  X,
  Star,
  Eye,
} from "lucide-react";

export default function AdminProjectsCMSPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState<ProjectItem>({
    id: "",
    title: "",
    category: "Meta Ads & Paid Social",
    image: "/images/project-findash.png",
    client: "",
    country: "UAE 🇦🇪",
    metric: "",
    description: "",
    liveUrl: "",
    featured: true,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("site_projects_data");
      if (saved) {
        setProjects(JSON.parse(saved));
      }
    } catch {
      // Fallback to defaults
    }
  }, []);

  const saveToStorage = (updatedList: ProjectItem[]) => {
    setProjects(updatedList);
    try {
      localStorage.setItem("site_projects_data", JSON.stringify(updatedList));
    } catch {
      // Ignore storage errors
    }
  };

  const handleStartAdd = () => {
    setFormData({
      id: `proj-${Date.now()}`,
      title: "",
      category: "Meta Ads & Paid Social",
      image: "/images/project-findash.png",
      client: "",
      country: "UAE 🇦🇪",
      metric: "",
      description: "",
      liveUrl: "",
      featured: true,
    });
    setIsAddingNew(true);
    setEditingId(null);
  };

  const handleStartEdit = (proj: ProjectItem) => {
    setFormData({ ...proj });
    setEditingId(proj.id);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id);
      saveToStorage(updated);
      setSuccessMsg("Project deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    let updated: ProjectItem[];
    if (isAddingNew) {
      updated = [formData, ...projects];
      setSuccessMsg("New Project added successfully!");
    } else {
      updated = projects.map((p) => (p.id === formData.id ? formData : p));
      setSuccessMsg("Project details updated successfully!");
    }

    saveToStorage(updated);
    setIsAddingNew(false);
    setEditingId(null);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Projects & Portfolio Showcase CMS"
          subtitle="Add new portfolio projects, upload project mockups/photos, edit metrics, and delete items from your live website."
        />
        <Button variant="primary" size="md" onClick={handleStartAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add / Edit Form Drawer Box */}
      {(isAddingNew || editingId) && (
        <div className="bg-white rounded-2xl border-2 border-teal-600 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                {isAddingNew ? "Add New Portfolio Project" : "Edit Project Details"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                setEditingId(null);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSaveForm} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Title */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Marina Byblos Hotel – Luxury Suite Campaign"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category Tag *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                >
                  <option value="Meta Ads & Paid Social">Meta Ads & Paid Social</option>
                  <option value="Google Ads & Intent PPC">Google Ads & Intent PPC</option>
                  <option value="Shopify & Liquid Coding">Shopify & Liquid Coding</option>
                  <option value="B2B Lead Generation">B2B Lead Generation</option>
                  <option value="Hospitality & Lead Gen">Hospitality & Lead Gen</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              {/* Client Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Marina Byblos Hotel"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              {/* Key Metric / Result Highlight */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Result Highlight / Metric *
                </label>
                <input
                  type="text"
                  required
                  value={formData.metric}
                  onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  placeholder="e.g. +185% Direct Bookings or 3.8x ROAS"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold text-teal-700"
                />
              </div>

              {/* Country / Target Market */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Country / Market Location
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Dubai, UAE 🇦🇪"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              {/* Live Website URL */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Live Website Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.liveUrl || ""}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Direct Image Uploader */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Project Image / Screenshot * (Direct Upload from Computer)
              </label>
              <ImageUploader
                value={formData.image}
                onChange={(newUrl) => setFormData({ ...formData, image: newUrl })}
              />
            </div>

            {/* Project Overview Description */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Short Project Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain campaign setup, strategy, or key outcomes..."
                className="w-full rounded-xl border border-slate-300 p-4 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featuredToggle"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
              <label htmlFor="featuredToggle" className="text-xs font-bold text-slate-800">
                Show on Homepage (Featured Selected Work)
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                <Save className="h-4 w-4 mr-2" />
                {isAddingNew ? "Save New Project" : "Update Project"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[16/10] w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              {proj.featured && (
                <div className="absolute top-3 left-3 bg-teal-700 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Homepage Featured
                </div>
              )}
            </div>

            {/* Body Info */}
            <div className="p-5 space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  {proj.category}
                </span>
                <span className="text-xs font-bold text-slate-500">{proj.country}</span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 font-serif leading-tight">
                {proj.title}
              </h3>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                <span>{proj.metric}</span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>
            </div>

            {/* Card Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              {proj.liveUrl && proj.liveUrl !== "#" ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Visit Link
                </a>
              ) : (
                <span className="text-[11px] font-semibold text-slate-400">Direct Case Study</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStartEdit(proj)}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-600 transition-colors shadow-2xs"
                  title="Edit Project"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-red-700 hover:border-red-600 transition-colors shadow-2xs"
                  title="Delete Project"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
