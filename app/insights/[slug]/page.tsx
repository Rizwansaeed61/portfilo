import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { insightsData } from "@/content/insights";
import { siteConfig } from "@/content/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { getArticleSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, User, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

interface InsightArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightsData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: InsightArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | Rizwan Saeed Insights`,
    description: article.description,
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: `${siteConfig.url}/insights/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      url: `${siteConfig.url}/insights/${article.slug}`,
    },
  };
}

export default async function InsightArticlePage({ params }: InsightArticlePageProps) {
  const { slug } = await params;
  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={getArticleSchema({
          title: article.title,
          description: article.description,
          url: `${siteConfig.url}/insights/${article.slug}`,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          authorName: article.author.name,
        })}
      />

      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { name: "Insights", url: "/insights" },
              { name: article.title, url: `/insights/${article.slug}` },
            ]}
          />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
                {article.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
              {article.title}
            </h1>

            {/* Author and Date Meta Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 font-bold text-slate-900">
                <User className="h-4 w-4 text-emerald-600" />
                {article.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                Published: {formatDate(article.publishedAt)}
              </span>
              <span>Updated: {formatDate(article.updatedAt)}</span>
            </div>
          </div>
        </Container>
      </div>

      <section className="bg-white py-12 sm:py-16 border-b border-slate-200/60">
        <Container size="narrow">
          {/* Direct Answer Featured Snippet Box */}
          <div className="mb-10 p-6 rounded-2xl bg-warm-50 border-2 border-emerald-500/40 shadow-xs space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Direct Answer Summary
            </div>
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
              {article.directAnswer}
            </p>
          </div>

          {/* Article Main Body Content */}
          <div className="prose prose-slate prose-lg max-w-none space-y-6 text-slate-800 leading-relaxed">
            {article.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold font-serif text-slate-900 pt-6 border-t border-slate-100">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-bold font-serif text-slate-900 pt-4">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Article Footer Tags & CTAs */}
          <div className="mt-12 pt-8 border-t border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">Tags:</span>
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg font-serif">Need Help Implementing These Growth Tactics?</h3>
                <p className="text-xs text-slate-300">Book a private strategy session with Rizwan Saeed.</p>
              </div>
              <Button href="/contact" variant="primary" size="md" className="whitespace-nowrap">
                Book Strategy Call <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-between pt-4">
              <Link href="/insights" className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline">
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Insights Index
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
