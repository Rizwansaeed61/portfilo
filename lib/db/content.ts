import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { servicesData, ServiceItem } from "@/content/services";
import { verifiedMetricsData } from "@/content/results";
import { experienceData, ExperienceRole } from "@/content/experience";
import { faqsData, FaqItem } from "@/content/faqs";
import { insightsData, InsightArticle } from "@/content/insights";
import { siteConfig } from "@/content/site-config";

// 1. Revalidation Helper
export async function triggerRevalidation(paths: string[] = ["/", "/services", "/results", "/about", "/insights", "/contact"]) {
  try {
    for (const p of paths) {
      revalidatePath(p);
    }
  } catch (err) {
    console.error("Revalidation Error:", err);
  }
}

// 2. Services Data Provider
export async function getServicesFromDb(): Promise<ServiceItem[]> {
  try {
    const dbServices = await prisma.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { displayOrder: "asc" },
    });

    if (dbServices.length === 0) return servicesData;

    return dbServices.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      headline: s.headline,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      iconName: s.iconName,
      deliverables: JSON.parse(s.deliverablesJson || "[]"),
      targetAudience: "UAE, USA, UK, and global clients.",
      processSteps: JSON.parse(s.processStepsJson || "[]"),
      benefits: JSON.parse(s.benefitsJson || "[]"),
      faq: [],
    }));
  } catch {
    return servicesData;
  }
}

// 3. Results Data Provider
export async function getResultsFromDb() {
  try {
    const dbResults = await prisma.result.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { displayOrder: "asc" },
    });

    if (dbResults.length === 0) return verifiedMetricsData;

    const rev = dbResults.find((r) => r.category === "revenue");
    const spend = dbResults.find((r) => r.category === "spend");
    const exp = dbResults.find((r) => r.category === "experience");
    const markets = dbResults.find((r) => r.category === "markets");

    return {
      primaryRevenue: rev ? rev.metric : verifiedMetricsData.primaryRevenue,
      primaryRevenueLabel: rev ? rev.title : verifiedMetricsData.primaryRevenueLabel,
      primaryRevenueSub: rev ? rev.description : verifiedMetricsData.primaryRevenueSub,
      primarySpend: spend ? spend.metric : verifiedMetricsData.primarySpend,
      primarySpendLabel: spend ? spend.title : verifiedMetricsData.primarySpendLabel,
      primarySpendSub: spend ? spend.description : verifiedMetricsData.primarySpendSub,
      experienceYears: exp ? exp.metric : verifiedMetricsData.experienceYears,
      experienceLabel: exp ? exp.title : verifiedMetricsData.experienceLabel,
      marketsText: markets ? markets.metric : verifiedMetricsData.marketsText,
      marketsLabel: markets ? markets.title : verifiedMetricsData.marketsLabel,
      confidentialityNote: verifiedMetricsData.confidentialityNote,
    };
  } catch {
    return verifiedMetricsData;
  }
}

// 4. Experience Roles Provider
export async function getExperienceFromDb(): Promise<ExperienceRole[]> {
  try {
    const dbExp = await prisma.experience.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    if (dbExp.length === 0) return experienceData;

    return dbExp.map((e) => ({
      id: e.id,
      role: e.role,
      company: e.company,
      location: e.location,
      period: e.period,
      isCurrent: e.isCurrent,
      isFeatured: e.isFeatured,
      responsibilities: JSON.parse(e.responsibilities || "[]"),
    }));
  } catch {
    return experienceData;
  }
}

// 5. FAQs Provider
export async function getFaqsFromDb(): Promise<FaqItem[]> {
  try {
    const dbFaqs = await prisma.fAQ.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { displayOrder: "asc" },
    });

    if (dbFaqs.length === 0) return faqsData;

    return dbFaqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
    }));
  } catch {
    return faqsData;
  }
}

// 6. Blog Articles Provider
export async function getBlogPostsFromDb(): Promise<InsightArticle[]> {
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true, author: true },
      orderBy: { publishedAt: "desc" },
    });

    if (dbPosts.length === 0) return insightsData;

    return dbPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.excerpt,
      publishedAt: p.publishedAt.toISOString().split("T")[0],
      updatedAt: p.updatedAt.toISOString().split("T")[0],
      readTime: p.readTime,
      category: p.category ? p.category.name : "Performance Marketing",
      author: {
        name: p.author ? p.author.name : "Rizwan Saeed",
        role: "Digital Marketing Manager & Shopify Developer",
        image: "/images/rizwan-saeed.jpg",
      },
      directAnswer: p.directAnswer,
      content: p.content,
      tags: JSON.parse(p.tags || "[]"),
    }));
  } catch {
    return insightsData;
  }
}

// 7. Profile Provider
export async function getProfileFromDb() {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) return siteConfig;

    return {
      name: profile.name,
      title: profile.title,
      shortBio: profile.shortBio,
      fullBio: profile.fullBio,
      url: siteConfig.url,
      email: profile.email,
      phone: profile.phone,
      whatsappUrl: siteConfig.whatsappUrl,
      linkedin: profile.linkedin,
      location: profile.location,
      targetMarkets: ["UAE", "USA", "UK", "International"],
      availabilityBadge: siteConfig.availabilityBadge,
      verifiedMetrics: siteConfig.verifiedMetrics,
    };
  } catch {
    return siteConfig;
  }
}
