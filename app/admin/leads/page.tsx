import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LeadsTableClient } from "@/components/admin/LeadsTableClient";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function AdminLeadsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const rawLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { notes: true },
  });

  const leads = rawLeads.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Leads & Project Inquiries"
        subtitle="Review, qualify, note, and manage client project submissions received from the website contact forms."
      >
        <a href="/api/admin/leads/export" download>
          <Button variant="outline" size="md">
            <Download className="h-4 w-4 mr-1.5 text-teal-700" />
            Export CSV
          </Button>
        </a>
      </PageHeader>

      <LeadsTableClient leads={leads} />
    </div>
  );
}
