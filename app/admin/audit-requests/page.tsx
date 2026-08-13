import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { AuditRequestsTableClient } from "@/components/admin/AuditRequestsTableClient";

export default async function AdminAuditRequestsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let rawAuditRequests: any[] = [];
  try {
    rawAuditRequests = await prisma.auditRequest.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []);
  } catch {
    rawAuditRequests = [];
  }

  const auditRequests = rawAuditRequests.map((item) => ({
    ...item,
    createdAt: item.createdAt ? item.createdAt.toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Website & Ads Audit Requests"
        subtitle="Manage free audit inquiries requested by visitors looking to optimize their advertising accounts or store speed."
      />

      <AuditRequestsTableClient auditRequests={auditRequests} />
    </div>
  );
}
