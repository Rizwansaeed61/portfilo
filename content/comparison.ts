export interface ComparisonRow {
  feature: string;
  freelancer: string;
  agency: string;
  rizwanApproach: string;
}

export const comparisonData: ComparisonRow[] = [
  {
    feature: "Marketing Strategy",
    freelancer: "Often focused on single task execution without multi-channel strategy.",
    agency: "Comprehensive strategy, but often delegated to junior strategists.",
    rizwanApproach: "End-to-end growth strategy connecting ads, landing pages, and conversion tracking."
  },
  {
    feature: "Paid Advertising",
    freelancer: "Limited to simple campaign setup; minimal creative or conversion testing.",
    agency: "Managed by ad ops team; account changes often follow rigid monthly templates.",
    rizwanApproach: "Continuous CPA/ROAS optimization, structured creative testing, and CAPI tracking."
  },
  {
    feature: "Website Implementation",
    freelancer: "May rely on pre-built templates or third-party page builders.",
    agency: "Requires separate web dev team, adding project delays and extra costs.",
    rizwanApproach: "Custom Next.js landing pages or native Shopify Liquid code engineered for sub-3s speed."
  },
  {
    feature: "Tracking & Analytics",
    freelancer: "Basic Google Analytics or basic pixel install; prone to tracking gaps.",
    agency: "Standard GA4 analytics dashboard setup.",
    rizwanApproach: "Server-side Conversions API (CAPI), GTM event mapping, and business net metric attribution."
  },
  {
    feature: "Shopify & E-Commerce",
    freelancer: "Basic theme setup; relies on heavy recurring monthly apps.",
    agency: "High project fees for standard theme customization.",
    rizwanApproach: "Clean Liquid code, zero app bloat, optimized checkout, and high mobile performance."
  },
  {
    feature: "Direct Communication",
    freelancer: "Varies; single point of contact but availability can be inconsistent.",
    agency: "Passed through account managers, creating communication lags.",
    rizwanApproach: "Direct communication with the lead specialist executing your campaigns and code."
  },
  {
    feature: "Business-Outcome Focus",
    freelancer: "Measures deliverable completion (e.g. 'ads created' or 'page built').",
    agency: "Often reports vanity metrics like impressions, clicks, and reach.",
    rizwanApproach: "Driven strictly by revenue, net leads, target CPA, and measurable marketing ROI."
  },
  {
    feature: "International Experience",
    freelancer: "Usually localized to single domestic market.",
    agency: "Broad market experience, but high retainer costs for cross-border accounts.",
    rizwanApproach: "Proven track record managing campaigns for UAE, USA, UK, and global clients."
  }
];
