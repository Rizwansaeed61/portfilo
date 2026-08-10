"use client";

import React from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { Check, Edit, Eye, X } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  status: string;
  featured: boolean;
  displayOrder: number;
}

export function ServicesTableClient({ services }: { services: ServiceItem[] }) {
  const columns = [
    {
      header: "Service Title",
      accessor: (item: ServiceItem) => (
        <div>
          <p className="font-bold text-slate-900 font-serif">{item.title}</p>
          <p className="text-[11px] text-slate-500 font-mono">/services/{item.slug}</p>
        </div>
      ),
    },
    {
      header: "Icon",
      accessor: (item: ServiceItem) => (
        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-semibold rounded">
          {item.iconName}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: ServiceItem) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            item.status === "PUBLISHED"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-slate-100 text-slate-600 border border-slate-300"
          }`}
        >
          {item.status === "PUBLISHED" ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          {item.status}
        </span>
      ),
    },
    {
      header: "Featured",
      accessor: (item: ServiceItem) => (
        <span className="text-xs font-semibold text-slate-700">
          {item.featured ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Display Order",
      accessor: (item: ServiceItem) => (
        <span className="font-mono text-xs text-slate-600">{item.displayOrder}</span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: ServiceItem) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/services/${item.slug}`}
            target="_blank"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-teal-700"
            title="View on website"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/services/${item.id}`}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-teal-700"
            title="Edit Service"
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
      data={services}
      searchKey={(item) => `${item.title} ${item.slug}`}
      searchPlaceholder="Search services..."
      emptyTitle="No Services Found"
      emptyDescription="Create your first growth service offering to display on the public website."
      emptyActionText="Create Service"
      emptyActionHref="/admin/services/new"
    />
  );
}
