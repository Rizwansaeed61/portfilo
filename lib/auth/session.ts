import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { generateToken } from "@/lib/auth/crypto";

const COOKIE_NAME = "admin_session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function createAdminSession(user: SessionUser): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiration
  const token = generateToken();

  // Delete older sessions for user if any
  await prisma.session.deleteMany({
    where: { userId: user.id },
  });

  // Create new session in DB
  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  // Set HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

export async function getAdminSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    // Verify session exists in DB
    const dbSession = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!dbSession || dbSession.expiresAt < new Date() || dbSession.user.status !== "ACTIVE") {
      return null;
    }

    return {
      id: dbSession.user.id,
      email: dbSession.user.email,
      name: dbSession.user.name,
      role: dbSession.user.role,
    };
  } catch {
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token) {
      await prisma.session.deleteMany({
        where: { token },
      });
      cookieStore.delete(COOKIE_NAME);
    }
  } catch (err) {
    console.error("Error destroying admin session:", err);
  }
}
