import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "amber" | "dark" | "outline" | "ghost";
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = "emerald", className, dot = false }: BadgeProps) {
  const variants = {
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    amber: "bg-amber-50 text-amber-900 border-amber-200",
    dark: "bg-slate-900 text-slate-100 border-slate-700",
    outline: "bg-white text-slate-700 border-slate-300",
    ghost: "bg-slate-100 text-slate-800 border-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border rounded-full tracking-wide shadow-xs",
        variants[variant],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}
      {children}
    </span>
  );
}
