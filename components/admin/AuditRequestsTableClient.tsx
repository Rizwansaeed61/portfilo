"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";
import { Globe } from "lucide-react";

interface AuditRequestItem {
  id: string;
  name: string;
  email: string;
  website?: string | null;
  status: string;
  createdAt: string;
}

export function AuditRequestsTableClient({ auditRequests }: { auditRequests: AuditRequestItem[] }) {
  const columns = [
    {
      header: "Contact Name",
      accessor: (item: AuditRequestItem) => (
        <div>
          <p className="font-bold text-slate-900 font-serif">{item.name}</p>
          <p className="text-xs text-slate-500">{item.email}</p>
        </div>
      ),
    },
    {
      header: "Website URL",
      accessor: (item: AuditRequestItem) => (
        <span className="text-xs font-semibold text-teal-700 flex items-center gap-1">
          <Globe className="h-3.5 w-3.5 text-slate-400" />
          {item.website || "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: AuditRequestItem) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
            item.status === "NEW"
              ? "bg-amber-100 text-amber-800"
              : item.status === "COMPLETED"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Submitted Date",
      accessor: (item: AuditRequestItem) => (
        <span className="text-xs text-slate-500 font-medium">
          {formatDate(item.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={auditRequests}
      searchKey={(item) => `${item.name} ${item.email} ${item.website || ""}`}
      searchPlaceholder="Search audit requests..."
      emptyTitle="No Audit Requests Found"
      emptyDescription="Submitted website and ad audit requests will appear here automatically."
    />
  );
}
