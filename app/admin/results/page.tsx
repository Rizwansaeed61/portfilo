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

  const results = await prisma.result.findMany({
    orderBy: { displayOrder: "asc" },
  });

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
