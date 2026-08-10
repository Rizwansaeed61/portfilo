"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Check } from "lucide-react";

interface ResultItem {
  id: string;
  metric: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
}

export function ResultsTableClient({ results }: { results: ResultItem[] }) {
  const columns = [
    {
      header: "Result Metric",
      accessor: (item: ResultItem) => (
        <span className="font-extrabold text-teal-700 text-lg font-serif">{item.metric}</span>
      ),
    },
    {
      header: "Title & Subtitle",
      accessor: (item: ResultItem) => (
        <div>
          <p className="font-bold text-slate-900 font-serif">{item.title}</p>
          <p className="text-xs text-slate-500">{item.subtitle}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item: ResultItem) => (
        <span className="text-xs uppercase font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
          {item.category}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: ResultItem) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            item.status === "PUBLISHED"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-slate-100 text-slate-600 border border-slate-300"
          }`}
        >
          <Check className="h-3 w-3" />
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={results}
      searchKey={(item) => `${item.title} ${item.metric} ${item.category}`}
      searchPlaceholder="Search results..."
      emptyTitle="No Results Found"
      emptyDescription="Add verified performance metrics to display on the trust bar."
    />
  );
}
