import { prisma } from "@/lib/db/prisma";

export async function logActivity({
  userId,
  userName,
  action,
  entity,
  entityId,
  details,
}: {
  userId?: string;
  userName?: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
}) {
  try {
    await prisma.activityLog.create({
      data: {
        userId: userId || null,
        userName: userName || "System Admin",
        action,
        entity,
        entityId: entityId || null,
        details: details || null,
      },
    });
  } catch (err) {
    console.error("Failed to write activity log:", err);
  }
}
