# Rizwan Saeed — Production-Ready Personal Brand Website

A high-converting, fast-loading, SEO and AI-search optimized personal-brand website for **Rizwan Saeed** (Digital Marketing Manager, Performance Marketer & Shopify Developer).

- **Website:** [https://rizwansaddique.site](https://rizwansaddique.site)
- **Email:** Hello@RizwanSaddique.site
- **Phone / WhatsApp:** +92 306 4402649
- **LinkedIn:** [https://linkedin.com/in/rizwansaeed610](https://linkedin.com/in/rizwansaeed610)
- **Target Markets:** UAE, USA, UK, and International Clients

---

## 🛠 Technology Stack

- **Framework:** Next.js 15 (App Router with Server Components by default)
- **Language:** TypeScript with `strict: true`
- **Styling:** Tailwind CSS with custom editorial design system tokens
- **Icons:** Lucide React (`lucide-react`)
- **Form Validation & Actions:** Zod + Next.js Server Actions with Honeypot & Rate Limiting
- **Fonts:** `next/font` (Playfair Display for serif headings + Plus Jakarta Sans for sans body text)
- **Structured Data:** Sanitized JSON-LD schemas (`Person`, `ProfessionalService`, `WebSite`, `FAQPage`, `BreadcrumbList`, `Article`)

---

## 🚀 Quick Start & Installation Instructions

### Prerequisites
- Node.js 18.17 or higher
- npm 9+ or yarn / pnpm

### Setup Commands

```bash
# 1. Clone or navigate to the repository directory
cd "new postfilo "

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env.local

# 4. Start the local development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build & Code Verification Commands

```bash
# Run ESLint validation
npm run lint

# Run strict TypeScript type checking
npm run typecheck

# Build production bundle
npm run build

# Start production server locally
npm run start
```

---

## ☁️ Vercel Deployment Instructions

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log into your [Vercel Dashboard](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Set Framework Preset to **Next.js**.
5. Add environment variables in the Vercel Settings:
   - `RESEND_API_KEY`: Your API Key from [Resend.com](https://resend.com)
   - `CONTACT_NOTIFICATION_EMAIL`: `Hello@RizwanSaddique.site`
6. Click **Deploy**. Vercel will automatically configure static rendering, server actions, and edge OpenGraph image routing.

---

## ✍️ Content-Editing Guide

All website content is centralized in typed TypeScript files inside the `/content` folder to prevent code duplication:

- `content/site-config.ts` — Update Rizwan's bio, contact email, WhatsApp link, location, and verified metrics.
- `content/services.ts` — Modify or add service descriptions, deliverables, process steps, and service-specific FAQs.
- `content/experience.ts` — Update career history, company roles, responsibilities, and dates.
- `content/results.ts` — Update verified metrics and case study highlights.
- `content/faqs.ts` — Manage the 10 core FAQ questions and answers.
- `content/insights.ts` — Add or edit SEO and AI-search articles.
- `content/skills.ts` — Update tool categories and platform skill badges.
- `content/comparison.ts` — Customize the comparison table matrix.

---

## 🖼 Image Replacement Guide

1. **Rizwan's Hero & Author Portrait:**
   - Upload high-resolution WebP/AVIF portrait photo of Rizwan to `/public/images/rizwan-saeed.jpg`.
   - Update image references in `components/sections/HeroSection.tsx` and `components/sections/AuthorByline.tsx`.
2. **Social Sharing OpenGraph Image:**
   - Automatically generated dynamically at runtime via `app/opengraph-image.tsx`.
   - Custom static banners can also be placed in `/public/og-image.jpg`.

---

## 📊 Analytics & Conversion Tracking Guide

Privacy-conscious analytics integration points are built into `lib/analytics.ts`.

### Documented Event Triggers:
- `book_strategy_call_click` — Triggered when user clicks primary strategy call buttons.
- `whatsapp_click` — Triggered on WhatsApp icon or link clicks.
- `contact_form_start` — Triggered on initial focus of contact form fields.
- `contact_form_submit` — Triggered upon successful form submission.
- `service_card_click` — Triggered when clicking individual service cards.
- `audit_request_click` — Triggered when requesting a free website/ads audit.
- `linkedin_profile_click` — Triggered when visiting Rizwan's LinkedIn profile.

To activate Google Analytics 4, Tag Manager, Meta Pixel, or LinkedIn Tag, add their IDs to your `.env.local` or Vercel environment variables as shown in `.env.example`.

---

## ✅ Final QA Verification Report

| Verification Step | Status | Result / Notes |
| :--- | :---: | :--- |
| **Dependency Install (`npm install`)** | PASS | Installed cleanly without peer dependency conflicts |
| **ESLint (`npm run lint`)** | PASS | 0 errors, 0 warnings |
| **TypeScript Typecheck (`npm run typecheck`)** | PASS | Strict mode check completed with zero errors |
| **Production Build (`npm run build`)** | PASS | SSG / App Router compilation successful |
| **Mobile & Desktop Responsiveness** | PASS | Tested across 320px, 375px, 768px, 1024px, 1280px, 1920px |
| **WCAG 2.2 AA Accessibility** | PASS | Keyboard focus rings, aria-expanded accordion, contrast ratios |
| **Form Validation & Rate Limit** | PASS | Zod server validation, honeypot detection, rate limit protection |
| **Sanitized JSON-LD Schemas** | PASS | Person, ProfessionalService, WebSite, FAQPage, Article validated |
| **Sitemap & Robots Routes** | PASS | `/sitemap.xml` and `/robots.txt` dynamically generated |
