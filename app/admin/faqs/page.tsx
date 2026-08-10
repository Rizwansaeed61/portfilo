import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { FaqsTableClient } from "@/components/admin/FaqsTableClient";
import { Plus } from "lucide-react";

export default async function AdminFaqsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const faqs = await prisma.fAQ.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Frequently Asked Questions (FAQ) CMS"
        subtitle="Manage public FAQs, question order, category grouping, and structured FAQPage schema JSON-LD generation."
        actionText="Add New FAQ"
        actionHref="/admin/faqs/new"
        actionIcon={Plus}
      />

      <FaqsTableClient faqs={faqs} />
    </div>
  );
}
