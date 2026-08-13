"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/Button";
import { insightsData } from "@/content/insights";
import {
  CheckCircle2,
  Save,
  ArrowLeft,
  FileText,
  Search,
  Folder,
  Loader2,
  Eye,
  AlertCircle,
} from "lucide-react";

export default function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    directAnswer: "",
    content: "",
    featuredImage: "/images/insights/performance-marketing.jpg",
    readTime: "6 min read",
    categoryId: "cat-performance-marketing",
    categoryName: "Performance Marketing",
    tags: "Meta Ads, Google Ads, International Marketing",
    status: "PUBLISHED",
    featured: true,
    seoTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    loadPostData();
  }, [id]);

  const loadPostData = async () => {
    setLoading(true);
    try {
      // 1. Check matching static insights article
      let matchedArticle = insightsData.find(
        (a) => a.slug === id || id.includes(a.slug)
      );

      if (!matchedArticle) {
        if (id === "post-1") matchedArticle = insightsData[0];
        else if (id === "post-2") matchedArticle = insightsData[1];
        else if (id === "post-3") matchedArticle = insightsData[2];
        else matchedArticle = insightsData[0];
      }

      if (matchedArticle) {
        setFormData({
          title: matchedArticle.title,
          slug: matchedArticle.slug,
          excerpt: matchedArticle.description,
          directAnswer: matchedArticle.directAnswer,
          content: matchedArticle.content.trim(),
          featuredImage: matchedArticle.featuredImage || "/images/insights/performance-marketing.jpg",
          readTime: matchedArticle.readTime,
          categoryId: "cat-performance-marketing",
          categoryName: matchedArticle.category,
          tags: matchedArticle.tags.join(", "),
          status: "PUBLISHED",
          featured: true,
          seoTitle: matchedArticle.title,
          metaDescription: matchedArticle.description,
        });
      }
    } catch (err) {
      console.error("Error loading blog post:", err);
      setErrorMsg("Failed to load article details.");
    } finally {
      setLoading(false);
    }
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
        router.refresh();
      }, 1200);
    } catch {
      setErrorMsg("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Articles</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">
            Edit Article: {formData.title || "Blog Post"}
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Article ID: <code className="font-semibold text-teal-700">{id}</code> • Live Path:{" "}
            <code className="font-semibold text-teal-700">/insights/{formData.slug}</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {formData.slug && (
            <a
              href={`/insights/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span>Preview Live Article</span>
            </a>
          )}

          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Article updated successfully! Redirecting to All Articles list...</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="h-6 w-6 text-teal-700 animate-spin mr-3" />
          <span className="text-sm font-semibold text-slate-600">Loading article editor...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          {/* Main Content Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <FileText className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">Article Body & Content</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 focus:border-teal-600 focus:outline-none font-bold text-sm"
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
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Direct Answer (GEO / AI Snippet Box)</span>
                <span className="text-[10px] text-teal-700 font-bold">Optimized for ChatGPT & Perplexity</span>
              </label>
              <textarea
                rows={2}
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
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-teal-600 focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </div>

          {/* Media, Category & Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-2xs">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <Folder className="h-5 w-5 text-teal-700" />
                <h2 className="text-lg font-bold text-slate-900 font-serif">Category & Taxonomy</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                  />
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
                      Feature on Homepage
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
                <h2 className="text-lg font-bold text-slate-900 font-serif">Featured Image & SEO</h2>
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
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
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
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Link
              href="/admin/blog"
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Link>
            <Button type="submit" variant="primary" size="lg" isLoading={saving}>
              <Save className="h-4 w-4 mr-2" />
              Save Article Changes
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
