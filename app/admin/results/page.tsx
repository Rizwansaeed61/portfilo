import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ResultsTableClient } from "@/components/admin/ResultsTableClient";
import { Plus, ShieldCheck } from "lucide-react";

export default async function AdminResultsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let results: any[] = [];
  try {
    results = await prisma.result.findMany({
      orderBy: { displayOrder: "asc" },
    }).catch(() => []);
  } catch {
    results = [];
  }

  if (!results || results.length === 0) {
    results = [
      { id: "res-1", title: "Revenue Generated", metric: "AED 4.2M+", subtitle: "Direct & Assisted Sales", description: "Generated across client digital growth projects through strategic performance marketing.", category: "revenue", displayOrder: 1, status: "PUBLISHED" },
      { id: "res-2", title: "Ad Spend Managed", metric: "AED 850K", subtitle: "Meta & Google Ads", description: "Managed efficiently across Meta Ads and Google Search/Performance Max campaigns.", category: "spend", displayOrder: 2, status: "PUBLISHED" },
      { id: "res-3", title: "International Experience", metric: "5+ Years", subtitle: "Digital & E-Commerce", description: "Proven track record managing digital growth campaigns.", category: "experience", displayOrder: 3, status: "PUBLISHED" },
      { id: "res-4", title: "Key Markets Served", metric: "UAE · USA · UK", subtitle: "Global Client Scope", description: "Deep understanding of buyer behavior and ad costs.", category: "markets", displayOrder: 4, status: "PUBLISHED" },
    ];
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verified Results & Performance Proof"
        subtitle="Manage verified CV results (AED 4.2M+ Revenue, AED 850K Spend) displayed across the trust bar and results section."
        actionText="Add New Metric"
        actionHref="/admin/results/new"
        actionIcon={Plus}
      />

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-amber-700 flex-shrink-0" />
        <span>Important: Never create unverified or fabricated revenue performance results. All metrics must adhere strictly to verified CV facts.</span>
      </div>

      <ResultsTableClient results={results} />
    </div>
  );
}
