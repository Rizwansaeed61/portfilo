import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/crypto";
import { createAdminSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/activity-log";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: trimmedEmail },
          { email: trimmedEmail.toLowerCase() },
        ],
      },
    });

    if (!user) {
      await logActivity({ action: "LOGIN_FAILED", entity: "User", details: `Failed email: ${email}` });
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordValid = verifyPassword(password, user.passwordHash);
    if (!passwordValid) {
      await logActivity({ userId: user.id, userName: user.name, action: "LOGIN_FAILED", entity: "User" });
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Create session cookie
    await createAdminSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await logActivity({ userId: user.id, userName: user.name, action: "LOGIN_SUCCESS", entity: "User" });

    return NextResponse.json({ success: true, message: "Logged in successfully." });
  } catch (err) {
    console.error("Login API Error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
