import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { Mail, Linkedin, PhoneCall, ArrowRight, ShieldCheck, MapPin, Sparkles, MessageSquare, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040812] text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Decorative Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-teal-500/10 blur-[100px] pointer-events-none -z-0" />

      {/* Top CTA Banner Strip */}
      <div className="border-b border-slate-800/70 bg-slate-900/60 backdrop-blur-md py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a896] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>READY TO SCALE YOUR DIGITAL REVENUE?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              Let's Discuss Your Next Campaign or Shopify Project
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00a896] hover:bg-[#028090] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Quick Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60 items-start">
          {/* Column 1: Brand Logo & Tagline (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00a896] text-white font-serif font-bold text-base shadow-sm group-hover:bg-[#028090] transition-colors">
                RS
              </div>
              <span className="font-extrabold text-white text-lg tracking-wider uppercase">
                RIZWAN <span className="text-[#00a896] font-light">SAEED</span>
              </span>
            </Link>

            <p className="text-xs font-bold text-[#00a896]">
              Digital Marketing Manager & Shopify Developer
            </p>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Helping businesses in the UAE, USA, UK and worldwide acquire qualified leads, scale online revenue and build high-converting e-commerce systems.
            </p>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#00a896] flex-shrink-0" />
              <span>Multan, Pakistan (Serving UAE, USA & UK)</span>
            </div>
          </div>

          {/* Column 2: Core Growth Services (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
              Growth Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services/meta-ads" className="hover:text-[#00a896] transition-colors">
                  Meta Ads (Facebook & IG)
                </Link>
              </li>
              <li>
                <Link href="/services/google-ads" className="hover:text-[#00a896] transition-colors">
                  Google Ads & Intent PPC
                </Link>
              </li>
              <li>
                <Link href="/services/shopify-development" className="hover:text-[#00a896] transition-colors">
                  Shopify & Liquid Store Build
                </Link>
              </li>
              <li>
                <Link href="/services/lead-generation" className="hover:text-[#00a896] transition-colors">
                  B2B Lead Gen & Automations
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-[#00a896] transition-colors">
                  SEO & AI Search Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-[#00a896] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#00a896] transition-colors">About Story</Link></li>
              <li><Link href="/projects" className="hover:text-[#00a896] transition-colors">Projects Showcase</Link></li>
              <li><Link href="/insights" className="hover:text-[#00a896] transition-colors">Blog & Insights</Link></li>
              <li><Link href="/contact" className="hover:text-[#00a896] transition-colors">Contact & Audit</Link></li>
              <li><Link href="/terms" className="hover:text-[#00a896] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00a896] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Let's Connect & Social Badges (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif">
              Connect & Socials
            </h4>
            
            <div className="flex flex-wrap items-center gap-2 text-slate-400">
              {/* LinkedIn */}
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-[#00a896] hover:border-[#00a896] hover:bg-slate-800 hover:scale-105 transition-all shadow-xs group"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/80 hover:bg-slate-800 hover:scale-105 transition-all shadow-xs group"
                title="WhatsApp Direct Message"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </a>

              {/* Facebook */}
              <a
                href={siteConfig.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-400 hover:border-blue-500/80 hover:bg-slate-800 hover:scale-105 transition-all shadow-xs group"
                title="Facebook Page"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={siteConfig.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-pink-400 hover:border-pink-500/80 hover:bg-slate-800 hover:scale-105 transition-all shadow-xs group"
                title="Instagram Profile"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={siteConfig.youtube || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-red-400 hover:border-red-500/80 hover:bg-slate-800 hover:scale-105 transition-all shadow-xs group"
                title="YouTube Channel"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-[#00a896] hover:border-[#00a896] hover:bg-slate-800 hover:scale-105 transition-all shadow-xs group"
                title="GitHub Repositories"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            </div>

            {/* Verified Certifications Pill Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#00a896]">
                <ShieldCheck className="h-4 w-4 text-[#00a896]" />
                <span>Verified Professional Credentials</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300 font-medium">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a896]" />
                  <span>Meta Blueprint Advertising Certified</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a896]" />
                  <span>Google Ads PPC & Search Specialist</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a896]" />
                  <span>BS Information Technology (IT Degree)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Operational Status Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Rizwan Saeed. All rights reserved.</p>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>100% System Operational · Response Guarantee 12-24h</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
