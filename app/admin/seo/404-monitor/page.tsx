"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ShieldAlert, Plus, CheckCircle2, RefreshCw } from "lucide-react";

export default function AdminSeo404MonitorPage() {
  const [logs, setLogs] = useState([
    { id: "log-1", url: "/old-blog-post", hits: 14, referrer: "Google Search", lastSeen: "2026-08-13T20:15:00Z" },
    { id: "log-2", url: "/services/v1-meta", hits: 6, referrer: "External Link", lastSeen: "2026-08-12T18:40:00Z" },
  ]);

  const [success, setSuccess] = useState("");

  const handleCreateRedirect = (url: string) => {
    setLogs(logs.filter((l) => l.url !== url));
    setSuccess(`Created 301 Redirect for ${url} -> /services!`);
    setTimeout(() => setSuccess(""), 3500);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="404 Error Log Monitor"
        subtitle="Track incoming requests resulting in 404 Not Found errors and quickly convert them into 301 redirects."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm font-serif">Logged 404 Requests</h3>
          <span className="text-xs font-mono text-slate-500 font-bold">{logs.length} Logged Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Requested 404 URL</th>
                <th className="p-4">Hits</th>
                <th className="p-4">Referrer Source</th>
                <th className="p-4">Last Seen</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {logs.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-red-700">{item.url}</td>
                  <td className="p-4 font-bold">{item.hits} Hits</td>
                  <td className="p-4 text-slate-600">{item.referrer}</td>
                  <td className="p-4 font-mono text-slate-500">{new Date(item.lastSeen).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleCreateRedirect(item.url)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-xs shadow-xs"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Quick 301 Redirect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
