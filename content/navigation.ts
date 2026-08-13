export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  services: [
    { label: "Meta Ads Management", href: "/services/meta-ads" },
    { label: "Google Ads Management", href: "/services/google-ads" },
    { label: "Shopify Development", href: "/services/shopify-development" },
    { label: "SEO & AI Search", href: "/services/seo" },
    { label: "Landing Page Development", href: "/services/landing-pages" },
    { label: "B2B Lead Generation", href: "/services/lead-generation" },
  ],
  company: [
    { label: "About Rizwan Saeed", href: "/about" },
    { label: "Verified Results", href: "/results" },
    { label: "Career Experience", href: "/about#experience" },
    { label: "Growth Insights", href: "/insights" },
    { label: "Book Strategy Call", href: "/contact" },
    { label: "FAQs", href: "/#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "XML Sitemap", href: "/sitemap.xml" },
  ]
};
