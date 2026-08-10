export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  country: string;
  metric: string;
  description: string;
  liveUrl?: string;
  domain?: string;
  featured: boolean;
  tags?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
}

export const defaultProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Marina Byblos Hotel – Dubai Marina",
    category: "Hospitality & Lead Gen",
    image: "/images/project-findash.png",
    client: "Marina Byblos Hotel",
    country: "Dubai, UAE 🇦🇪",
    metric: "+185% Direct Bookings",
    description: "Multi-channel Google Ads & Meta Ads campaign to boost direct luxury suite bookings and F&B restaurant inquiries.",
    liveUrl: "https://marinabyblos-hotel.com",
    domain: "marinabyblos-hotel.com",
    featured: true,
    tags: ["Google Search Ads", "Meta Remarketing", "Conversion Rate Optimization"],
    challenge: "High dependency on third-party OTAs with high commission fees and low direct booking numbers.",
    solution: "Built targeted localized Search Ads for high-intent keywords, combined with dynamic Meta retargeting campaigns and landing page speed optimization.",
    results: [
      "+185% increase in direct website suite bookings within 90 days",
      "38% reduction in customer acquisition cost (CAC)",
      "4.2x Return on Ad Spend (ROAS) across all digital channels"
    ]
  },
  {
    id: "proj-2",
    title: "Green Crystal Ventilators – B2B Industrial",
    category: "B2B Lead Generation",
    image: "/images/project-industrial.png",
    client: "Green Crystal Ventilators",
    country: "UAE Industrial 🇦🇪",
    metric: "AED 1.2M Contract Pipeline",
    description: "Commercial intent PPC and localized SEO for industrial ventilation systems across UAE manufacturing sectors.",
    liveUrl: "https://greencrystal.ae",
    domain: "greencrystal.ae",
    featured: true,
    tags: ["B2B Search Ads", "Technical SEO", "LinkedIn Ads"],
    challenge: "Low online visibility for specialized industrial HVAC and ventilation queries across UAE industrial zones.",
    solution: "Designed high-converting B2B landing pages and executed targeted Google Search & LinkedIn campaigns focused on MEP contractors and factory managers.",
    results: [
      "AED 1.2M qualified contract pipeline generated in 6 months",
      "Top 3 Google search rankings for 25+ high-intent B2B keywords",
      "62% conversion rate increase on inbound RFQ (Quote) forms"
    ]
  },
  {
    id: "proj-3",
    title: "Mamiora – D2C Shopify Store",
    category: "Shopify & Liquid Coding",
    image: "/images/project-wanderly.png",
    client: "Mamiora Brand",
    country: "International (USA & UK)",
    metric: "3.8x ROAS Achieved",
    description: "Custom Shopify theme design, Liquid optimization, and full-funnel Meta Ads strategy for high conversion.",
    liveUrl: "https://mamiora.com",
    domain: "mamiora.com",
    featured: true,
    tags: ["Shopify Liquid", "Meta Video Ads", "Klaviyo Email Flows"],
    challenge: "Slow mobile loading times and drop-offs during cart checkout led to high ad spending with poor profitability.",
    solution: "Rebuilt theme code using custom Liquid for sub-second page loads, integrated 1-click upsells, and launched full-funnel Meta & TikTok video ad creative testing.",
    results: [
      "3.8x overall Return on Ad Spend (ROAS) sustained over 6 months",
      "+45% increase in Average Order Value (AOV) via strategic upsells",
      "Page load speed improved from 4.2s to 1.1s on mobile"
    ]
  },
  {
    id: "proj-4",
    title: "Urban Edge – Streetwear Apparel",
    category: "Shopify & Liquid Coding",
    image: "/images/project-streetwear.png",
    client: "Urban Edge Apparel",
    country: "United Kingdom 🇬🇧",
    metric: "+210% E-comm Revenue",
    description: "D2C scaling strategy, TikTok pixel optimization, and custom Shopify store redesign for fashion apparel.",
    liveUrl: "https://urbanedge-apparel.co.uk",
    domain: "urbanedge-apparel.co.uk",
    featured: true,
    tags: ["Shopify D2C", "TikTok Shopping", "Influencer Ads"],
    challenge: "Low customer retention and high cart abandonment rate during seasonal product drops.",
    solution: "Implemented automated SMS cart recovery, VIP drop waitlists, and high-energy TikTok Spark Ads.",
    results: [
      "+210% year-over-year e-commerce revenue growth",
      "28% repeat customer purchase rate within 60 days",
      "Sold out launch collection in under 48 hours"
    ]
  },
  {
    id: "proj-5",
    title: "EcoPlants – Sustainable Gardening",
    category: "E-Commerce & SEO",
    image: "/images/project-greenly.png",
    client: "EcoPlants Direct",
    country: "USA Nationwide 🇺🇸",
    metric: "4.5x Organic ROI",
    description: "Organic search authority building, content marketing, and Google Shopping feed optimization for nationwide delivery.",
    liveUrl: "https://ecoplantsdirect.com",
    domain: "ecoplantsdirect.com",
    featured: true,
    tags: ["Google Shopping", "Organic SEO", "Conversion Design"],
    challenge: "Struggling to compete against major retail giants on broad search terms with high CPC costs.",
    solution: "Focused on hyper-targeted long-tail SEO content hubs and optimized Google Shopping product feeds with custom custom labels.",
    results: [
      "4.5x ROI on organic search traffic within 8 months",
      "+320k organic monthly search visits",
      "Google Shopping Impression Share increased by 54%"
    ]
  }
];

