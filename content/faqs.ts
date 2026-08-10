export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqsData: FaqItem[] = [
  {
    id: "faq-1",
    question: "What types of businesses do you work with?",
    answer: "I work primarily with hospitality brands, e-commerce stores (D2C and retail), B2B service providers, and professional companies across the UAE, USA, UK, and international markets. Strategies are tailored specifically to your customer acquisition model."
  },
  {
    id: "faq-2",
    question: "Do you work with clients outside Pakistan?",
    answer: "Yes. The vast majority of my clients are located in the UAE (Dubai, Abu Dhabi), the United States, the United Kingdom, and international regions. All communications, reporting, and meetings take place via Zoom, Google Meet, WhatsApp, and email."
  },
  {
    id: "faq-3",
    question: "Can you manage both Google Ads and Meta Ads?",
    answer: "Yes. Managing both channels in tandem allows for a unified growth strategy — using Google Search to capture high-intent buyers and Meta Ads (Facebook & Instagram) to generate demand, build audience lookalikes, and execute retargeting loops."
  },
  {
    id: "faq-4",
    question: "Do you also build Shopify and WordPress websites?",
    answer: "Yes. I develop conversion-focused Shopify e-commerce stores (using custom Liquid templates) and high-speed WordPress/Next.js landing pages built to turn ad clicks into actual inquiries and purchases."
  },
  {
    id: "faq-5",
    question: "Can you improve an existing advertising account?",
    answer: "Absolutely. I regularly audit underperforming Meta Ads and Google Ads accounts to spot wasted budget, incorrect conversion tracking, weak creative hooks, or ineffective audience targeting, then implement a structured recovery plan."
  },
  {
    id: "faq-6",
    question: "Can you audit my website before starting?",
    answer: "Yes. I offer a free initial website and advertising audit for qualified businesses. The audit highlights conversion bottlenecks, page-speed issues, SEO structure gaps, and tracking errors before we launch any campaign."
  },
  {
    id: "faq-7",
    question: "How much advertising budget do I need?",
    answer: "Recommended ad spend varies by market competitiveness and industry. For international markets (UAE, USA, UK), a baseline monthly ad spend of $1,500 – $3,000 (or AED equivalents) is generally ideal for statistical testing and reliable campaign scaling."
  },
  {
    id: "faq-8",
    question: "Do you offer one-time projects or monthly management?",
    answer: "Both. Website development, Shopify store setup, tracking setup (CAPI/GA4), and audits are delivered as fixed-scope projects. Ongoing media buying, campaign optimization, and monthly growth management are available on a retainer basis."
  },
  {
    id: "faq-9",
    question: "How do you measure campaign performance?",
    answer: "Performance is measured exclusively using verifiable business outcomes: Cost per Qualified Lead (CPA), Return on Ad Spend (ROAS), Conversion Rate, and total net revenue generated — never vanity metrics like clicks or impressions alone."
  },
  {
    id: "faq-10",
    question: "How can I start a project?",
    answer: "You can start by booking a free discovery call or submitting your project inquiry via the contact form on this site. We will review your current marketing assets, discuss your revenue goals, and outline a clear action plan."
  }
];
