"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save, Navigation, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  external: boolean;
  active: boolean;
}

export default function AdminNavigationCMSPage() {
  const [navItems, setNavItems] = useState<NavLinkItem[]>([
    { id: "1", label: "Home", href: "/", external: false, active: true },
    { id: "2", label: "About", href: "/about", external: false, active: true },
    { id: "3", label: "Services", href: "/services", external: false, active: true },
    { id: "4", label: "Projects", href: "/projects", external: false, active: true },
    { id: "5", label: "Process", href: "/process", external: false, active: true },
    { id: "6", label: "Blog", href: "/insights", external: false, active: true },
    { id: "7", label: "Contact", href: "/contact", external: false, active: true },
  ]);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("header_navigation_cms");
      if (saved) {
        setNavItems(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleItemChange = (id: string, field: keyof NavLinkItem, value: any) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= navItems.length) return;

    const updated = [...navItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setNavItems(updated);
  };

  const handleRemove = (id: string) => {
    setNavItems(navItems.filter((i) => i.id !== id));
  };

  const handleAdd = () => {
    const newItem: NavLinkItem = {
      id: Date.now().toString(),
      label: "New Link",
      href: "/new-link",
      external: false,
      active: true,
    };
    setNavItems([...navItems, newItem]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      localStorage.setItem("header_navigation_cms", JSON.stringify(navItems));
      window.dispatchEvent(new CustomEvent("header_nav_updated"));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Header Navigation Menu CMS"
        subtitle="Manage header navigation items, reorder links, and configure internal/external menu routes."
        actionText="Add Menu Link"
        actionIcon={Plus}
        onAction={handleAdd}
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Navigation menu settings updated successfully! Header revalidated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Navigation className="h-5 w-5 text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900 font-serif">Header Menu Links</h2>
          </div>

          <div className="space-y-3">
            {navItems.map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <MoveUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === navItems.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <MoveDown className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleItemChange(item.id, "label", e.target.value)}
                    placeholder="Link Label (e.g. Services)"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-bold"
                  />

                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => handleItemChange(item.id, "href", e.target.value)}
                    placeholder="URL Path (e.g. /services)"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
                  />
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`active-${item.id}`}
                      checked={item.active}
                      onChange={(e) => handleItemChange(item.id, "active", e.target.checked)}
                      className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600"
                    />
                    <label htmlFor={`active-${item.id}`} className="text-xs font-bold text-slate-700">
                      Active
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <Button type="button" variant="outline" size="md" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1.5 text-teal-700" />
            Add Menu Item
          </Button>

          <Button type="submit" variant="primary" size="lg" isLoading={saving}>
            <Save className="h-4 w-4 mr-2" />
            Save Header Navigation
          </Button>
        </div>
      </form>
    </div>
  );
}
