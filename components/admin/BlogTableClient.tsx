"use client";

import React from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";
import { Check, Clock, Edit, Eye } from "lucide-react";

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  updatedAt: string | Date;
  excerpt?: string;
  category?: { name: string } | null;
}

export function BlogTableClient({ posts }: { posts: BlogPostItem[] }) {
  const columns = [
    {
      header: "Article Title & Slug",
      accessor: (item: BlogPostItem) => (
        <div className="max-w-md">
          <p className="font-bold text-slate-900 font-serif leading-snug line-clamp-1">
            {item.title}
          </p>
          <p className="text-[11px] text-slate-500 font-mono">/insights/{item.slug}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item: BlogPostItem) => (
        <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
          {item.category?.name || "Uncategorized"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: BlogPostItem) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            item.status === "PUBLISHED"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-amber-100 text-amber-800 border border-amber-300"
          }`}
        >
          <Check className="h-3 w-3" />
          {item.status}
        </span>
      ),
    },
    {
      header: "Last Updated",
      accessor: (item: BlogPostItem) => (
        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <Clock className="h-3 w-3 text-slate-400" />
          {formatDate(typeof item.updatedAt === "string" ? item.updatedAt : item.updatedAt.toISOString())}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: BlogPostItem) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/insights/${item.slug}`}
            target="_blank"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-teal-700"
            title="View live post"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/blog/${item.id}/edit`}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-teal-700"
            title="Edit post"
          >
            <Edit className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={posts}
      searchKey={(item) => `${item.title} ${item.slug} ${item.excerpt || ""}`}
      searchPlaceholder="Search articles..."
      emptyTitle="No Blog Posts Found"
      emptyDescription="Create your first SEO & AI-search optimized insight article."
      emptyActionText="Write New Post"
      emptyActionHref="/admin/blog/new"
    />
  );
}
