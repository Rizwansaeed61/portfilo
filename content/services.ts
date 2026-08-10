export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  deliverables: string[];
  targetAudience: string;
  processSteps: { title: string; description: string }[];
  benefits: string[];
  faq: { question: string; answer: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "meta-ads",
    slug: "meta-ads",
    title: "Meta Ads Management",
    headline: "High-ROI Paid Social Campaigns across Facebook and Instagram",
    shortDescription: "Campaign strategy, creative testing, audience targeting, Pixel/CAPI, retargeting, lead generation and continuous CPA optimization.",
    fullDescription: "Meta Ads remains one of the most scalable acquisition channels for e-commerce, hospitality, and lead-generation businesses. I design end-to-end Meta ad strategies built around customer acquisition cost (CPA) targets and return on ad spend (ROAS). From Conversions API (CAPI) setup to dynamic creative testing and funnel-wide retargeting, every campaign is optimized for measurable revenue.",
    iconName: "TrendingUp",
    deliverables: [
      "Account and tracking audit",
      "Campaign structure setup (CBO/ABO)",
      "Creative testing plan & copy variants",
      "Audience strategy & custom lookalikes",
      "Meta Conversions API (CAPI) implementation",
      "Funnel retargeting & re-engagement",
      "Transparent reporting & weekly CPA optimization"
    ],
    targetAudience: "E-commerce brands, B2B services, luxury hospitality, and lead-gen businesses targeting UAE, USA, UK, or global buyers.",
    processSteps: [
      { title: "1. Audit & Tracking Check", description: "Audit historical ad performance, Meta Pixel setup, CAPI health, and attribution models." },
      { title: "2. Funnel Architecture", description: "Design cold acquisition campaigns, warm retargeting loops, and high-intent offer angles." },
      { title: "3. Creative & Copy Testing", description: "Launch structured creative iterations to identify winning hooks, angles, and formats." },
      { title: "4. Scaling & Optimization", description: "Scale winning ad sets systematically while keeping CPA stable and expanding reach." }
    ],
    benefits: [
      "Predictable cost per acquisition (CPA)",
      "Full server-side tracking compliance via CAPI",
      "Elimination of wasted ad spend on unvalidated creatives",
      "Direct integration with CRM and Shopify stores"
    ],
    faq: [
      { question: "What ad spend budget do I need for Meta Ads?", answer: "While spend depends on your industry and target market, a minimum monthly budget of $1,500 – $3,000 (or AED equivalents) allows for proper creative testing and statistical optimization." },
      { question: "How do you handle iOS privacy and tracking limitations?", answer: "I implement Meta Conversions API (CAPI) alongside server-side tracking and GA4 event parameters to ensure robust attribution despite browser privacy restrictions." }
    ]
  },
  {
    id: "google-ads",
    slug: "google-ads",
    title: "Google Ads Management",
    headline: "Commercial Intent Paid Search & Performance Max Campaigns",
    shortDescription: "Search, Performance Max, remarketing and conversion-focused paid-search campaigns designed around commercial intent.",
    fullDescription: "Capture active buyers precisely when they search for your products or solutions. My Google Ads approach focuses on high-intent search terms, tight single-theme ad groups, negative keyword governance, and Performance Max asset optimization. Rather than driving generic traffic, every dollar targets high-margin customer leads and direct online purchases.",
    iconName: "Search",
    deliverables: [
      "Comprehensive commercial intent keyword research",
      "Search campaign & ad group restructuring",
      "Negative keyword strategy to eliminate low-intent clicks",
      "Performance Max campaign setup & asset management",
      "Conversion tracking (GA4 + Google Ads native tags)",
      "Landing-page speed & conversion recommendations",
      "Continuous ROAS and CPA optimization"
    ],
    targetAudience: "High-ticket services, e-commerce stores, hospitality properties, and B2B providers seeking intent-driven leads.",
    processSteps: [
      { title: "1. Intent Mapping", description: "Identify high-commercial intent keywords and negative terms that drain ad budget." },
      { title: "2. Ad & Landing Page Alignment", description: "Craft responsive search ads paired with tightly aligned landing page messaging." },
      { title: "3. Smart Bidding & Tracking", description: "Configure exact conversion values and bid strategies (tCPA, tROAS)." },
      { title: "4. Negative Keyword Auditing", description: "Continuously prune irrelevant search queries to maximize return on ad spend." }
    ],
    benefits: [
      "Capture high-intent prospects ready to purchase or inquire",
      "Zero waste on irrelevant search queries",
      "Granular attribution connected to business revenue",
      "Scalable campaign structure for international growth"
    ],
    faq: [
      { question: "Should I choose Search campaigns or Performance Max?", answer: "Both serve distinct roles. Search captures explicit user intent for specific services, while Performance Max expands reach across Shopping, YouTube, and Display when supported by strong asset groups and accurate conversion tracking." },
      { question: "How quickly can we expect results from Google Ads?", answer: "Search ads start driving targeted traffic immediately upon approval. Campaign optimization and bid strategy machine learning typically reach peak efficiency within 2 to 4 weeks." }
    ]
  },
  {
    id: "shopify-development",
    slug: "shopify-development",
    title: "Shopify Development",
    headline: "High-Converting Shopify Stores Built for Speed and Scale",
    shortDescription: "Conversion-focused Shopify stores with responsive design, theme customization, Liquid development and essential integrations.",
    fullDescription: "A beautiful store is useless if it fails to convert visitors into buyers. I build custom, lightning-fast Shopify stores using optimized Liquid templates, clean CSS/JS architecture, and seamless app integrations. From checkout conversion rate optimization to international multi-currency setup, your store will be built for high sales throughput.",
    iconName: "ShoppingBag",
    deliverables: [
      "Complete Shopify store setup & configuration",
      "Custom Liquid theme development & layout modification",
      "Mobile-first responsive design & UX optimization",
      "Product collection taxonomy & navigation design",
      "Payment gateway setup (Stripe, PayPal, regional gateways)",
      "Klaviyo, Meta Pixel, GA4, & app integrations",
      "Speed optimization (Sub-3s load speed focus)"
    ],
    targetAudience: "D2C brands, retail businesses, and international merchants launching or scaling custom Shopify stores.",
    processSteps: [
      { title: "1. UX & Architecture Wireframing", description: "Map out clear collection structures, product detail pages, and friction-free cart flows." },
      { title: "2. Custom Liquid & Theme Code", description: "Develop clean Liquid theme extensions, custom sections, and responsive layout styling." },
      { title: "3. Integrations & Analytics", description: "Connect payment processing, inventory sync, email automation (Klaviyo), and tracking pixels." },
      { title: "4. Speed & QA Testing", description: "Optimize image compression, app scripts, code execution, and cross-browser responsiveness." }
    ],
    benefits: [
      "Frictionless checkout experience engineered to lift AOV",
      "Blazing fast mobile performance for higher organic rankings",
      "Clean codebase free of unnecessary app bloat",
      "Multi-currency & international market readiness"
    ],
    faq: [
      { question: "Can you migrate my existing store to Shopify?", answer: "Yes, I migrate stores from WooCommerce, Magento, or custom frameworks to Shopify while preserving your SEO rankings, customer data, and product URLs." },
      { question: "Do you install bloated page builder apps?", answer: "No. I prioritize native Liquid coding and native theme sections to keep your store lightweight, fast, and easy to maintain without paying recurring app fees." }
    ]
  },
  {
    id: "seo",
    slug: "seo",
    title: "SEO and AI Search Optimization",
    headline: "Rank in Google & Surface in AI Search Engines (ChatGPT, Perplexity, Gemini)",
    shortDescription: "Technical, on-page and content improvements that help search engines and AI systems understand, trust and surface the website.",
    fullDescription: "Modern SEO requires more than traditional keyword placement. Search engines and AI answer engines (ChatGPT, Perplexity, Gemini) rely on clear technical hierarchy, authoritative direct answer blocks, structured JSON-LD data, and verifiable entity authority. I optimize your website so search engines index your pages seamlessly and AI systems reference your brand directly.",
    iconName: "Globe",
    deliverables: [
      "Comprehensive technical SEO & crawlability audit",
      "Keyword research & search-intent mapping",
      "Direct answer block & FAQ schema engineering",
      "Semantic HTML5 & heading hierarchy optimization",
      "Sanitized JSON-LD structured data (Person, LocalBusiness, FAQ)",
      "Page speed & Core Web Vitals enhancement",
      "Internal linking architecture & content strategy"
    ],
    targetAudience: "Businesses seeking sustainable organic traffic, domain authority, and visibility in AI-assisted answer engines.",
    processSteps: [
      { title: "1. Technical Crawl Audit", description: "Identify crawl errors, duplicate content, slow load times, and missing metadata." },
      { title: "2. Content & Intent Structuring", description: "Structure target pages into clear question-and-answer formats favored by AI models." },
      { title: "3. Schema & Entity Injection", description: "Deploy rich JSON-LD markup to establish unambiguous entity relationships." },
      { title: "4. Speed & Core Web Vitals", description: "Refactor scripts, images, and layout shifts to achieve green Lighthouse scores." }
    ],
    benefits: [
      "Long-term compound organic traffic growth",
      "Prominent placement in AI search summaries & ChatGPT answers",
      "Improved site health, crawl indexation, and ranking stability",
      "Higher conversion rate from high-intent organic visitors"
    ],
    faq: [
      { question: "What is AI Search Optimization (GEO)?", answer: "Generative Engine Optimization (GEO) ensures your content is structured with clear factual answer blocks, authoritative schema data, and semantic formatting so AI engines cite your brand when answering user queries." },
      { question: "How long until we see SEO results?", answer: "Technical fixes and indexing updates usually show positive ranking signals within 4 to 8 weeks, with compound organic traffic growth continuing over 3 to 6 months." }
    ]
  },
  {
    id: "landing-pages",
    slug: "landing-pages",
    title: "Landing Page Development",
    headline: "High-Converting Mobile-First Landing Pages for Paid & Organic Traffic",
    shortDescription: "Fast, mobile-first landing pages built to convert paid and organic traffic into leads, calls and sales.",
    fullDescription: "Sending ad traffic to a generic homepage burns ad budget. I build conversion-focused landing pages engineered with hero offer clarity, social proof positioning, objection-handling blocks, and high-contrast lead capture elements. Built on Next.js or light custom stacks, these pages load instantly and maximize lead yield.",
    iconName: "Layout",
    deliverables: [
      "Conversion-focused layout wireframing",
      "Benefit-driven headline & offer copy structure",
      "Trust, proof, and testimonial presentation",
      "High-converting lead form & booking integration",
      "Event analytics (Form start, Form submit, Call click)",
      "Sub-2 second mobile page speed execution",
      "A/B testing framework recommendations"
    ],
    targetAudience: "Businesses running paid ads on Meta or Google that need to turn ad clicks into qualified inquiries.",
    processSteps: [
      { title: "1. Customer Objection Research", description: "Analyze prospect pain points, hesitations, and decision factors." },
      { title: "2. Copywriting & Wireframe Strategy", description: "Structure the landing page flow: Hook -> Offer -> Proof -> Features -> FAQ -> CTA." },
      { title: "3. High-Speed Next.js/Tailwind Code", description: "Build clean, accessible, zero-cls components with mobile-first styling." },
      { title: "4. Tracking & Conversion QA", description: "Verify form action validation, rate limits, and custom analytics event triggers." }
    ],
    benefits: [
      "Significantly lower cost per lead (CPL)",
      "Instant page load speeds with zero layout shift",
      "High conversion rates from cold mobile traffic",
      "Seamless backend form processing & notification"
    ],
    faq: [
      { question: "Why build landing pages on Next.js instead of WordPress plugins?", answer: "Next.js pages render pre-compiled HTML with zero plugin bloat, delivering near-instant page loads on mobile networks. Faster load times directly correlate with higher conversion rates." },
      { question: "Can the landing page integrate with my CRM?", answer: "Yes. Forms can connect directly via webhooks or Server Actions to HubSpot, ActiveCampaign, Klaviyo, or custom email services." }
    ]
  },
  {
    id: "lead-generation",
    slug: "lead-generation",
    title: "B2B Lead Generation and Automation",
    headline: "Automated Lead-Gen Systems That Deliver Qualified Sales Inquiries",
    shortDescription: "Lead-generation systems for service, hospitality, e-commerce and B2B businesses using advertising, CRM workflows and intelligent automation.",
    fullDescription: "A successful lead system doesn't stop when a lead fills out a form. I build connected acquisition funnels that filter out spam, qualify prospective buyers, notify your sales team instantly via WhatsApp or email, and trigger automated follow-up sequences. Turn passive traffic into scheduled calendar calls.",
    iconName: "Zap",
    deliverables: [
      "Multi-channel lead funnel strategy",
      "Lead qualification form workflows",
      "CRM & email automation setup (Klaviyo / HubSpot)",
      "Instant WhatsApp & email follow-up triggers",
      "Spam protection & honeypot filtering",
      "Cal.com / Calendly calendar booking integration",
      "Centralized lead reporting dashboard recommendations"
    ],
    targetAudience: "B2B service providers, high-value consultants, luxury real estate, and hospitality venues needing predictable qualified leads.",
    processSteps: [
      { title: "1. Lead Lifecycle Planning", description: "Define lead qualification criteria, instant notifications, and follow-up touchpoints." },
      { title: "2. Funnel & Form Engineering", description: "Build multi-step or smart conditional forms that screen out low-intent leads." },
      { title: "3. Automation Routing", description: "Connect ad platforms, website forms, and CRM workflows seamlessly." },
      { title: "4. Optimization & Qualification Review", description: "Analyze lead quality feedback and adjust targeting/questions to refine lead accuracy." }
    ],
    benefits: [
      "Consistent pipeline of qualified, pre-vetted leads",
      "Zero manual delay between lead submission and initial contact",
      "Higher close rates through automated lead nurturing",
      "Elimination of unqualified or fake form submissions"
    ],
    faq: [
      { question: "How do you filter out bad quality or spam leads?", answer: "We implement honeypot fields, rate limiting, work-email validation, and explicit qualification questions (such as budget and timeline) inside the form logic." },
      { question: "Can we track which ad campaign produced each lead?", answer: "Yes, UTM parameters and ad identifiers are captured seamlessly with form submissions so you know exactly which ads generate actual revenue." }
    ]
  }
];
