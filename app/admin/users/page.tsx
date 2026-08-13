import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { UsersTableClient } from "@/components/admin/UsersTableClient";
import { Plus } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  if (session.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  let rawUsers: any[] = [];
  try {
    rawUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []);
  } catch {
    rawUsers = [];
  }

  const users = rawUsers.map((u) => ({
    ...u,
    lastLogin: u.lastLogin ? u.lastLogin.toISOString() : null,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin User Management"
        subtitle="Manage administrator accounts, assign RBAC access roles (SUPER_ADMIN, ADMIN, EDITOR, VIEWER), and review login history."
        actionText="Add New Admin User"
        actionHref="/admin/users/new"
        actionIcon={Plus}
      />

      <UsersTableClient users={users} />
    </div>
  );
}
