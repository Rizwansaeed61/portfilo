import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  questionH2: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
  theme?: "light" | "dark";
}

export function SectionHeading({
  badge,
  questionH2,
  subtitle,
  alignment = "left",
  className,
  theme = "light",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        alignment === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {badge && (
        <div className={cn("mb-3", alignment === "center" && "flex justify-center")}>
          <Badge variant={theme === "dark" ? "dark" : "emerald"}>{badge}</Badge>
        </div>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug sm:leading-tight",
          theme === "dark" ? "text-white" : "text-slate-900"
        )}
      >
        {questionH2}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed",
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
