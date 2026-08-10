"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  User,
  Briefcase,
  TrendingUp,
  ListOrdered,
  History,
  HelpCircle,
  FileText,
  PlusCircle,
  FolderTree,
  Mail,
  ShieldAlert,
  Image as ImageIcon,
  Search,
  ArrowRightLeft,
  Navigation,
  Menu as MenuIcon,
  Share2,
  Settings,
  Palette,
  BarChart,
  Users,
  ShieldCheck,
  Activity,
  Download,
  ExternalLink,
  LogOut,
  ChevronDown,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  React.useEffect(() => {
    try {
      const savedLogo = localStorage.getItem("site_logo_url");
      if (savedLogo) {
        setCustomLogo(savedLogo);
      }
    } catch {
      // Fallback
    }
  }, []);

  // Navigation Group State
  const [contentOpen, setContentOpen] = useState(true);
  const [blogOpen, setBlogOpen] = useState(true);
  const [leadsOpen, setLeadsOpen] = useState(true);
  const [seoOpen, setSeoOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);

  const isActive = (path: string) => pathname === path || (path !== "/admin" && pathname.startsWith(path));

  const navItemClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 ${
      isActive(path)
        ? "bg-teal-700 text-white font-bold shadow-2xs"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const groupHeaderClass =
    "flex items-center justify-between w-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors";

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Admin Header / Monogram */}
          <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200 flex-shrink-0 bg-white">
            {customLogo ? (
              <img
                src={customLogo}
                alt="Admin Logo"
                className="h-9 w-9 object-cover rounded-lg border border-slate-200 shadow-xs"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white font-serif font-bold text-base shadow-xs">
                RS
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-sm leading-tight font-serif">
                Rizwan Saeed
              </span>
              <span className="text-[11px] font-semibold text-teal-700">
                Admin Control Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-4 flex-1">
            {/* Dashboard Link */}
            <div>
              <Link href="/admin" onClick={onMobileClose} className={navItemClass("/admin")}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* Website Content Group */}
            <div>
              <button
                type="button"
                onClick={() => setContentOpen(!contentOpen)}
                className={groupHeaderClass}
              >
                <span>Website Content</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${contentOpen ? "rotate-180" : ""}`}
                />
              </button>
              {contentOpen && (
                <div className="mt-1 space-y-0.5 pl-2">
                  <Link href="/admin/homepage" onClick={onMobileClose} className={navItemClass("/admin/homepage")}>
                    <Home className="h-3.5 w-3.5" />
                    <span>Homepage</span>
                  </Link>
                  <Link href="/admin/about" onClick={onMobileClose} className={navItemClass("/admin/about")}>
                    <User className="h-3.5 w-3.5" />
                    <span>About Page</span>
                  </Link>
                  <Link href="/admin/services" onClick={onMobileClose} className={navItemClass("/admin/services")}>
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Services</span>
                  </Link>
                  <Link href="/admin/results" onClick={onMobileClose} className={navItemClass("/admin/results")}>
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Results & Proof</span>
                  </Link>
                  <Link href="/admin/process" onClick={onMobileClose} className={navItemClass("/admin/process")}>
                    <ListOrdered className="h-3.5 w-3.5" />
                    <span>Growth Process</span>
                  </Link>
                  <Link href="/admin/experience" onClick={onMobileClose} className={navItemClass("/admin/experience")}>
                    <History className="h-3.5 w-3.5" />
                    <span>Experience History</span>
                  </Link>
                  <Link href="/admin/faqs" onClick={onMobileClose} className={navItemClass("/admin/faqs")}>
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>FAQs</span>
                  </Link>
                  <Link href="/admin/legal" onClick={onMobileClose} className={navItemClass("/admin/legal")}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Compliance & Legal</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Blog CMS Group */}
            <div>
              <button
                type="button"
                onClick={() => setBlogOpen(!blogOpen)}
                className={groupHeaderClass}
              >
                <span>Blog & Insights</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${blogOpen ? "rotate-180" : ""}`}
                />
              </button>
              {blogOpen && (
                <div className="mt-1 space-y-0.5 pl-2">
                  <Link href="/admin/blog" onClick={onMobileClose} className={navItemClass("/admin/blog")}>
                    <FileText className="h-3.5 w-3.5" />
                    <span>All Articles</span>
                  </Link>
                  <Link href="/admin/blog/new" onClick={onMobileClose} className={navItemClass("/admin/blog/new")}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span>Add New Post</span>
                  </Link>
                  <Link href="/admin/blog/categories" onClick={onMobileClose} className={navItemClass("/admin/blog/categories")}>
                    <FolderTree className="h-3.5 w-3.5" />
                    <span>Categories</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Leads Group */}
            <div>
              <button
                type="button"
                onClick={() => setLeadsOpen(!leadsOpen)}
                className={groupHeaderClass}
              >
                <span>Leads & Inquiries</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${leadsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {leadsOpen && (
                <div className="mt-1 space-y-0.5 pl-2">
                  <Link href="/admin/leads" onClick={onMobileClose} className={navItemClass("/admin/leads")}>
                    <Mail className="h-3.5 w-3.5" />
                    <span>Contact Inquiries</span>
                  </Link>
                  <Link href="/admin/audit-requests" onClick={onMobileClose} className={navItemClass("/admin/audit-requests")}>
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Audit Requests</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Media Group */}
            <div>
              <Link href="/admin/media" onClick={onMobileClose} className={navItemClass("/admin/media")}>
                <ImageIcon className="h-4 w-4" />
                <span>Media Library</span>
              </Link>
            </div>

            {/* SEO Group */}
            <div>
              <button
                type="button"
                onClick={() => setSeoOpen(!seoOpen)}
                className={groupHeaderClass}
              >
                <span>SEO & Redirects</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${seoOpen ? "rotate-180" : ""}`}
                />
              </button>
              {seoOpen && (
                <div className="mt-1 space-y-0.5 pl-2">
                  <Link href="/admin/seo" onClick={onMobileClose} className={navItemClass("/admin/seo")}>
                    <Search className="h-3.5 w-3.5" />
                    <span>Page SEO Settings</span>
                  </Link>
                  <Link href="/admin/redirects" onClick={onMobileClose} className={navItemClass("/admin/redirects")}>
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                    <span>Redirects</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Appearance Group */}
            <div>
              <button
                type="button"
                onClick={() => setAppearanceOpen(!appearanceOpen)}
                className={groupHeaderClass}
              >
                <span>Appearance</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${appearanceOpen ? "rotate-180" : ""}`}
                />
              </button>
                  <Link href="/admin/theme" onClick={onMobileClose} className={navItemClass("/admin/theme")}>
                    <Palette className="h-3.5 w-3.5" />
                    <span>Theme & Brand Colors</span>
                  </Link>
                  <Link href="/admin/navigation" onClick={onMobileClose} className={navItemClass("/admin/navigation")}>
                    <Navigation className="h-3.5 w-3.5" />
                    <span>Navigation Menu</span>
                  </Link>
                  <Link href="/admin/footer" onClick={onMobileClose} className={navItemClass("/admin/footer")}>
                    <MenuIcon className="h-3.5 w-3.5" />
                    <span>Footer Settings</span>
                  </Link>
                  <Link href="/admin/social-links" onClick={onMobileClose} className={navItemClass("/admin/social-links")}>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Social Links</span>
                  </Link>
            </div>

            {/* Settings Group */}
            <div>
              <button
                type="button"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={groupHeaderClass}
              >
                <span>Settings</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${settingsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {settingsOpen && (
                <div className="mt-1 space-y-0.5 pl-2">
                  <Link href="/admin/settings" onClick={onMobileClose} className={navItemClass("/admin/settings")}>
                    <Settings className="h-3.5 w-3.5" />
                    <span>General Settings</span>
                  </Link>
                  <Link href="/admin/settings/analytics" onClick={onMobileClose} className={navItemClass("/admin/settings/analytics")}>
                    <BarChart className="h-3.5 w-3.5" />
                    <span>Analytics Keys</span>
                  </Link>
                  <Link href="/admin/profile" onClick={onMobileClose} className={navItemClass("/admin/profile")}>
                    <User className="h-3.5 w-3.5" />
                    <span>My Profile</span>
                  </Link>
                  <Link href="/admin/users" onClick={onMobileClose} className={navItemClass("/admin/users")}>
                    <Users className="h-3.5 w-3.5" />
                    <span>User Management</span>
                  </Link>
                  <Link href="/admin/settings/security" onClick={onMobileClose} className={navItemClass("/admin/settings/security")}>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Security & Password</span>
                  </Link>
                </div>
              )}
            </div>

            {/* System Group */}
            <div>
              <button
                type="button"
                onClick={() => setSystemOpen(!systemOpen)}
                className={groupHeaderClass}
              >
                <span>System</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${systemOpen ? "rotate-180" : ""}`}
                />
              </button>
              {systemOpen && (
                <div className="mt-1 space-y-0.5 pl-2">
                  <Link href="/admin/activity" onClick={onMobileClose} className={navItemClass("/admin/activity")}>
                    <Activity className="h-3.5 w-3.5" />
                    <span>Activity Logs</span>
                  </Link>
                  <Link href="/admin/system" onClick={onMobileClose} className={navItemClass("/admin/system")}>
                    <Download className="h-3.5 w-3.5" />
                    <span>Backup & Export</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Footer Quick Links & Logout */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2 flex-shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-teal-700 transition-colors shadow-2xs"
            >
              <ExternalLink className="h-3.5 w-3.5 text-teal-700" />
              <span>Visit Live Website</span>
            </a>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout Session</span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
