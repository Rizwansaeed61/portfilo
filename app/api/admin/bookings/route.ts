import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const bookings = await prisma.strategyBooking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, bookings });
  } catch {
    return NextResponse.json({ success: true, bookings: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, timeSlot, topic, status } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });
    }

    const booking = await prisma.strategyBooking.create({
      data: {
        name,
        email,
        phone: phone || "",
        date: date || new Date().toISOString().split("T")[0],
        timeSlot: timeSlot || "11:00 AM (UAE)",
        topic: topic || "Strategy Call",
        status: status || "CONFIRMED",
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create booking" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.strategyBooking.delete({ where: { id } }).catch(() => {});
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
