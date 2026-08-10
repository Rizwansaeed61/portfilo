import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth/session";

export async function POST() {
  await destroyAdminSession();
  return NextResponse.redirect(new URL("/admin/login", "http://localhost:3000"), 303);
}

export async function GET() {
  await destroyAdminSession();
  return NextResponse.redirect(new URL("/admin/login", "http://localhost:3000"), 303);
}
