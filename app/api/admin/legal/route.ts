import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getAdminSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pages = await prisma.legalPage.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error("Error fetching legal pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch legal pages" },
      { status: 500 }
    );
  }
}
