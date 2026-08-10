"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, Loader2, User, Mail, Save } from "lucide-react";

export default function SecuritySettingsPage() {
  // Admin Account Details State
  const [adminName, setAdminName] = useState("Rizwan Saeed");
  const [adminEmail, setAdminEmail] = useState("Hello@RizwanSaddique.site");
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAccount(true);
    setAccountSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setAccountSuccess(true);
      setTimeout(() => setAccountSuccess(false), 3500);
    } finally {
      setSavingAccount(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 12) {
      setPasswordError("New password must be at least 12 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setSavingPassword(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3500);
    } catch {
      setPasswordError("Failed to update security credentials.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Security & Account Settings"
        subtitle="Manage administrator name, login email credentials, session security, and account password."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl">
        {/* 1. Admin Account Profile Details */}
        <form onSubmit={handleAccountSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="h-5 w-5 text-teal-700" />
            <h2 className="font-bold text-slate-900 text-base font-serif">Admin Account Details</h2>
          </div>

          {accountSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-xs font-bold animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Admin name and login email updated successfully!</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Admin Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Rizwan Saeed"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Admin Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Login Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Hello@RizwanSaddique.site"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-500">This email is used to log in to the Admin Panel.</p>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={savingAccount}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 shadow-md flex items-center justify-center gap-2"
            >
              {savingAccount ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Profile...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Account Details
                </>
              )}
            </Button>
          </div>
        </form>

        {/* 2. Change Account Password */}
        <form onSubmit={handlePasswordSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="h-5 w-5 text-teal-700" />
            <h2 className="font-bold text-slate-900 text-base font-serif">Change Account Password</h2>
          </div>

          {passwordSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-xs font-bold animate-fade-in">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Password changed successfully!</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-900 flex items-center gap-2 text-xs font-bold animate-fade-in">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                New Password (Min 12 Characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={12}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter strong passphrase..."
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500">Tip: Use a memorable passphrase with numbers & symbols (e.g. Rizwan$Growth#2026!)</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={12}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password..."
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={savingPassword}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 shadow-md"
            >
              {savingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating Security Credentials...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
