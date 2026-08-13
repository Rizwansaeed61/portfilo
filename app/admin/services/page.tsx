import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ServicesTableClient } from "@/components/admin/ServicesTableClient";
import { Plus } from "lucide-react";

import { servicesData } from "@/content/services";

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    }).catch(() => []);
  } catch {
    services = [];
  }

  // Fallback to static servicesData if DB has no records or edge environment
  if (!services || services.length === 0) {
    services = servicesData.map((s, idx) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      iconName: s.iconName,
      status: "PUBLISHED",
      featured: true,
      displayOrder: idx + 1,
    }));
  }

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
