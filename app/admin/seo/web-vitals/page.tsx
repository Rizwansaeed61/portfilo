"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { initialCoreWebVitals } from "@/lib/seo/storage";
import { Activity, Smartphone, Monitor, ShieldCheck, Zap, Globe } from "lucide-react";

export default function AdminSeoWebVitalsPage() {
  const [deviceFilter, setDeviceFilter] = useState<"ALL" | "MOBILE" | "DESKTOP">("ALL");

  const filteredMetrics = initialCoreWebVitals.filter((item) => {
    if (deviceFilter !== "ALL" && item.device !== deviceFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Core Web Vitals & PageSpeed Insights"
        subtitle="Monitor real-world user experience metrics: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift)."
      />

      <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 flex items-center justify-between text-xs font-semibold text-teal-900">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-teal-700" />
          <span>Data Source: Google PageSpeed Insights & CrUX Field Performance Data</span>
        </div>
        <span className="bg-teal-100 text-teal-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-teal-300">
          Source: PageSpeed / CrUX
        </span>
      </div>

      {/* Threshold Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">LCP (Load Speed)</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Good (&lt; 2.5s)
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">1.1s</div>
          <p className="text-xs text-slate-500">Largest Contentful Paint loads rapidly on mobile and desktop.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">INP (Responsiveness)</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Good (&lt; 200ms)
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">45ms</div>
          <p className="text-xs text-slate-500 font-medium">Interaction to Next Paint is smooth with zero lag.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CLS (Visual Stability)</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Good (&lt; 0.1)
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">0.01</div>
          <p className="text-xs text-slate-500">Zero cumulative layout shift during page rendering.</p>
        </div>
      </div>

      {/* Web Vitals Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm font-serif">Page Web Vitals Breakdown</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDeviceFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                deviceFilter === "ALL" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              All Devices
            </button>
            <button
              onClick={() => setDeviceFilter("MOBILE")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                deviceFilter === "MOBILE" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              Mobile
            </button>
            <button
              onClick={() => setDeviceFilter("DESKTOP")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                deviceFilter === "DESKTOP" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              Desktop
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">URL Route</th>
                <th className="p-4">Device</th>
                <th className="p-4">LCP</th>
                <th className="p-4">INP</th>
                <th className="p-4">CLS</th>
                <th className="p-4">PageSpeed Score</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredMetrics.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-teal-800">{item.url.replace("https://rizwansaeed.com", "") || "/"}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      {item.device === "MOBILE" ? <Smartphone className="h-3.5 w-3.5 text-teal-700" /> : <Monitor className="h-3.5 w-3.5 text-blue-700" />}
                      {item.device}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-700">{(item.lcpMs / 1000).toFixed(2)}s</td>
                  <td className="p-4 font-bold text-emerald-700">{item.inpMs}ms</td>
                  <td className="p-4 font-bold text-emerald-700">{item.cls}</td>
                  <td className="p-4 font-bold text-slate-900 font-serif text-sm">{item.performanceScore}/100</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {item.status}
                    </span>
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
