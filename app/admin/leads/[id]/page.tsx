import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Mail, MapPin, Calendar, Globe, PhoneCall, CheckCircle2 } from "lucide-react";

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  let lead: any = null;
  try {
    lead = await prisma.lead.findUnique({
      where: { id },
      include: { notes: true },
    });
  } catch {
    lead = null;
  }

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/leads"
          className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-teal-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to All Leads
        </Link>
      </div>

      <PageHeader
        title={`Lead Inquiry: ${lead.fullName}`}
        subtitle={`Submitted on ${formatDate(lead.createdAt.toISOString())} for ${lead.requiredService}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Full Lead Details & Project Description */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
              Project Requirements & Goals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Required Service
                </span>
                <span className="font-bold text-teal-800 text-sm">{lead.requiredService}</span>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Monthly Marketing Budget
                </span>
                <span className="font-bold text-slate-900 text-sm">{lead.monthlyBudget}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Primary Business Goal
              </span>
              <p className="text-sm font-semibold text-slate-900 bg-warm-50 p-4 rounded-lg border border-slate-200/80">
                {lead.mainGoal}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Project Details
              </span>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-normal">
                {lead.projectDetails}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Metadata & Status Pipeline */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base font-serif border-b border-slate-100 pb-2">
              Prospect Metadata
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Full Name</span>
                <span className="font-bold text-slate-900 text-sm">{lead.fullName}</span>
              </div>

              <div>
                <span className="text-slate-500 font-medium block">Work Email</span>
                <a href={`mailto:${lead.email}`} className="font-semibold text-teal-700 flex items-center gap-1 hover:underline">
                  <Mail className="h-3.5 w-3.5" />
                  {lead.email}
                </a>
              </div>

              <div>
                <span className="text-slate-500 font-medium block">Phone / WhatsApp</span>
                <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-800 flex items-center gap-1 hover:text-emerald-700">
                  <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
                  {lead.phone}
                </a>
              </div>

              <div>
                <span className="text-slate-500 font-medium block">Country / Region</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {lead.country}
                </span>
              </div>

              {lead.company && (
                <div>
                  <span className="text-slate-500 font-medium block">Company</span>
                  <span className="font-semibold text-slate-900">{lead.company}</span>
                </div>
              )}

              {lead.website && (
                <div>
                  <span className="text-slate-500 font-medium block">Current Website</span>
                  <a href={lead.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-700 flex items-center gap-1 hover:underline">
                    <Globe className="h-3.5 w-3.5" />
                    {lead.website}
                  </a>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Received: {formatDate(lead.createdAt.toISOString())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
