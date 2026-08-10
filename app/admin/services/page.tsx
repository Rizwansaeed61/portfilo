import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ServicesTableClient } from "@/components/admin/ServicesTableClient";
import { Plus } from "lucide-react";

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services Management"
        subtitle="Manage growth service offerings, deliverables, process steps, status, and custom SEO metadata."
        actionText="Add New Service"
        actionHref="/admin/services/new"
        actionIcon={Plus}
      />

      <ServicesTableClient services={services} />
    </div>
  );
}
