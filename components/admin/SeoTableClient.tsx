"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";

interface SeoSettingItem {
  id: string;
  pagePath: string;
  seoTitle: string;
  metaDescription: string;
  noIndex: boolean;
  structuredDataEnabled: boolean;
}

export function SeoTableClient({ seoSettings }: { seoSettings: SeoSettingItem[] }) {
  const columns = [
    {
      header: "Page Path",
      accessor: (item: SeoSettingItem) => (
        <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
          {item.pagePath}
        </span>
      ),
    },
    {
      header: "SEO Meta Title",
      accessor: (item: SeoSettingItem) => (
        <div className="max-w-xs">
          <p className="font-bold text-slate-900 text-xs truncate">{item.seoTitle}</p>
          <p className="text-[11px] text-slate-500 truncate">{item.metaDescription}</p>
        </div>
      ),
    },
    {
      header: "Index / Schema",
      accessor: (item: SeoSettingItem) => (
        <div className="space-y-0.5 text-xs">
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${item.noIndex ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-800"}`}>
            {item.noIndex ? "NoIndex" : "Indexable"}
          </span>
          <span className="block text-[11px] text-slate-500 font-medium">
            JSON-LD: {item.structuredDataEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={seoSettings}
      searchKey={(item) => `${item.pagePath} ${item.seoTitle} ${item.metaDescription}`}
      searchPlaceholder="Search SEO pages..."
      emptyTitle="No Custom Page SEO Configurations"
      emptyDescription="Configure page-by-page SEO meta tags to override default global metadata."
    />
  );
}
