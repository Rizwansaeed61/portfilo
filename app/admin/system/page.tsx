import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { Download, FileText, Database, Mail, Briefcase, History } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function AdminSystemBackupPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="space-y-8">
      <PageHeader
        title="System Backup & Data Export"
        subtitle="Export website content, leads, services, and system configuration data in standardized JSON or CSV formats."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Contact Leads Export */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-serif">Export Contact Leads</h3>
              <p className="text-xs text-slate-500">Full CSV export of all submitted inquiries</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Download a clean CSV file containing prospect names, work emails, phones, countries, services, and project descriptions.
          </p>
          <a href="/api/admin/leads/export" download className="inline-block">
            <Button variant="primary" size="sm" className="bg-teal-700 hover:bg-teal-800">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Download Leads CSV
            </Button>
          </a>
        </div>

        {/* Card 2: System Database Backup */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-serif">Content JSON Backup</h3>
              <p className="text-xs text-slate-500">Backup all services, posts, & experience</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generate a full JSON backup file of all website content schemas for migration or external archive.
          </p>

          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5 mr-1.5 text-teal-700" />
            Generate Content JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
