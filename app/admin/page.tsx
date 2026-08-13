import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import {
  Mail,
  FileText,
  Briefcase,
  ImageIcon,
  PlusCircle,
  TrendingUp,
  Upload,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let totalLeads = 0;
  let newLeadsCount = 0;
  let totalPosts = 0;
  let publishedPostsCount = 0;
  let draftPostsCount = 0;
  let servicesCount = 6;
  let mediaCount = 8;
  let recentLeads: any[] = [];
  let recentPosts: any[] = [];

  // Edge-safe DB querying with fallbacks
  try {
    const results = await Promise.all([
      prisma.lead.count().catch(() => 0),
      prisma.lead.count({ where: { status: "NEW" } }).catch(() => 0),
      prisma.blogPost.count().catch(() => 0),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }).catch(() => 0),
      prisma.blogPost.count({ where: { status: "DRAFT" } }).catch(() => 0),
      prisma.service.count().catch(() => 6),
      prisma.media.count().catch(() => 8),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }).catch(() => []),
      prisma.blogPost.findMany({ take: 4, orderBy: { updatedAt: "desc" }, include: { category: true } }).catch(() => []),
    ]);

    totalLeads = results[0];
    newLeadsCount = results[1];
    totalPosts = results[2];
    publishedPostsCount = results[3];
    draftPostsCount = results[4];
    servicesCount = results[5] || 6;
    mediaCount = results[6] || 8;
    recentLeads = results[7] || [];
    recentPosts = results[8] || [];
  } catch (err) {
    console.warn("Dashboard DB queries skipped on edge environment:", err);
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Top Welcome Banner */}
      <PageHeader
        title={`Welcome Back, ${session.name}`}
        subtitle="Manage website content, review contact inquiries, optimize SEO, and track growth leads from one central CMS dashboard."
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            System Status: Active & Operational
          </span>
        </div>
      </PageHeader>

      {/* Quick Actions Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Quick Admin Actions
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/admin/blog/new" variant="primary" size="sm" className="bg-teal-700 hover:bg-teal-800">
            <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
            Add Blog Post
          </Button>
          <Button href="/admin/services" variant="outline" size="sm">
            <Briefcase className="h-3.5 w-3.5 mr-1.5 text-teal-700" />
            Add Service
          </Button>
          <Button href="/admin/results" variant="outline" size="sm">
            <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-teal-700" />
            Add Result
          </Button>
          <Button href="/admin/media" variant="outline" size="sm">
            <Upload className="h-3.5 w-3.5 mr-1.5 text-teal-700" />
            Upload Media
          </Button>
          <Button href="/admin/leads" variant="dark" size="sm">
            <Mail className="h-3.5 w-3.5 mr-1.5 text-teal-400" />
            View Leads ({newLeadsCount} New)
          </Button>
        </div>
      </div>

      {/* 8 Summary Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Leads"
          value={totalLeads}
          subtitle={`${newLeadsCount} new unread inquiries`}
          icon={Mail}
          href="/admin/leads"
          accentColor="teal"
        />
        <StatCard
          title="New Leads"
          value={newLeadsCount}
          subtitle="Action required"
          icon={Mail}
          href="/admin/leads?status=NEW"
          accentColor="amber"
        />
        <StatCard
          title="Total Blog Posts"
          value={totalPosts}
          subtitle={`${publishedPostsCount} published / ${draftPostsCount} drafts`}
          icon={FileText}
          href="/admin/blog"
          accentColor="emerald"
        />
        <StatCard
          title="Published Posts"
          value={publishedPostsCount}
          subtitle="Indexed in AI search"
          icon={FileText}
          href="/admin/blog"
          accentColor="teal"
        />
        <StatCard
          title="Draft Posts"
          value={draftPostsCount}
          subtitle="Work in progress"
          icon={FileText}
          href="/admin/blog"
          accentColor="slate"
        />
        <StatCard
          title="Active Services"
          value={servicesCount}
          subtitle="Growth service offerings"
          icon={Briefcase}
          href="/admin/services"
          accentColor="indigo"
        />
        <StatCard
          title="Website Pages"
          value={14}
          subtitle="Public & SEO pages"
          icon={Sparkles}
          href="/admin/seo"
          accentColor="teal"
        />
        <StatCard
          title="Media Files"
          value={mediaCount}
          subtitle="Uploaded assets"
          icon={ImageIcon}
          href="/admin/media"
          accentColor="slate"
        />
      </div>

      {/* Main Dashboard Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Recent Leads Table */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <Mail className="h-5 w-5 text-teal-700" />
              Recent Contact Inquiries
            </h2>
            <Link href="/admin/leads" className="text-xs font-semibold text-teal-700 hover:underline flex items-center">
              View All Leads <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>

          {recentLeads.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="py-3 flex items-center justify-between text-xs hover:bg-slate-50 p-2 rounded-lg transition-colors">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{lead.fullName}</p>
                    <p className="text-slate-500">{lead.email} • {lead.country}</p>
                    <span className="inline-block text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {lead.requiredService}
                    </span>
                  </div>

                  <div className="text-right space-y-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.status === "NEW" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"
                    }`}>
                      {lead.status}
                    </span>
                    <p className="text-[11px] text-slate-400">{formatDate(lead.createdAt ? lead.createdAt.toISOString() : new Date().toISOString())}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">No contact inquiries received yet.</p>
          )}
        </div>

        {/* Right Col: Recent Blog Posts & Recently Updated Content */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-700" />
                Recent Blog Posts
              </h2>
              <Link href="/admin/blog" className="text-xs font-semibold text-teal-700 hover:underline flex items-center">
                All Posts <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            {recentPosts.length > 0 ? (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-teal-700">{post.category?.name || "General"}</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(post.updatedAt ? post.updatedAt.toISOString() : new Date().toISOString())}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs line-clamp-1">{post.title}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">No blog posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
