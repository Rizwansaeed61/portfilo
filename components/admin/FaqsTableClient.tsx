"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
import {
  Check,
  Code,
  Edit,
  Trash2,
  Plus,
  Save,
  HelpCircle,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

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
  const [faqList, setFaqList] = useState<FAQItem[]>(faqs);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDelete = async (id: string) => {
    setFaqList((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirmId(null);
    showNotification("FAQ question deleted successfully!");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFaqList((prev) =>
        prev.map((item) => (item.id === editingFaq.id ? editingFaq : item))
      );
      setEditingFaq(null);
      showNotification("FAQ question updated successfully!");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      header: "Question & Answer",
      accessor: (item: FAQItem) => (
        <div className="max-w-md space-y-1">
          <p className="font-bold text-slate-900 font-serif leading-snug">
            {item.question}
          </p>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.answer}
          </p>
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
      header: "Schema",
      accessor: (item: FAQItem) => (
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            item.enableSchema ? "text-teal-700" : "text-slate-400"
          }`}
        >
          {item.enableSchema && <Code className="h-3.5 w-3.5 text-teal-600" />}
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
        <span className="font-mono text-xs text-slate-600 font-bold">
          {item.displayOrder}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: FAQItem) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setEditingFaq(item)}
            className="p-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors"
            title="Edit Question"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDeleteConfirmId(item.id)}
            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
            title="Delete Question"
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

      {/* Main FAQ Data Table */}
      <DataTable
        columns={columns}
        data={faqList}
        searchKey={(item) => `${item.question} ${item.answer} ${item.category}`}
        searchPlaceholder="Search FAQ questions..."
        emptyTitle="No FAQs Found"
        emptyDescription="Add frequently asked questions to answer client inquiries automatically."
        emptyActionText="Write New FAQ"
        emptyActionHref="/admin/faqs/new"
      />

      {/* EDIT FAQ MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Edit FAQ Question
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Question Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Answer Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none resize-y leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Category Group
                  </label>
                  <input
                    type="text"
                    value={editingFaq.category}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingFaq.displayOrder}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        displayOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Publish Status
                  </label>
                  <select
                    value={editingFaq.status}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, status: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs text-slate-900 focus:border-teal-600 font-bold bg-white"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="modal-schema"
                  checked={editingFaq.enableSchema}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, enableSchema: e.target.checked })
                  }
                  className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
                />
                <label
                  htmlFor="modal-schema"
                  className="text-xs font-bold text-slate-700 flex items-center gap-1"
                >
                  <Code className="h-3.5 w-3.5 text-teal-700" />
                  Enable FAQPage JSON-LD Structured Data Schema
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="md" isLoading={saving}>
                  <Save className="h-4 w-4 mr-1.5" />
                  Save FAQ Changes
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
                Delete FAQ Question?
              </h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to remove this question from your public FAQ list?
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
                Delete FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
