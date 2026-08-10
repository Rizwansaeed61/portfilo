import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      where: { status: { not: "SPAM" } },
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV Header
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Website",
      "Country",
      "Service",
      "Monthly Budget",
      "Main Goal",
      "Preferred Contact",
      "Status",
      "Date Submitted",
    ].join(",");

    // Escape CSV cell text
    const escapeCsv = (str: string | null | undefined) => {
      if (!str) return '""';
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = leads.map((l) =>
      [
        escapeCsv(l.id),
        escapeCsv(l.fullName),
        escapeCsv(l.email),
        escapeCsv(l.phone),
        escapeCsv(l.company),
        escapeCsv(l.website),
        escapeCsv(l.country),
        escapeCsv(l.requiredService),
        escapeCsv(l.monthlyBudget),
        escapeCsv(l.mainGoal),
        escapeCsv(l.preferredContact),
        escapeCsv(l.status),
        escapeCsv(l.createdAt.toISOString()),
      ].join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads_export_${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    console.error("CSV Export Error:", err);
    return NextResponse.json({ error: "Failed to generate CSV export" }, { status: 500 });
  }
}
