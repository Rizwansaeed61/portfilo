import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ExperienceTableClient } from "@/components/admin/ExperienceTableClient";
import { Plus } from "lucide-react";

export default async function AdminExperiencePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const experiences = await prisma.experience.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Professional Experience Management"
        subtitle="Manage Rizwan Saeed's career timeline roles, responsibilities, locations, and featured display states."
        actionText="Add New Role"
        actionHref="/admin/experience/new"
        actionIcon={Plus}
      />

      <ExperienceTableClient experiences={experiences} />
    </div>
  );
}
