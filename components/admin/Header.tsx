"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, User, ShieldCheck, ExternalLink, LogOut, ChevronDown, Bell } from "lucide-react";

interface HeaderProps {
  onMobileToggle: () => void;
  userName?: string;
  userRole?: string;
}

export function Header({ onMobileToggle, userName = "Rizwan Saeed", userRole = "SUPER_ADMIN" }: HeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Toggle & Page Title indicator */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Admin Workspace</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">Content Management System</span>
        </div>
      </div>

      {/* Right: Actions, Notifications & Profile Menu */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5 text-teal-700" />
          <span>Live Site</span>
        </a>

        <div className="relative">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-teal-700 shadow-xs flex-shrink-0">
              <img
                src="/images/rizwan-saeed.png"
                alt="Rizwan Saeed"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {userName}
              </span>
              <span className="text-[10px] text-teal-700 font-semibold uppercase">
                {userRole.replace("_", " ")}
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500 hidden md:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{userName}</p>
                <p className="text-[11px] text-slate-500">Hello@RizwanSaddique.site</p>
              </div>

              <Link
                href="/admin/profile"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-700"
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/admin/settings/security"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-700"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Security Settings</span>
              </Link>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-700"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visit Website</span>
              </a>

              <div className="border-t border-slate-100 my-1 pt-1">
                <form action="/api/admin/logout" method="POST">
                  <button
                    type="submit"
                    className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
