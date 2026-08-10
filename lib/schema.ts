import { siteConfig } from "@/content/site-config";
import { FaqItem } from "@/content/faqs";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "jobTitle": siteConfig.title,
    "url": siteConfig.url,
    "sameAs": [
      siteConfig.linkedin,
      siteConfig.whatsappUrl
    ],
    "email": siteConfig.email,
    "telephone": siteConfig.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Multan",
      "addressCountry": "PK"
    },
    "description": siteConfig.fullBio,
    "knowsAbout": [
      "Digital Marketing",
      "Performance Marketing",
      "Meta Ads",
      "Google Ads",
      "Shopify Development",
      "Liquid Development",
      "Conversion Rate Optimization",
      "Search Engine Optimization",
      "Generative Engine Optimization"
    ]
  };
}

export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${siteConfig.name} — ${siteConfig.title}`,
    "image": `${siteConfig.url}/images/rizwan-saeed.jpg`,
    "url": siteConfig.url,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Multan",
      "addressCountry": "PK"
    },
    "areaServed": [
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "Worldwide" }
    ],
    "priceRange": "$$$",
    "description": siteConfig.shortBio
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${siteConfig.name} Portfolio & Services`,
    "url": siteConfig.url,
    "publisher": {
      "@type": "Person",
      "name": siteConfig.name
    }
  };
}

export function getFaqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteConfig.url}${item.url}`
    }))
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": article.authorName,
      "url": siteConfig.url
    },
    "publisher": {
      "@type": "Person",
      "name": siteConfig.name,
      "url": siteConfig.url
    }
  };
}
