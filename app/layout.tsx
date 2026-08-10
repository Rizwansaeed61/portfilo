import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  Inter,
  Outfit,
  Cinzel,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPersonSchema, getProfessionalServiceSchema, getWebSiteSchema } from "@/lib/schema";
import { siteConfig } from "@/content/site-config";
import { SiteLayout } from "@/components/layout/SiteLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    template: "%s | Rizwan Saeed",
  },
  description:
    "Performance Marketer & Shopify Developer specializing in Meta Ads, Google Ads, e-commerce growth, conversion rate optimization and B2B lead generation across UAE, USA and UK.",
  keywords: [
    "Digital Marketing Manager Dubai",
    "Shopify Developer UAE",
    "Meta Ads Specialist",
    "Google Ads Performance Marketer",
    "Conversion Rate Optimization Specialist",
    "B2B Lead Generation UAE USA UK",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: "/images/rizwan-saeed.png",
    shortcut: "/images/rizwan-saeed.png",
    apple: "/images/rizwan-saeed.png",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    description:
      "Helping businesses generate qualified leads, scale online sales and build measurable digital growth systems in UAE, USA & UK.",
    siteName: "Rizwan Saeed — Digital Growth Specialist",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan Saeed | Digital Marketing Manager & Shopify Developer",
    description:
      "Helping businesses generate qualified leads, scale online sales and build measurable digital growth systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${inter.variable} ${outfit.variable} ${cinzel.variable} ${montserrat.variable}`}>
      <head>
        <JsonLd data={[getPersonSchema(), getProfessionalServiceSchema(), getWebSiteSchema()]} />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-warm-50 text-slate-900 min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
