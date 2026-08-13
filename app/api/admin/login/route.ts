import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/crypto";
import { createAdminSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request format. Please provide valid JSON." },
        { status: 400 }
      );
    }

    const { email, password } = body || {};

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Find user by email (case-insensitive)
    let user = null;
    try {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: trimmedEmail },
            { email: email.trim() },
          ],
        },
      });
    } catch (dbErr) {
      console.warn("DB Query attempt in login:", dbErr);
    }

    const defaultAdminEmail = (process.env.ADMIN_EMAIL || "rizwansaeed610@gmail.com").toLowerCase();
    const defaultAdminPassword = process.env.ADMIN_INITIAL_PASSWORD || "McSe2008@@@";

    let isValid = false;

    if (user) {
      isValid = verifyPassword(password, user.passwordHash);
    }

    // Direct credentials validation fallback for initial super admin
    if (!isValid && (trimmedEmail === defaultAdminEmail || trimmedEmail === "rizwansaeed610@gmail.com") && password === defaultAdminPassword) {
      isValid = true;
      if (!user) {
        user = {
          id: "profile-rizwan",
          email: "rizwansaeed610@gmail.com",
          name: "Rizwan Saeed",
          role: "SUPER_ADMIN",
          passwordHash: "",
        } as any;
      }
    }

    if (!isValid || !user) {
      logActivity({ action: "LOGIN_FAILED", entity: "User", details: `Failed email attempt: ${email}` }).catch(() => {});
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Update last login timestamp
    try {
      if (user.id && user.id !== "profile-rizwan") {
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });
      }
    } catch (dbErr) {
      console.warn("Could not update lastLogin timestamp:", dbErr);
    }

    // Create session cookie
    await createAdminSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    logActivity({ userId: user.id, userName: user.name, action: "LOGIN_SUCCESS", entity: "User" }).catch(() => {});

    return NextResponse.json({ success: true, message: "Logged in successfully." });
  } catch (err: any) {
    console.error("Login API Error:", err);
    return NextResponse.json(
      { 
        success: false, 
        error: process.env.NODE_ENV === "development" && err?.message 
          ? `Login error: ${err.message}` 
          : "Invalid email or password. Please check your credentials and try again." 
      },
      { status: 500 }
    );
  }
}
