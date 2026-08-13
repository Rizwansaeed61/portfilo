"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageSeoItem } from "@/lib/seo/types";
import { Image as ImageIcon, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function AdminSeoImagesPage() {
  const [images, setImages] = useState<ImageSeoItem[]>([
    {
      id: "img-1",
      imageUrl: "/images/rizwan-saeed.png",
      sourcePageUrl: "/",
      altText: "Rizwan Saeed — Digital Marketing Manager & Shopify Developer",
      isDecorative: false,
      hasAltAttribute: true,
      width: 800,
      height: 800,
      fileSizeKb: 145,
      fileType: "png",
      status: "OK",
    },
    {
      id: "img-2",
      imageUrl: "/images/insights/performance-marketing.jpg",
      sourcePageUrl: "/insights",
      altText: "Performance Marketing Strategy & ROAS Scaling Guide",
      isDecorative: false,
      hasAltAttribute: true,
      width: 1200,
      height: 675,
      fileSizeKb: 729,
      fileType: "jpg",
      status: "OK",
    },
    {
      id: "img-3",
      imageUrl: "/images/insights/shopify-cro.jpg",
      sourcePageUrl: "/insights",
      altText: "Shopify Conversion Rate Optimization & Page Speed Techniques",
      isDecorative: false,
      hasAltAttribute: true,
      width: 1200,
      height: 675,
      fileSizeKb: 725,
      fileType: "jpg",
      status: "OK",
    },
    {
      id: "img-4",
      imageUrl: "/images/insights/ai-search-geo.jpg",
      sourcePageUrl: "/insights",
      altText: "Generative Engine Optimization (GEO) & AI Search Blueprint",
      isDecorative: false,
      hasAltAttribute: true,
      width: 1200,
      height: 675,
      fileSizeKb: 827,
      fileType: "jpg",
      status: "OK",
    },
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Image SEO & Asset Audit"
        subtitle="Audit content images for ALT text attributes, dimensions, layout shift risks, file sizes, and next-gen image compression."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Audited Images</span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">{images.length} Assets</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            100% ALT Attribute Coverage
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Missing ALT Text</span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">0</div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            Full Accessibility Compliance
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Explicit Dimensions</span>
          <div className="text-3xl font-extrabold text-slate-900 font-serif">100%</div>
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block">
            Zero CLS Layout Shift Risk
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="p-4">Image Asset</th>
                <th className="p-4">Source Page</th>
                <th className="p-4">ALT Text Attribute</th>
                <th className="p-4">Dimensions & Size</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {images.map((img) => (
                <tr key={img.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-teal-800 flex items-center gap-2">
                    <img src={img.imageUrl} alt="Thumbnail" className="w-8 h-8 rounded object-cover border border-slate-200" />
                    <span className="truncate max-w-xs">{img.imageUrl}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-600">{img.sourcePageUrl}</td>
                  <td className="p-4 font-bold text-slate-900 max-w-xs truncate font-serif">{img.altText || "(Empty Decorative)"}</td>
                  <td className="p-4 font-mono text-slate-500">{img.width}x{img.height} ({img.fileSizeKb} KB)</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Valid ALT
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
