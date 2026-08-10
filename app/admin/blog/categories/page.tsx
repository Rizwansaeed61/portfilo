"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import {
  FolderTree,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Edit,
  FileText,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
}

export default function AdminBlogCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cat-1",
      name: "Performance Marketing & Meta Ads",
      slug: "performance-marketing",
      description: "Proven tactics for Meta Ads, Google PPC, and ROAS scaling strategies.",
      articleCount: 14,
    },
    {
      id: "cat-2",
      name: "Shopify & E-commerce CRO",
      slug: "shopify-cro",
      description: "Conversion rate optimization, store design, and custom Liquid developments.",
      articleCount: 9,
    },
    {
      id: "cat-3",
      name: "SEO & Generative AI Search",
      slug: "seo-geo",
      description: "Ranking strategies for Google Search and Generative Engine Optimization (GEO).",
      articleCount: 7,
    },
    {
      id: "cat-4",
      name: "B2B Lead Generation",
      slug: "lead-generation",
      description: "Funnel design, cold email infrastructure, and high-ticket B2B client acquisition.",
      articleCount: 5,
    },
    {
      id: "cat-5",
      name: "Case Studies & Verified Proof",
      slug: "case-studies",
      description: "In-depth breakdowns of client campaigns in the UAE, USA, and UK.",
      articleCount: 11,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", description: "" });
  const [success, setSuccess] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    const created: Category = {
      id: `cat-${Date.now()}`,
      name: newCat.name.trim(),
      slug: newCat.slug ? newCat.slug.trim() : generateSlug(newCat.name),
      description: newCat.description.trim(),
      articleCount: 0,
    };

    setCategories([...categories, created]);
    setNewCat({ name: "", slug: "", description: "" });
    setShowAddForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const columns = [
    {
      header: "Category Name",
      accessor: (item: Category) => (
        <div>
          <p className="font-bold text-slate-900 font-serif">{item.name}</p>
          <p className="text-[11px] text-slate-500 font-mono">/insights/category/{item.slug}</p>
        </div>
      ),
    },
    {
      header: "Description",
      accessor: (item: Category) => (
        <p className="text-xs text-slate-600 max-w-sm line-clamp-2">{item.description}</p>
      ),
    },
    {
      header: "Articles",
      accessor: (item: Category) => (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
          <FileText className="h-3 w-3" />
          {item.articleCount} Articles
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: Category) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDelete(item.id)}
            className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
            title="Delete Category"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          title="Blog Categories Management"
          subtitle="Organize blog articles and insights into strategic content clusters."
          actionText={showAddForm ? "Close Form" : "Add New Category"}
          actionIcon={Plus}
          onAction={() => setShowAddForm(!showAddForm)}
        />
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Category created successfully!</span>
        </div>
      )}

      {showAddForm && (
        <form
          onSubmit={handleAddCategory}
          className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-2xs animate-fade-in"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FolderTree className="h-5 w-5 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900 font-serif">Add New Category</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Conversion Rate Optimization"
                value={newCat.name}
                onChange={(e) =>
                  setNewCat({
                    ...newCat,
                    name: e.target.value,
                    slug: newCat.slug ? newCat.slug : generateSlug(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Slug
              </label>
              <input
                type="text"
                placeholder="cro-optimization"
                value={newCat.slug}
                onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Description
            </label>
            <input
              type="text"
              placeholder="Short category description for archive header..."
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Save Category
            </Button>
          </div>
        </form>
      )}

      <DataTable
        columns={columns}
        data={categories}
        searchKey={(item) => `${item.name} ${item.slug}`}
        searchPlaceholder="Search categories..."
        emptyTitle="No Categories Found"
        emptyDescription="Create categories to organize your blog articles."
      />
    </div>
  );
}
