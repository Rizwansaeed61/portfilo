"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { ArrowRight, Check } from "lucide-react";

interface RedirectItem {
  id: string;
  oldUrl: string;
  newUrl: string;
  redirectType: number | string;
  active: boolean;
}

export function RedirectsTableClient({ redirects }: { redirects: RedirectItem[] }) {
  const columns = [
    {
      header: "Old URL Path",
      accessor: (item: RedirectItem) => (
        <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
          {item.oldUrl}
        </span>
      ),
    },
    {
      header: "Destination URL",
      accessor: (item: RedirectItem) => (
        <div className="flex items-center gap-2 text-xs">
          <ArrowRight className="h-3.5 w-3.5 text-teal-700 flex-shrink-0" />
          <span className="font-mono font-semibold text-teal-800">{item.newUrl}</span>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: (item: RedirectItem) => (
        <span className="text-xs font-bold uppercase text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
          {item.redirectType}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: RedirectItem) => (
        <span className={`inline-flex items-center gap-1 text-xs font-bold ${item.active ? "text-emerald-700" : "text-slate-400"}`}>
          <Check className="h-3.5 w-3.5" />
          {item.active ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={redirects}
      searchKey={(item) => `${item.oldUrl} ${item.newUrl}`}
      searchPlaceholder="Search redirects..."
      emptyTitle="No Redirect Rules Configured"
      emptyDescription="Create 301 or 302 redirect rules to preserve link equity and redirect legacy traffic."
    />
  );
}
