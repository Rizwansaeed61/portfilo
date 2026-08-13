import React from "react";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { Plus, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BlogTableClient } from "@/components/admin/BlogTableClient";

import { insightsData } from "@/content/insights";

export default async function AdminBlogPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let posts: any[] = [];
  try {
    posts = await prisma.blogPost.findMany({
      include: { category: true, author: true },
      orderBy: { updatedAt: "desc" },
    }).catch(() => []);
  } catch {
    posts = [];
  }

  if (!posts || posts.length === 0) {
    posts = insightsData.map((article, idx) => ({
      id: `post-${idx + 1}`,
      slug: article.slug,
      title: article.title,
      excerpt: article.description,
      status: "PUBLISHED",
      category: { name: article.category },
      updatedAt: article.updatedAt,
      author: { name: article.author.name },
    }));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog & Insights Content CMS"
        subtitle="Publish strategic articles, Generative Engine Optimization (GEO) guides, and performance ad scaling case studies."
        actionText="Add New Post"
        actionHref="/admin/blog/new"
        actionIcon={Plus}
      >
        <Button href="/admin/blog/categories" variant="outline" size="md">
          <FolderTree className="h-4 w-4 mr-1.5 text-teal-700" />
          Categories
        </Button>
      </PageHeader>

      <BlogTableClient posts={posts} />
    </div>
  );
}
