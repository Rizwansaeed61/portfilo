"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: (item: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionText?: string;
  emptyActionHref?: string;
  onEmptyAction?: () => void;
  pageSize?: number;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  searchPlaceholder = "Search records...",
  searchKey,
  emptyTitle = "No records found",
  emptyDescription = "There are no entries available to display at this time.",
  emptyActionText,
  emptyActionHref,
  onEmptyAction,
  pageSize = 10,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter records
  const filteredData = data.filter((item) => {
    if (!searchTerm || !searchKey) return true;
    return searchKey(item).toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination math
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Table Controls (Search input) */}
      {searchKey && (
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-2 text-xs text-slate-900 bg-white placeholder-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredData.length} of {data.length} total records
          </div>
        </div>
      )}

      {/* Table Contents */}
      {paginatedData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`py-3 px-4 text-xs font-bold font-serif uppercase tracking-wider ${
                      col.className || ""
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 text-xs sm:text-sm">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  {columns.map((col, idx) => (
                    <td key={idx} className={`py-3.5 px-4 text-slate-800 ${col.className || ""}`}>
                      {col.accessor(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionText={emptyActionText}
          actionHref={emptyActionHref}
          onAction={onEmptyAction}
        />
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-600">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
