import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/content/site-config";
import { Mail, Linkedin, PhoneCall, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Book a Strategy Call & Contact Rizwan Saeed",
  description:
    "Schedule a digital marketing strategy call or request a free website & ads audit for your business in the UAE, USA, or UK.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string; type?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service, type } = await searchParams;

  return (
    <>
      <div className="bg-warm-50/70 py-10 sm:py-14 border-b border-slate-200/60">
        <Container>
          <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              Direct Contact & Booking
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
              Book a Strategy Call or Request an Audit
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              Share your current business challenges, revenue goals, and marketing setup. You will receive a practical, actionable recommendation within 24 hours.
            </p>
          </div>
        </Container>
      </div>

      <section className="bg-white py-16 border-b border-slate-200/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Direct Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Direct Communication Channels
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Have a quick question or prefer to message directly? Connect via email, WhatsApp, or LinkedIn.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Box */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-warm-50/50 hover:border-emerald-500/80 hover:bg-white transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Work Email
                    </p>
                    <p className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                {/* WhatsApp Box */}
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-warm-50/50 hover:border-emerald-500/80 hover:bg-white transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Phone / WhatsApp
                    </p>
                    <p className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {siteConfig.phone}
                    </p>
                  </div>
                </a>

                {/* LinkedIn Box */}
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-warm-50/50 hover:border-emerald-500/80 hover:bg-white transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      LinkedIn Profile
                    </p>
                    <p className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      linkedin.com/in/rizwansaeed610
                    </p>
                  </div>
                </a>
              </div>

              {/* Working Hours & Availability */}
              <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Clock className="h-4 w-4" />
                  <span>Response Time Guarantee</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Inquiries are reviewed personally by Rizwan Saeed. You will receive a response within 24 business hours.
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Location: Multan, Pakistan (GST / GMT+5 timezone)</span>
                </div>
              </div>
            </div>

            {/* Interactive Form Component */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Inquiry Form...</div>}>
                <ContactForm defaultService={service} defaultType={type} hideSidebar={true} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
