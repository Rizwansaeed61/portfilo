"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Check, Code } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  enableSchema: boolean;
  status: string;
  displayOrder: number;
}

export function FaqsTableClient({ faqs }: { faqs: FAQItem[] }) {
  const columns = [
    {
      header: "Question",
      accessor: (item: FAQItem) => (
        <div className="max-w-md">
          <p className="font-bold text-slate-900 font-serif leading-snug">{item.question}</p>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.answer}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item: FAQItem) => (
        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
          {item.category}
        </span>
      ),
    },
    {
      header: "Schema Enabled",
      accessor: (item: FAQItem) => (
        <span className="inline-flex items-center gap-1 text-xs text-teal-700 font-semibold">
          {item.enableSchema ? <Code className="h-3.5 w-3.5" /> : null}
          {item.enableSchema ? "JSON-LD On" : "Off"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: FAQItem) => (
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
    {
      header: "Order",
      accessor: (item: FAQItem) => (
        <span className="font-mono text-xs text-slate-600">{item.displayOrder}</span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={faqs}
      searchKey={(item) => `${item.question} ${item.answer} ${item.category}`}
      searchPlaceholder="Search questions..."
      emptyTitle="No FAQs Found"
      emptyDescription="Add frequently asked questions to answer client inquiries automatically."
    />
  );
}
