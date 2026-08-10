import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SeoTableClient } from "@/components/admin/SeoTableClient";
import { Plus } from "lucide-react";

export default async function AdminSeoPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const seoSettings = await prisma.sEOSetting.findMany({
    orderBy: { pagePath: "asc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Page-by-Page SEO & Schema Manager"
        subtitle="Configure meta titles, meta descriptions, OpenGraph share images, canonical URLs, and structured JSON-LD schemas for each route."
        actionText="Add Page SEO"
        actionHref="/admin/seo/new"
        actionIcon={Plus}
      />

      <SeoTableClient seoSettings={seoSettings} />
    </div>
  );
}
