"use client";

import React from "react";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";
import { User } from "lucide-react";

interface ActivityLogItem {
  id: string;
  timestamp: string;
  userName: string;
  action: string;
  entity: string;
  details?: string | null;
}

export function ActivityTableClient({ logs }: { logs: ActivityLogItem[] }) {
  const columns = [
    {
      header: "Timestamp",
      accessor: (item: ActivityLogItem) => (
        <span className="text-xs text-slate-500 font-mono font-medium">
          {formatDate(item.timestamp)}
        </span>
      ),
    },
    {
      header: "User",
      accessor: (item: ActivityLogItem) => (
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
          <User className="h-3 w-3 text-slate-400" />
          {item.userName}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (item: ActivityLogItem) => (
        <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 uppercase">
          {item.action}
        </span>
      ),
    },
    {
      header: "Entity & Details",
      accessor: (item: ActivityLogItem) => (
        <div>
          <p className="text-xs font-bold text-slate-800">{item.entity}</p>
          {item.details && <p className="text-[11px] text-slate-500">{item.details}</p>}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={logs}
      searchKey={(item) => `${item.userName} ${item.action} ${item.entity} ${item.details || ""}`}
      searchPlaceholder="Search audit logs..."
      emptyTitle="No Activity Logs Available"
      emptyDescription="System security events and admin actions will appear here."
    />
  );
}
