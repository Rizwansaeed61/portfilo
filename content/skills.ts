export interface SkillCategory {
  categoryName: string;
  skills: string[];
}

export const skillsCategories: SkillCategory[] = [
  {
    categoryName: "Performance Marketing",
    skills: [
      "Meta Ads (FB & IG)",
      "Google Search & PMax",
      "TikTok Ads",
      "CBO / ABO Campaign Architecture",
      "Funnel Retargeting",
      "Audience Research & Lookalikes",
      "CPA & ROAS Optimization"
    ]
  },
  {
    categoryName: "Web & E-Commerce",
    skills: [
      "Shopify Store Setup",
      "Liquid Theme Code",
      "WordPress & WooCommerce",
      "Next.js & Tailwind CSS",
      "PageFly & Layout Customization",
      "Payment Gateway Integration",
      "Speed & Core Web Vitals"
    ]
  },
  {
    categoryName: "Analytics & SEO",
    skills: [
      "Google Analytics 4 (GA4)",
      "Google Tag Manager (GTM)",
      "Facebook Pixel & CAPI",
      "Conversion Tracking Setup",
      "Semrush & Ahrefs",
      "Technical SEO & Schema JSON-LD",
      "Generative Engine Optimization (GEO)"
    ]
  },
  {
    categoryName: "Marketing Systems & Automation",
    skills: [
      "Klaviyo Email Automation",
      "B2B Lead Qualification Funnels",
      "CRM Integration (HubSpot / ActiveCampaign)",
      "WhatsApp & Email Follow-up Strategy",
      "Honeypot Spam Protection",
      "Landing Page A/B Testing"
    ]
  }
];
