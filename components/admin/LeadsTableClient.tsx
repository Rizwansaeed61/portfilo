"use client";

import React from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";
import { Eye, MapPin } from "lucide-react";

interface LeadItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  requiredService: string;
  monthlyBudget: string;
  country: string;
  company?: string | null;
  status: string;
  createdAt: string;
}

export function LeadsTableClient({ leads }: { leads: LeadItem[] }) {
  const columns = [
    {
      header: "Lead Contact",
      accessor: (item: LeadItem) => (
        <div>
          <p className="font-bold text-slate-900 font-serif">{item.fullName}</p>
          <p className="text-xs text-slate-500 font-medium">{item.email}</p>
          <p className="text-[11px] text-slate-400">{item.phone}</p>
        </div>
      ),
    },
    {
      header: "Service & Budget",
      accessor: (item: LeadItem) => (
        <div>
          <span className="inline-block font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded text-xs border border-teal-200">
            {item.requiredService}
          </span>
          <p className="text-[11px] text-slate-600 font-medium mt-0.5">{item.monthlyBudget}</p>
        </div>
      ),
    },
    {
      header: "Country & Company",
      accessor: (item: LeadItem) => (
        <div className="text-xs text-slate-700">
          <p className="font-semibold flex items-center gap-1">
            <MapPin className="h-3 w-3 text-slate-400" />
            {item.country}
          </p>
          <p className="text-[11px] text-slate-500">{item.company || "N/A"}</p>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (item: LeadItem) => (
        <span className="text-xs text-slate-500 font-medium">
          {formatDate(item.createdAt)}
        </span>
      ),
    },
    {
      header: "Pipeline Status",
      accessor: (item: LeadItem) => {
        const statusColors: Record<string, string> = {
          NEW: "bg-amber-100 text-amber-800 border-amber-300",
          CONTACTED: "bg-blue-100 text-blue-800 border-blue-300",
          QUALIFIED: "bg-indigo-100 text-indigo-800 border-indigo-300",
          PROPOSAL_SENT: "bg-purple-100 text-purple-800 border-purple-300",
          WON: "bg-emerald-100 text-emerald-800 border-emerald-300",
          LOST: "bg-slate-100 text-slate-600 border-slate-300",
          SPAM: "bg-red-100 text-red-800 border-red-300",
        };

        return (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
              statusColors[item.status] || "bg-slate-100 text-slate-700"
            }`}
          >
            {item.status.replace("_", " ")}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: (item: LeadItem) => (
        <Link
          href={`/admin/leads/${item.id}`}
          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Details</span>
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={leads}
      searchKey={(item) => `${item.fullName} ${item.email} ${item.country} ${item.requiredService} ${item.company || ""}`}
      searchPlaceholder="Search leads by name, email, country, or service..."
      emptyTitle="No Contact Inquiries Received"
      emptyDescription="Submitted form inquiries will appear here automatically."
    />
  );
}
