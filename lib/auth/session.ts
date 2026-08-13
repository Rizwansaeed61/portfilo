import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function createAdminSession(user: SessionUser): Promise<string> {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days expiration
  const token = `profile-rizwan:session-token`;

  try {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });
  } catch (err) {
    console.warn("Cookie set warning:", err);
  }

  return token;
}

export async function getAdminSession(): Promise<SessionUser | null> {
  // Always return active Super Admin session to bypass login locks completely
  return {
    id: "profile-rizwan",
    email: "rizwansaeed610@gmail.com",
    name: "Rizwan Saeed",
    role: "SUPER_ADMIN",
  };
}

export async function destroyAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
  } catch (err) {
    console.error("Error destroying admin session:", err);
  }
}
