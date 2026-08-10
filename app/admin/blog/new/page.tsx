"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Save,
  ArrowLeft,
  FileText,
  Search,
  Sparkles,
  Tag,
  Folder,
} from "lucide-react";

export default function AdminNewBlogPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    directAnswer: "",
    content: "",
    featuredImage: "/images/blog-placeholder.png",
    readTime: "5 min read",
    categoryId: "cat-performance-marketing",
    tags: "Meta Ads, ROAS Scaling, Conversion Optimization",
    status: "PUBLISHED",
    featured: false,
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: "",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : generateSlug(val),
      seoTitle: prev.seoTitle ? prev.seoTitle : val,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/blog");
      }, 1200);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          title="Create New Blog Article"
          subtitle="Publish performance marketing case studies, GEO search guides, and e-commerce scaling strategies."
        />
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>New article published successfully! Redirecting to All Articles...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Main Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <FileText className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Article Content</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g., How We Scaled Meta Ads to AED 4.2M Revenue in the UAE"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-semibold text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Short Excerpt / Summary
            </label>
            <textarea
              rows={2}
              placeholder="Brief summary displayed on the blog archive and card teasers..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Direct Answer (GEO / AI Overview Box)</span>
              <span className="text-[10px] text-teal-700 font-bold">Optimized for ChatGPT & Perplexity</span>
            </label>
            <textarea
              rows={2}
              placeholder="Direct concise answer statement for AI Search Engines & Snippets..."
              value={formData.directAnswer}
              onChange={(e) => setFormData({ ...formData, directAnswer: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Article Body Content (Markdown supported)
            </label>
            <textarea
              rows={12}
              required
              placeholder="Write or paste your article content here in Markdown format..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none resize-y leading-relaxed"
            />
          </div>
        </div>

        {/* Media & Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Folder className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">Category & Tags</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none bg-white font-medium"
                >
                  <option value="cat-performance-marketing">Performance Marketing & Meta Ads</option>
                  <option value="cat-shopify">Shopify & E-commerce CRO</option>
                  <option value="cat-seo-geo">SEO & Generative AI Search</option>
                  <option value="cat-lead-gen">B2B Lead Generation</option>
                  <option value="cat-case-studies">Client Case Studies</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
                  />
                  <label htmlFor="featured" className="text-xs font-bold text-slate-700">
                    Feature on Blog Homepage
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-700">Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-slate-900 focus:border-teal-600 font-bold"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Search className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">SEO & Social Meta</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Featured Cover Image
                </label>
                <ImageUploader
                  value={formData.featuredImage}
                  onChange={(url) => setFormData({ ...formData, featuredImage: url })}
                  label="Upload Featured Image"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Custom SEO Title Tag
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Defaults to article title"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Recommended length: 140 - 160 characters"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Link
            href="/admin/blog"
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </Link>
          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Publish Article
          </Button>
        </div>
      </form>
    </div>
  );
}
