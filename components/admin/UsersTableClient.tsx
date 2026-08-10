"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin?: string | null;
}

export function UsersTableClient({ users }: { users: UserItem[] }) {
  const columns = [
    {
      header: "User Details",
      accessor: (item: UserItem) => (
        <div>
          <p className="font-bold text-slate-900 font-serif">{item.name}</p>
          <p className="text-xs text-slate-500">{item.email}</p>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: (item: UserItem) => (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 uppercase">
          <ShieldCheck className="h-3 w-3 text-teal-700" />
          {item.role}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (item: UserItem) => (
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
          {item.status}
        </span>
      ),
    },
    {
      header: "Last Login",
      accessor: (item: UserItem) => (
        <span className="text-xs text-slate-500 font-medium">
          {item.lastLogin ? formatDate(item.lastLogin) : "Never"}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey={(item) => `${item.name} ${item.email} ${item.role}`}
      searchPlaceholder="Search admin users..."
      emptyTitle="No Admin Users Found"
      emptyDescription="Administrator accounts will be listed here."
    />
  );
}
