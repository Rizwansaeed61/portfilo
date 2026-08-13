import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    const inputUser = (email || "").trim().toLowerCase();
    const inputPass = (password || "").trim();

    if (!inputUser || !inputPass) {
      return NextResponse.json(
        { success: false, error: "Please enter both Email/Username and Password." },
        { status: 400 }
      );
    }

    // Default admin fallback credentials
    const DEFAULT_EMAIL = "rizwansaeed610@gmail.com";
    const DEFAULT_PASS = "McSe2008@@@";

    // 1. Check against DB users first
    let userFromDb: any = null;
    try {
      userFromDb = await prisma.user.findFirst({
        where: {
          OR: [
            { email: inputUser },
            { name: { equals: inputUser } },
          ],
        },
      });
    } catch (err) {
      console.warn("DB user lookup warning during login:", err);
    }

    let isValid = false;

    if (userFromDb && userFromDb.passwordHash) {
      isValid = verifyPassword(inputPass, userFromDb.passwordHash);
    }

    // Fallback credential check
    if (!isValid) {
      if (
        (inputUser === DEFAULT_EMAIL || inputUser === "rizwansaeed610" || inputUser === "admin" || inputUser === "rizwan") &&
        (inputPass === DEFAULT_PASS || inputPass === "McSe2008@@@" || inputPass === "admin")
      ) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid Email/Username or Password. Please check credentials." },
        { status: 401 }
      );
    }

    // Grant Admin Session
    await createAdminSession({
      id: userFromDb?.id || "profile-rizwan",
      email: userFromDb?.email || DEFAULT_EMAIL,
      name: userFromDb?.name || "Rizwan Saeed",
      role: userFromDb?.role || "SUPER_ADMIN",
    });

    return NextResponse.json({
      success: true,
      message: "Login successful. Redirecting to admin dashboard...",
    });
  } catch (err: any) {
    console.error("Login API Exception:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
