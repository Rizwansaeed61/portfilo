import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    const page = await prisma.legalPage.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.json({ error: "Legal page not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return NextResponse.json(
      { error: "Failed to fetch legal page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    const {
      title,
      badgeText,
      lastUpdated,
      noticeText,
      sections,
      seoTitle,
      seoDescription,
    } = body;

    const updatedPage = await prisma.legalPage.upsert({
      where: { slug },
      update: {
        title: title || undefined,
        badgeText: badgeText || "Legal Document",
        lastUpdated: lastUpdated || "August 8, 2026",
        noticeText: noticeText !== undefined ? noticeText : undefined,
        sectionsJson: sections ? JSON.stringify(sections) : undefined,
        seoTitle: seoTitle !== undefined ? seoTitle : undefined,
        seoDescription: seoDescription !== undefined ? seoDescription : undefined,
      },
      create: {
        slug,
        title: title || (slug === "privacy" ? "Privacy Policy" : "Terms of Service"),
        badgeText: badgeText || "Legal Document",
        lastUpdated: lastUpdated || "August 8, 2026",
        noticeText: noticeText || "",
        sectionsJson: JSON.stringify(sections || []),
        seoTitle,
        seoDescription,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: session.id,
        userName: session.name || "Admin",
        action: "UPDATE",
        entity: "LegalPage",
        entityId: updatedPage.id,
        details: `Updated legal document: ${updatedPage.title} (${slug})`,
      },
    });

    return NextResponse.json({ success: true, page: updatedPage });
  } catch (error) {
    console.error("Error updating legal page:", error);
    return NextResponse.json(
      { error: "Failed to update legal page" },
      { status: 500 }
    );
  }
}
