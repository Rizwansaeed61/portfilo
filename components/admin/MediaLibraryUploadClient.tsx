"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ImageIcon, CheckCircle2 } from "lucide-react";

export function MediaLibraryUploadClient() {
  const router = useRouter();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUploadChange = (url: string) => {
    setUploadedUrl(url);
    if (url) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.refresh();
      }, 1500);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-teal-700" />
          Upload New Image Asset
        </h2>
        {success && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Asset Uploaded & Cataloged!
          </span>
        )}
      </div>

      <ImageUploader value={uploadedUrl} onChange={handleUploadChange} />
    </div>
  );
}
