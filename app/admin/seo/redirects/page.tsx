"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ArrowRightLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminSeoRedirectsPage() {
  const [redirects, setRedirects] = useState([
    { id: "red-1", source: "/old-services", target: "/services", type: "301", active: true },
    { id: "red-2", source: "/contact-us", target: "/contact", type: "301", active: true },
  ]);

  const [newSource, setNewSource] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newType, setNewType] = useState("301");
  const [isAdding, setIsAdding] = useState(false);
  const [success, setSuccess] = useState("");

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSource.trim() || !newTarget.trim()) return;

    const newItem = {
      id: `red-${Date.now()}`,
      source: newSource.trim(),
      target: newTarget.trim(),
      type: newType,
      active: true,
    };

    setRedirects([newItem, ...redirects]);
    setNewSource("");
    setNewTarget("");
    setIsAdding(false);
    setSuccess("301 Redirect rule created successfully!");
    setTimeout(() => setSuccess(""), 3500);
  };

  const handleDelete = (id: string) => {
    setRedirects(redirects.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="URL Redirect Manager"
        subtitle="Configure 301 Permanent and 302 Temporary URL redirect rules to prevent 404 errors and preserve backlink SEO equity."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Add Redirect Modal Trigger */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Redirect Rule</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Source URL</th>
                <th className="p-4">Destination Target</th>
                <th className="p-4">Redirect Type</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {redirects.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900">{rule.source}</td>
                  <td className="p-4 font-mono text-teal-800 font-bold">{rule.target}</td>
                  <td className="p-4 font-bold">
                    <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded text-[10px]">
                      HTTP {rule.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      title="Delete Redirect"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-serif">Add Redirect Rule</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddRedirect} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Source Path</label>
                <input
                  type="text"
                  required
                  placeholder="/old-page"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Destination Target Path</label>
                <input
                  type="text"
                  required
                  placeholder="/new-page"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Redirect Code</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 bg-white font-bold"
                >
                  <option value="301">301 Permanent Redirect</option>
                  <option value="302">302 Temporary Redirect</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 font-bold text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-teal-700 text-white font-bold rounded-xl shadow-xs">
                  Save Redirect Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
