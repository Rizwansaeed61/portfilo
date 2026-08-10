import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "dark" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  target?: string;
  rel?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  target,
  rel,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg";

  const variants = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm hover:shadow-md",
    secondary:
      "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300/60 font-semibold",
    outline:
      "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100 hover:border-slate-400",
    dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
    link: "bg-transparent text-emerald-700 hover:text-emerald-800 underline-offset-4 hover:underline p-0 h-auto font-normal",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 min-h-[36px]",
    md: "text-sm px-5 py-2.5 min-h-[44px]",
    lg: "text-base px-6 py-3.5 min-h-[48px] font-semibold",
  };

  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    variant !== "link" && sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Saving...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
