import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ActivityTableClient } from "@/components/admin/ActivityTableClient";

export default async function AdminActivityLogsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const rawLogs = await prisma.activityLog.findMany({
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  const logs = rawLogs.map((log) => ({
    ...log,
    timestamp: log.timestamp.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Activity Logs & Audit Trail"
        subtitle="Security audit log tracking admin logins, content updates, lead status changes, and media uploads."
      />

      <ActivityTableClient logs={logs} />
    </div>
  );
}
