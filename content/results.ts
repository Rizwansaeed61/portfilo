export interface ResultMetric {
  title: string;
  metric: string;
  subtitle: string;
  description: string;
  category: "revenue" | "spend" | "experience" | "markets";
}

export interface CaseStudyPlaceholder {
  id: string;
  title: string;
  industry: string;
  market: string;
  servicesProvided: string[];
  keyOutcome: string;
  description: string;
}

export const verifiedMetricsData = {
  primaryRevenue: "AED 4.2M+",
  primaryRevenueLabel: "Revenue Generated",
  primaryRevenueSub: "Generated across client digital growth projects through strategic performance marketing.",
  primarySpend: "AED 850K",
  primarySpendLabel: "Ad Spend Managed",
  primarySpendSub: "Managed efficiently across Meta Ads and Google Search/Performance Max campaigns.",
  experienceYears: "5+ Years",
  experienceLabel: "International Experience",
  marketsText: "UAE · USA · UK",
  marketsLabel: "Key Markets Served",
  confidentialityNote: "Detailed campaign breakdowns, screenshots, and account structures can be presented in a private strategy session where client non-disclosure agreements allow."
};

export const caseStudyPlaceholders: CaseStudyPlaceholder[] = [
  {
    id: "hospitality-direct-booking",
    title: "Dubai Marina Hotel Direct Booking Campaign",
    industry: "Hospitality & Dining",
    market: "Dubai, UAE",
    servicesProvided: ["Meta Ads", "Google Search Ads", "Landing Page Dev"],
    keyOutcome: "Increased direct venue inquiries & reduced third-party OTA dependency",
    description: "Architected a dual Meta and Google Search strategy to capture high-intent Dubai tourists and local residents, driving direct table bookings and hotel reservations."
  },
  {
    id: "b2b-industrial-ventilation",
    title: "UAE B2B Industrial Lead Acquisition",
    industry: "Industrial & Manufacturing",
    market: "Dubai & Abu Dhabi, UAE",
    servicesProvided: ["Google Ads", "B2B Lead Gen", "Landing Page Optimization"],
    keyOutcome: "Captured commercial search intent and scaled qualified B2B inquiries",
    description: "Eliminated low-intent consumer search traffic with negative keywords while building a streamlined qualification funnel for high-ticket industrial filtration systems."
  },
  {
    id: "ecommerce-shopify-scaling",
    title: "International Shopify Store Optimization & Meta Scaling",
    industry: "E-Commerce & Retail",
    market: "USA & UK",
    servicesProvided: ["Shopify Liquid Dev", "Meta Ads CAPI", "Klaviyo Automation"],
    keyOutcome: "Improved store conversion rate & scaled ROAS",
    description: "Re-engineered Shopify store layout for sub-3s mobile speeds, implemented Meta Conversions API (CAPI), and launched retargeting sequences."
  }
];
