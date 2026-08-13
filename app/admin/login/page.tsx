"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowRight, Sparkles, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOpenAdmin = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "rizwansaeed610@gmail.com" }),
      });
    } catch {
      // Ignore
    } finally {
      router.push("/admin");
      router.refresh();
    }
  };

  useEffect(() => {
    // Auto-enter admin panel
    handleOpenAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
        <div className="space-y-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-700 text-white font-serif font-bold text-3xl shadow-md">
            RS
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">
            Rizwan Saeed Admin CMS
          </h1>
          <p className="text-sm font-semibold text-emerald-700 flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Password Barrier Bypassed · Direct Access Enabled</span>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed font-medium">
          Password protection has been completely removed. You can now access all CMS settings, leads, and content tools directly.
        </div>

        <Button
          onClick={handleOpenAdmin}
          disabled={loading}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3.5 text-base font-bold shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Opening Admin Dashboard...
            </>
          ) : (
            <>
              Enter Admin CMS Dashboard
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Full Unrestricted Super Admin Privileges</span>
        </div>
      </div>
    </div>
  );
}
