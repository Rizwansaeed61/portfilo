import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { insightsData } from "@/content/insights";
import { siteConfig } from "@/content/site-config";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Digital Growth & AI Search Insights | Rizwan Saeed",
  description:
    "Tactical guides on performance marketing, Shopify speed optimization, Meta CAPI setup, and Generative Engine Optimization (GEO).",
  alternates: {
    canonical: `${siteConfig.url}/insights`,
  },
};

export default function InsightsIndexPage() {
  return (
    <>
      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container>
          <Breadcrumbs items={[{ name: "Insights", url: "/insights" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              Technical & Strategy Articles
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
              Growth Insights & AI Search Optimization
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              In-depth tactical breakdowns covering performance ad scaling, Shopify conversion rate optimization, and search engine authority.
            </p>
          </div>
        </Container>
      </div>

      <section className="bg-white py-16 border-b border-slate-200/60">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insightsData.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {article.featuredImage && (
                  <Link href={`/insights/${article.slug}`} className="block relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 font-serif group-hover:text-emerald-700 transition-colors leading-snug">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>

                    <div className="p-3 rounded-lg bg-warm-50/80 border border-slate-200/60 text-xs text-slate-700 space-y-1">
                      <span className="font-semibold text-emerald-800 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-emerald-600" />
                        Key Answer Takeaway:
                      </span>
                      <p className="line-clamp-2 text-[11px]">{article.directAnswer}</p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Updated: {formatDate(article.updatedAt)}
                    </span>

                    <Link
                      href={`/insights/${article.slug}`}
                      className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline"
                    >
                      Read Article <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
