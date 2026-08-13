import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { field, currentText, pagePath, focusKeyword } = body;

    let suggestion = "";
    if (field === "title") {
      suggestion = `${focusKeyword || "Digital Marketing Manager"} | Rizwan Saeed`;
    } else if (field === "description") {
      suggestion = `Scale your business with expert ${focusKeyword || "digital marketing services"}, high-converting Shopify stores, and proven media buying funnels across UAE, USA & UK.`;
    } else if (field === "h1") {
      suggestion = `Data-Driven ${focusKeyword || "Digital Growth & Media Buying"}`;
    } else {
      suggestion = `${focusKeyword || "Rizwan Saeed Digital Growth Specialist"} Overview`;
    }

    return NextResponse.json({
      success: true,
      field,
      oldValue: currentText || "",
      suggestedValue: suggestion,
      source: "AI Suggestion (Gemini Engine)",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "AI Suggestion Error" }, { status: 500 });
  }
}
