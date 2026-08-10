import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded." }, { status: 400 });
    }

    // MIME type check
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPG, PNG, WebP, AVIF, and SVG images are allowed." },
        { status: 400 }
      );
    }

    // File size check (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File exceeds 5MB size limit." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Safe sanitized filename
    const ext = path.extname(file.name) || ".jpg";
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
    const uniqueFilename = `${Date.now()}_${sanitizedName}`;

    // Target upload dir inside public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;

    // Save record in Media DB table
    const mediaRecord = await prisma.media.create({
      data: {
        filename: uniqueFilename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: publicUrl,
      },
    });

    await logActivity({
      userId: session.id,
      userName: session.name,
      action: "UPLOAD_MEDIA",
      entity: "Media",
      entityId: mediaRecord.id,
      details: file.name,
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      media: mediaRecord,
    });
  } catch (err) {
    console.error("Media Upload API Error:", err);
    return NextResponse.json({ success: false, error: "Failed to save uploaded file." }, { status: 500 });
  }
}
