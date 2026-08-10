import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems = [{ name: "Home", url: "/" }, ...items];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(fullItems)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-slate-500">
        <ol className="flex items-center gap-1.5 flex-wrap">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {index === 0 ? (
                  <Link
                    href={item.url}
                    className="flex items-center hover:text-emerald-700 transition-colors"
                  >
                    <Home className="h-3.5 w-3.5 mr-1" />
                    <span>{item.name}</span>
                  </Link>
                ) : isLast ? (
                  <span className="font-semibold text-slate-800" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.url} className="hover:text-emerald-700 transition-colors">
                    {item.name}
                  </Link>
                )}
                {!isLast && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
