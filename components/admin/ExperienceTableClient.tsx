"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { Calendar, Check, MapPin } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  isCurrent: boolean;
  isFeatured: boolean;
  active: boolean;
  displayOrder: number;
}

export function ExperienceTableClient({ experiences }: { experiences: ExperienceItem[] }) {
  const columns = [
    {
      header: "Role & Company",
      accessor: (item: ExperienceItem) => (
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900 font-serif">{item.role}</p>
            {item.isCurrent && (
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-teal-100 text-teal-800 rounded">
                Current
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-teal-700">{item.company}</p>
        </div>
      ),
    },
    {
      header: "Period & Location",
      accessor: (item: ExperienceItem) => (
        <div className="text-xs text-slate-600 space-y-0.5">
          <p className="flex items-center gap-1 font-medium">
            <Calendar className="h-3 w-3 text-slate-400" />
            {item.period}
          </p>
          <p className="flex items-center gap-1 text-[11px] text-slate-500">
            <MapPin className="h-3 w-3 text-slate-400" />
            {item.location}
          </p>
        </div>
      ),
    },
    {
      header: "Featured",
      accessor: (item: ExperienceItem) => (
        <span className="text-xs font-semibold text-slate-700">
          {item.isFeatured ? "Yes (Expanded)" : "No (Compact)"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: ExperienceItem) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            item.active
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-slate-100 text-slate-600 border border-slate-300"
          }`}
        >
          <Check className="h-3 w-3" />
          {item.active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Order",
      accessor: (item: ExperienceItem) => (
        <span className="font-mono text-xs text-slate-600">{item.displayOrder}</span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={experiences}
      searchKey={(item) => `${item.role} ${item.company} ${item.location}`}
      searchPlaceholder="Search career roles..."
      emptyTitle="No Experience Roles Found"
      emptyDescription="Add professional experience entries to display on the career timeline."
    />
  );
}
