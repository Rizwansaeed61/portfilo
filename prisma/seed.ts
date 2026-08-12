import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth/crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with Rizwan Saeed CV data & Admin credentials...");

  // 1. Initial Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "rizwansaeed610@gmail.com";
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "McSe2008@@@";
  const passwordHash = hashPassword(initialPassword);

  const admin1 = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      status: "ACTIVE",
    },
    create: {
      email: adminEmail,
      name: "Rizwan Saeed",
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  const admin2 = await prisma.user.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      passwordHash,
      status: "ACTIVE",
    },
    create: {
      email: adminEmail.toLowerCase(),
      name: "Rizwan Saeed",
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  console.log(`Created Initial Super Admin: ${admin1.email}`);

  // 2. Profile
  await prisma.profile.upsert({
    where: { id: "profile-rizwan" },
    update: {},
    create: {
      id: "profile-rizwan",
      name: "Rizwan Saeed",
      title: "Digital Marketing Manager, Performance Marketer & Shopify Developer",
      shortBio: "Helping businesses in the UAE, USA, UK and worldwide acquire qualified leads, scale online revenue and build high-converting e-commerce systems.",
      fullBio: "Rizwan Saeed is a Digital Marketing Manager and Shopify Developer specializing in performance marketing, lead generation, e-commerce growth and conversion-focused web development. He has managed campaigns and digital projects for hospitality, retail and B2B brands across the UAE, USA and UK.",
      photoUrl: "/images/rizwan-saeed.png",
      location: "Multan, Pakistan",
      email: "Hello@RizwanSaddique.site",
      phone: "+92 306 4402649",
      whatsapp: "+923064402649",
      linkedin: "https://linkedin.com/in/rizwansaeed610",
      yearsExperience: "5+ Years",
      marketsServed: "UAE · USA · UK",
    },
  });

  // 3. Homepage Hero
  await prisma.homepageHero.upsert({
    where: { id: "homepage-hero" },
    update: {},
    create: {
      id: "homepage-hero",
      smallLabel: "Available for selected international projects",
      name: "Rizwan Saeed",
      title: "Digital Growth Specialist",
      mainHeading: "Need More Qualified Leads, Online Sales and Measurable ROI?",
      supportingText: "I help businesses grow through performance marketing, high-converting websites, Shopify development and intelligent automation.",
      subheadline: "Digital Marketing Manager and Shopify Developer with 5+ years of international experience across the UAE, USA and UK.",
      primaryCtaText: "Book a Free Strategy Call",
      primaryCtaUrl: "/contact",
      secondaryCtaText: "View My Results",
      secondaryCtaUrl: "/results",
      auditLinkText: "Request a Free Website or Ads Audit",
      auditLinkUrl: "/contact?type=audit",
      portraitImage: "/images/rizwan-saeed.png",
      availabilityBadge: "Available for selected international projects",
    },
  });

  // 4. Experience Roles (All 8 CV Roles)
  const experienceRoles = [
    {
      id: "exp-marina-byblos",
      role: "Digital Marketing Manager",
      company: "Marina Byblos Hotel",
      location: "Dubai Marina, UAE",
      period: "October 2024 – Present",
      isCurrent: true,
      isFeatured: true,
      responsibilities: JSON.stringify([
        "Architected direct booking acquisition strategies for a prestigious 4-star Dubai Marina hotel property.",
        "Managed multi-channel Meta Ads and Google Ads campaigns targeting GCC and international travelers.",
        "Promoted high-traffic F&B nightlife and dining venues across Dubai Marina.",
        "Engineered custom responsive website for the hotel's flagship English sports bar venue to increase direct reservations.",
        "Tracked and optimized direct booking CPA and return on ad spend (ROAS)."
      ]),
      displayOrder: 1,
    },
    {
      id: "exp-freelance",
      role: "Freelance Web Developer & Media Buyer",
      company: "International Clients",
      location: "USA, UK & UAE",
      period: "January 2020 – Present",
      isCurrent: true,
      isFeatured: true,
      responsibilities: JSON.stringify([
        "Built custom Shopify stores and high-converting WordPress/Next.js landing pages for international e-commerce and service brands.",
        "Managed over AED 850K in performance ad spend across Meta Ads and Google Ads with verifiable revenue generation.",
        "Optimized e-commerce conversion rates, payment gateways, Liquid themes, and custom Klaviyo marketing automation flows.",
        "Executed technical page-speed optimizations to achieve sub-3 second mobile load times and green Lighthouse metrics."
      ]),
      displayOrder: 2,
    },
    {
      id: "exp-skillsrator",
      role: "Digital Marketing Trainer / Mentor",
      company: "Skillsrator",
      location: "Multan, Pakistan / Remote",
      period: "January 2024 – January 2025",
      isCurrent: false,
      isFeatured: true,
      responsibilities: JSON.stringify([
        "Trained and mentored upcoming digital marketers in performance media buying, audience research, and conversion tracking.",
        "Delivered practical modules on Meta Ads Manager, Google Search ads, and e-commerce analytics."
      ]),
      displayOrder: 3,
    },
    {
      id: "exp-green-crystal",
      role: "Digital Marketing Manager",
      company: "Green Crystal Ventilators & Air Filters",
      location: "Dubai, UAE",
      period: "January 2023 – November 2024",
      isCurrent: false,
      isFeatured: true,
      responsibilities: JSON.stringify([
        "Led B2B lead generation campaigns for industrial ventilation and air filtration solutions across the UAE market.",
        "Managed Google Search ads capturing commercial intent queries and Meta lead-gen funnels for industrial clients.",
        "Developed company web properties and optimized lead capture forms to improve B2B inquiry quality."
      ]),
      displayOrder: 4,
    },
    {
      id: "exp-extreme-commerce",
      role: "Digital Marketing Trainer",
      company: "Extreme Commerce",
      location: "Pakistan / Remote",
      period: "January 2023 – June 2024",
      isCurrent: false,
      isFeatured: false,
      responsibilities: JSON.stringify([
        "Instructed students on e-commerce marketing, digital advertising funnels, and performance optimization techniques."
      ]),
      displayOrder: 5,
    },
    {
      id: "exp-vti",
      role: "Digital Marketing Trainer",
      company: "Vocational Training Institute",
      location: "Multan, Pakistan",
      period: "January 2022 – January 2023",
      isCurrent: false,
      isFeatured: false,
      responsibilities: JSON.stringify([
        "Conducted vocational training courses in social media management, search engine optimization, and basic web skills."
      ]),
      displayOrder: 6,
    },
    {
      id: "exp-mamiora",
      role: "Shopify Developer",
      company: "Mamiora",
      location: "Remote / International",
      period: "February 2022 – February 2023",
      isCurrent: false,
      isFeatured: false,
      responsibilities: JSON.stringify([
        "Customized Shopify theme layouts using Liquid, HTML5, and CSS3 to enhance mobile user experience and checkout flow."
      ]),
      displayOrder: 7,
    },
    {
      id: "exp-ahmed-almazrouei",
      role: "Social Media Manager",
      company: "Ahmed Almazrouei Group",
      location: "Abu Dhabi, UAE",
      period: "February 2020 – October 2022",
      isCurrent: false,
      isFeatured: false,
      responsibilities: JSON.stringify([
        "Managed social media branding, content strategy, and community engagement for corporate group entities in Abu Dhabi."
      ]),
      displayOrder: 8,
    },
  ];

  for (const exp of experienceRoles) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {},
      create: exp,
    });
  }

  // 5. Verified Results & Metrics
  const results = [
    {
      id: "res-revenue",
      title: "Revenue Generated",
      metric: "AED 4.2M+",
      subtitle: "Direct & Assisted Sales",
      description: "Generated across client digital growth projects through strategic performance marketing.",
      category: "revenue",
      displayOrder: 1,
    },
    {
      id: "res-spend",
      title: "Ad Spend Managed",
      metric: "AED 850K",
      subtitle: "Meta & Google Ads",
      description: "Managed efficiently across Meta Ads and Google Search/Performance Max campaigns.",
      category: "spend",
      displayOrder: 2,
    },
    {
      id: "res-experience",
      title: "International Experience",
      metric: "5+ Years",
      subtitle: "Digital & E-Commerce",
      description: "Proven track record managing digital growth campaigns and e-commerce infrastructure continuously since 2020.",
      category: "experience",
      displayOrder: 3,
    },
    {
      id: "res-markets",
      title: "Key Markets Served",
      metric: "UAE · USA · UK",
      subtitle: "Global Client Scope",
      description: "Deep understanding of buyer behavior, ad costs, payment habits, and targeting strategies in major international markets.",
      category: "markets",
      displayOrder: 4,
    },
  ];

  for (const res of results) {
    await prisma.result.upsert({
      where: { id: res.id },
      update: {},
      create: res,
    });
  }

  // 6. Blog Categories
  const categories = [
    { id: "cat-meta", name: "Meta Ads", slug: "meta-ads", description: "Facebook & Instagram paid social scaling strategies." },
    { id: "cat-google", name: "Google Ads", slug: "google-ads", description: "Search intent & Performance Max campaigns." },
    { id: "cat-shopify", name: "Shopify", slug: "shopify", description: "Liquid theme code & store conversion rate optimization." },
    { id: "cat-seo", name: "SEO & AI Search", slug: "seo", description: "Generative Engine Optimization & technical indexing." },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    });
  }

  // 7. Legal & Compliance Pages
  await prisma.legalPage.upsert({
    where: { slug: "privacy" },
    update: {},
    create: {
      slug: "privacy",
      title: "Privacy Policy",
      badgeText: "Legal Document",
      lastUpdated: "August 8, 2026",
      noticeText: "Notice: This document is a privacy policy clearly outlining how client and user data is processed.",
      sectionsJson: JSON.stringify([
        {
          title: "1. Information We Collect",
          content: "When you submit a project inquiry or contact request through this website, we collect your full name, work email address, phone or WhatsApp number, company name, website URL, target market, and project details."
        },
        {
          title: "2. How We Use Your Information",
          content: "Information submitted via our contact forms is strictly used to evaluate your business requirements, communicate regarding your strategy session, and provide requested digital marketing recommendations. We do not sell or share personal data with third parties."
        },
        {
          title: "3. Analytics & Cookies",
          content: "This website uses privacy-conscious analytics (Google Analytics 4, GTM, Meta Pixel) to measure site traffic and event interactions. You can manage or disable cookie preferences in your browser settings."
        },
        {
          title: "4. Data Protection & Security",
          content: "We implement industry-standard input validation, honeypot spam protection, and server-side encryption to safeguard your data against unauthorized access."
        },
        {
          title: "5. Contact Information",
          content: "For privacy-related inquiries or data removal requests, contact: Hello@RizwanSaddique.site."
        }
      ]),
      seoTitle: "Privacy Policy | Rizwan Saeed",
      seoDescription: "Privacy Policy for Rizwan Saeed's personal-brand and performance marketing website.",
    },
  });

  await prisma.legalPage.upsert({
    where: { slug: "terms" },
    update: {},
    create: {
      slug: "terms",
      title: "Terms of Service",
      badgeText: "Legal Document",
      lastUpdated: "August 8, 2026",
      noticeText: "Notice: This document outlines the terms and conditions for using this website and consulting services.",
      sectionsJson: JSON.stringify([
        {
          title: "1. Website Usage",
          content: "By accessing and using this website, you agree to comply with these terms. The content provided on this site is for informational and business consulting inquiry purposes."
        },
        {
          title: "2. Intellectual Property",
          content: "All original text, strategy frameworks, code samples, and website assets are owned by Rizwan Saeed unless otherwise stated. Reproduction without written consent is prohibited."
        },
        {
          title: "3. Performance Disclaimers",
          content: "Case studies and historical revenue metrics (e.g., AED 4.2M+ Revenue) reflect past project outcomes. Advertising performance depends on market factors, ad budgets, product offer quality, and audience demand. We do not guarantee specific monetary returns or fixed conversion rates."
        },
        {
          title: "4. Service Agreements",
          content: "Specific client engagements, ad management retainers, and web development projects are governed by separate, formal master service agreements (MSAs) executed prior to project kickoff."
        }
      ]),
      seoTitle: "Terms of Service | Rizwan Saeed",
      seoDescription: "Terms of Service for Rizwan Saeed's website and marketing consulting services.",
    },
  });

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
