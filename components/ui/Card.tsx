import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "dark" | "flat";
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  variant = "default",
  hoverEffect = true,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white border border-slate-200/80 shadow-xs",
    bordered: "bg-white border border-slate-300",
    dark: "bg-slate-900 border border-slate-800 text-white shadow-md",
    flat: "bg-slate-50 border border-slate-200/60",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 sm:p-8 transition-all duration-200",
        variants[variant],
        hoverEffect && "hover:shadow-md hover:border-slate-300 transform hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
