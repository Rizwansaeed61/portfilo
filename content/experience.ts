export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  isFeatured?: boolean;
  active?: boolean;
  displayOrder?: number;
  responsibilities: string[];
}

export const experienceData: ExperienceRole[] = [
  {
    id: "marina-byblos",
    role: "Digital Marketing Manager",
    company: "Marina Byblos Hotel",
    location: "Dubai Marina, UAE",
    period: "October 2024 – Present",
    isCurrent: true,
    isFeatured: true,
    responsibilities: [
      "Architected direct booking acquisition strategies for a prestigious 4-star Dubai Marina hotel property.",
      "Managed multi-channel Meta Ads and Google Ads campaigns targeting GCC and international travelers.",
      "Promoted high-traffic F&B nightlife and dining venues across Dubai Marina.",
      "Engineered custom responsive website for the hotel's flagship English sports bar venue to increase direct reservations.",
      "Tracked and optimized direct booking CPA and return on ad spend (ROAS)."
    ]
  },
  {
    id: "freelance-growth",
    role: "Freelance Web Developer & Media Buyer",
    company: "International Clients",
    location: "USA, UK & UAE",
    period: "January 2020 – Present",
    isCurrent: true,
    isFeatured: true,
    responsibilities: [
      "Built custom Shopify stores and high-converting WordPress/Next.js landing pages for international e-commerce and service brands.",
      "Managed over AED 850K in performance ad spend across Meta Ads and Google Ads with verifiable revenue generation.",
      "Optimized e-commerce conversion rates, payment gateways, Liquid themes, and custom Klaviyo marketing automation flows.",
      "Executed technical page-speed optimizations to achieve sub-3 second mobile load times and green Lighthouse metrics."
    ]
  },
  {
    id: "skillsrator",
    role: "Digital Marketing Trainer / Mentor",
    company: "Skillsrator",
    location: "Multan, Pakistan / Remote",
    period: "January 2024 – January 2025",
    isCurrent: false,
    isFeatured: true,
    responsibilities: [
      "Trained and mentored upcoming digital marketers in performance media buying, audience research, and conversion tracking.",
      "Delivered practical modules on Meta Ads Manager, Google Search ads, and e-commerce analytics."
    ]
  },
  {
    id: "green-crystal",
    role: "Digital Marketing Manager",
    company: "Green Crystal Ventilators & Air Filters",
    location: "Dubai, UAE",
    period: "January 2023 – November 2024",
    isCurrent: false,
    isFeatured: true,
    responsibilities: [
      "Led B2B lead generation campaigns for industrial ventilation and air filtration solutions across the UAE market.",
      "Managed Google Search ads capturing commercial intent queries and Meta lead-gen funnels for industrial clients.",
      "Developed company web properties and optimized lead capture forms to improve B2B inquiry quality."
    ]
  },
  {
    id: "extreme-commerce",
    role: "Digital Marketing Trainer",
    company: "Extreme Commerce",
    location: "Pakistan / Remote",
    period: "January 2023 – June 2024",
    isCurrent: false,
    isFeatured: false,
    responsibilities: [
      "Instructed students on e-commerce marketing, digital advertising funnels, and performance optimization techniques."
    ]
  },
  {
    id: "vti",
    role: "Digital Marketing Trainer",
    company: "Vocational Training Institute",
    location: "Multan, Pakistan",
    period: "January 2022 – January 2023",
    isCurrent: false,
    isFeatured: false,
    responsibilities: [
      "Conducted vocational training courses in social media management, search engine optimization, and basic web skills."
    ]
  },
  {
    id: "mamiora",
    role: "Shopify Developer",
    company: "Mamiora",
    location: "Remote / International",
    period: "February 2022 – February 2023",
    isCurrent: false,
    isFeatured: false,
    responsibilities: [
      "Customized Shopify theme layouts using Liquid, HTML5, and CSS3 to enhance mobile user experience and checkout flow."
    ]
  },
  {
    id: "ahmed-almazrouei",
    role: "Social Media Manager",
    company: "Ahmed Almazrouei Group",
    location: "Abu Dhabi, UAE",
    period: "February 2020 – October 2022",
    isCurrent: false,
    isFeatured: false,
    responsibilities: [
      "Managed social media branding, content strategy, and community engagement for corporate group entities in Abu Dhabi."
    ]
  }
];
