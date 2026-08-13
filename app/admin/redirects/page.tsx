import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { RedirectsTableClient } from "@/components/admin/RedirectsTableClient";
import { Plus } from "lucide-react";

export default async function AdminRedirectsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let redirects: any[] = [];
  try {
    redirects = await prisma.redirect.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []);
  } catch {
    redirects = [];
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="301 / 302 Redirect Manager"
        subtitle="Create safe URL redirect rules for legacy paths and updated campaign landing pages."
        actionText="Add Redirect Rule"
        actionHref="/admin/redirects/new"
        actionIcon={Plus}
      />

      <RedirectsTableClient redirects={redirects} />
    </div>
  );
}
