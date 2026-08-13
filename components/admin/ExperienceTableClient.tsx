"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import {
  Calendar,
  Check,
  MapPin,
  Edit,
  Trash2,
  Save,
  Briefcase,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

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
  const [expList, setExpList] = useState<ExperienceItem[]>(experiences);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDelete = async (id: string) => {
    setExpList((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirmId(null);
    showNotification("Experience role entry deleted successfully!");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setExpList((prev) =>
        prev.map((item) => (item.id === editingExp.id ? editingExp : item))
      );
      setEditingExp(null);
      showNotification("Experience role entry updated successfully!");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      header: "Role & Company",
      accessor: (item: ExperienceItem) => (
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-slate-900 font-serif">{item.role}</p>
            {item.isCurrent && (
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-teal-100 text-teal-800 rounded border border-teal-200">
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
        <span className="font-mono text-xs text-slate-600 font-bold">{item.displayOrder}</span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: ExperienceItem) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setEditingExp(item)}
            className="p-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors"
            title="Edit Role Entry"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDeleteConfirmId(item.id)}
            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
            title="Delete Role Entry"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Experience Data Table */}
      <DataTable
        columns={columns}
        data={expList}
        searchKey={(item) => `${item.role} ${item.company} ${item.location}`}
        searchPlaceholder="Search career roles..."
        emptyTitle="No Experience Roles Found"
        emptyDescription="Add professional experience entries to display on the career timeline."
        emptyActionText="Add New Role"
        emptyActionHref="/admin/experience/new"
      />

      {/* EDIT EXPERIENCE MODAL */}
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Edit Experience Role
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Job Title / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.role}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, role: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Company / Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.company}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, company: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Time Period
                  </label>
                  <input
                    type="text"
                    value={editingExp.period}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, period: e.target.value })
                    }
                    placeholder="e.g. October 2024 – Present"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Location / Region
                  </label>
                  <input
                    type="text"
                    value={editingExp.location}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, location: e.target.value })
                    }
                    placeholder="e.g. Dubai Marina, UAE"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingExp.displayOrder}
                    onChange={(e) =>
                      setEditingExp({
                        ...editingExp,
                        displayOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Featured Layout
                  </label>
                  <select
                    value={editingExp.isFeatured ? "true" : "false"}
                    onChange={(e) =>
                      setEditingExp({
                        ...editingExp,
                        isFeatured: e.target.value === "true",
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs text-slate-900 focus:border-teal-600 font-medium bg-white"
                  >
                    <option value="true">Yes (Expanded)</option>
                    <option value="false">No (Compact)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Status
                  </label>
                  <select
                    value={editingExp.active ? "true" : "false"}
                    onChange={(e) =>
                      setEditingExp({
                        ...editingExp,
                        active: e.target.value === "true",
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs text-slate-900 focus:border-teal-600 font-bold bg-white"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="modal-current"
                  checked={editingExp.isCurrent}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, isCurrent: e.target.checked })
                  }
                  className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
                />
                <label
                  htmlFor="modal-current"
                  className="text-xs font-bold text-slate-700"
                >
                  Mark as Current Role (Present)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="md" isLoading={saving}>
                  <Save className="h-4 w-4 mr-1.5" />
                  Save Role Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative animate-fade-in border border-slate-200 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base font-serif">
                Delete Role Entry?
              </h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to delete this professional experience entry?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
