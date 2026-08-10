"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, Copy, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = "Upload Image Asset" }: ImageUploaderProps) {
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setImgError(false);

    // Validate MIME type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid image file type. Only JPEG, PNG, WebP, AVIF, and SVG files are permitted.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit. Please upload an optimized image.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || "Failed to upload image.");
      } else {
        onChange(json.url);
      }
    } catch {
      setError("An error occurred during file upload.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}

      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Image Preview Box if Value is Set */}
      {value ? (
        <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center gap-4">
            {/* Thumbnail Preview Frame */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-300 bg-white flex items-center justify-center">
              {!imgError ? (
                <Image
                  src={value}
                  alt="Uploaded preview"
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                  <ImageIcon className="h-6 w-6 mb-1" />
                  <span className="text-[9px] font-semibold">Image Asset</span>
                </div>
              )}
            </div>

            {/* Actions & Asset URL */}
            <div className="flex-1 min-w-0 space-y-2">
              <p className="text-xs text-slate-700 font-mono truncate bg-white px-3 py-1.5 rounded border border-slate-200">
                {value}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {/* Direct Upload / Change Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  {uploading ? "Uploading..." : "Upload New File"}
                </button>

                {/* Copy URL */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy URL"}
                </button>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setImgError(false);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Large Dropzone File Input when Value is empty */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-teal-600 rounded-2xl p-6 text-center bg-slate-50 hover:bg-white transition-colors cursor-pointer relative"
        >
          <Upload className="mx-auto h-8 w-8 text-teal-700 mb-2" />
          <p className="text-xs font-bold text-slate-800">
            {uploading ? "Uploading file from computer..." : "Click here to upload photo directly from computer"}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Supports JPEG, PNG, WebP, AVIF, SVG (Max 5MB)
          </p>
        </div>
      )}

      {/* Manual URL Input fallback */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-slate-500">Or specify direct image URL path:</span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setImgError(false);
          }}
          placeholder="/images/my-photo.png or https://..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 bg-white placeholder-slate-400 focus:border-teal-600 focus:outline-none font-mono"
        />
      </div>

      {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
    </div>
  );
}
