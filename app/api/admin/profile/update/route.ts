import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { triggerRevalidation } from "@/lib/db/content";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      title,
      email,
      phone,
      whatsapp,
      linkedin,
      location,
      shortBio,
      fullBio,
      photoUrl,
    } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and Email are required fields." }, { status: 400 });
    }

    // 1. Update User table (name and login email username)
    await prisma.user.update({
      where: { id: session.id },
      data: {
        name,
        email: email.toLowerCase().trim(),
      },
    });

    // 2. Update Profile table
    await prisma.profile.upsert({
      where: { id: "profile-rizwan" },
      update: {
        name,
        title,
        email,
        phone,
        whatsapp: whatsapp || phone,
        linkedin,
        location,
        shortBio,
        fullBio,
        photoUrl: photoUrl || "/images/rizwan-saeed.png",
      },
      create: {
        id: "profile-rizwan",
        name,
        title,
        email,
        phone,
        whatsapp: whatsapp || phone,
        linkedin,
        location,
        shortBio,
        fullBio,
        photoUrl: photoUrl || "/images/rizwan-saeed.png",
      },
    });

    await logActivity({
      userId: session.id,
      userName: name,
      action: "UPDATE_PROFILE",
      entity: "Profile",
      details: `Updated name to ${name} and email to ${email}`,
    });

    // Revalidate public cache
    await triggerRevalidation(["/", "/about", "/services", "/results", "/insights", "/contact"]);

    return NextResponse.json({
      success: true,
      message: "Profile and user details updated successfully.",
    });
  } catch (err) {
    console.error("Profile Update API Error:", err);
    return NextResponse.json(
      { success: false, error: "An error occurred while updating profile." },
      { status: 500 }
    );
  }
}
