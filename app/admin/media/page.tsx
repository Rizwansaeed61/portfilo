import React from "react";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { formatDate } from "@/lib/utils";
import { Image as ImageIcon, Copy, FileText } from "lucide-react";
import Image from "next/image";

export default async function AdminMediaPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const mediaFiles = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Media Asset Library"
        subtitle="Upload, validate, manage, and copy image URLs for portfolio graphics, case study screenshots, and blog post heroes."
      />

      {/* Upload Zone */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-teal-700" />
          Upload New Image Asset
        </h2>
        <ImageUploader value="" onChange={() => redirect("/admin/media")} />
      </div>

      {/* Media Grid */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Uploaded Media Assets ({mediaFiles.length})
          </h2>
        </div>

        {mediaFiles.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mediaFiles.map((file) => (
              <div
                key={file.id}
                className="group relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 space-y-2 p-2"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white">
                  <Image
                    src={file.url}
                    alt={file.originalName}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold text-slate-900 truncate" title={file.originalName}>
                    {file.originalName}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {(file.size / 1024).toFixed(1)} KB • {file.mimeType.split("/")[1].toUpperCase()}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {formatDate(file.createdAt.toISOString())}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500 space-y-2">
            <FileText className="mx-auto h-8 w-8 text-slate-300" />
            <p>No uploaded media assets found in the library.</p>
          </div>
        )}
      </div>
    </div>
  );
}
