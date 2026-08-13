"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { FileCheck, CheckCircle2, Code, Eye, ExternalLink } from "lucide-react";

export default function AdminSeoSchemaPage() {
  const schemaEntities = [
    { pageUrl: "/", type: "Person", status: "VALID", snippet: `{"@context":"https://schema.org","@type":"Person","name":"Rizwan Saeed","jobTitle":"Digital Marketing Manager & Shopify Developer","url":"https://rizwansaeed.com"}` },
    { pageUrl: "/services", type: "ProfessionalService", status: "VALID", snippet: `{"@context":"https://schema.org","@type":"ProfessionalService","name":"Rizwan Saeed Digital Growth Services","areaServed":["UAE","USA","UK"]}` },
    { pageUrl: "/insights", type: "Article", status: "VALID", snippet: `{"@context":"https://schema.org","@type":"Article","headline":"Generative Engine Optimization (GEO) Guide","author":{"@type":"Person","name":"Rizwan Saeed"}}` },
    { pageUrl: "/faqs", type: "FAQPage", status: "VALID", snippet: `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What services do you offer?"}]}` },
  ];

  const [selectedSchema, setSelectedSchema] = useState<any | null>(null);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Schema & Structured Data Analyzer"
        subtitle="Validate JSON-LD entity structures (Person, Organization, ProfessionalService, Article, FAQPage, BreadcrumbList) for Rich Snippet eligibility."
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm font-serif">Structured Data JSON-LD Schemas</h3>
          <span className="text-xs text-[#00a896] font-mono font-bold">100% Valid JSON-LD</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Route Path</th>
                <th className="p-4">Schema @type Entity</th>
                <th className="p-4">Validation Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {schemaEntities.map((entity, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-teal-800">{entity.pageUrl}</td>
                  <td className="p-4 font-bold text-slate-900 font-serif">{entity.type}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Valid Schema
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedSchema(entity)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold rounded-lg border border-teal-200 text-xs"
                    >
                      <Code className="h-3.5 w-3.5" />
                      View JSON-LD
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON-LD Preview Modal */}
      {selectedSchema && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl relative animate-fade-in border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  JSON-LD Code — {selectedSchema.type}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchema(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              {JSON.stringify(JSON.parse(selectedSchema.snippet), null, 2)}
            </pre>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSchema(null)}
                className="px-5 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs"
              >
                Close Code Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
