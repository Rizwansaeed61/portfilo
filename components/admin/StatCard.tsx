import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  href?: string;
  accentColor?: "teal" | "amber" | "emerald" | "slate" | "indigo";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  href,
  accentColor = "teal",
}: StatCardProps) {
  const accentClasses = {
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  const CardWrapper = href ? Link : "div";

  return (
    <CardWrapper
      href={href || "#"}
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${accentClasses[accentColor]}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
            {value}
          </p>
          {href && (
            <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </div>
      </div>

      {subtitle && (
        <p className="text-xs text-slate-500 font-medium mt-3 pt-2 border-t border-slate-100">
          {subtitle}
        </p>
      )}
    </CardWrapper>
  );
}
