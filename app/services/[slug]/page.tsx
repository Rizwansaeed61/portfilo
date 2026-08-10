import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { servicesData } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqPageSchema } from "@/lib/schema";
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} Services | Rizwan Saeed`,
    description: service.shortDescription,
    alternates: {
      canonical: `${siteConfig.url}/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} Services | Rizwan Saeed`,
      description: service.headline,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {service.faq && service.faq.length > 0 && (
        <JsonLd
          data={getFaqPageSchema(
            service.faq.map((f, i) => ({ id: `sf-${i}`, question: f.question, answer: f.answer }))
          )}
        />
      )}

      {/* Hero Banner */}
      <div className="bg-warm-50/70 py-12 sm:py-16 border-b border-slate-200/60">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Services", url: "/services" },
              { name: service.title, url: `/services/${service.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
                Growth Service
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-serif leading-tight">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-800">
                {service.headline}
              </p>
              <p className="text-base text-slate-700 leading-relaxed font-normal">
                {service.fullDescription}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Button href={`/contact?service=${encodeURIComponent(service.title)}`} variant="primary" size="lg">
                  Book {service.title} Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button href="/contact?type=audit" variant="outline" size="lg">
                  Request Free Audit
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-base font-serif border-b border-slate-100 pb-2">
                Target Market Scope
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {service.targetAudience}
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Verified UAE, USA & UK Execution</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Deliverables & Process Grid */}
      <section className="bg-white py-16 border-b border-slate-200/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Deliverables Column */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                Included Service Deliverables
              </h2>
              <ul className="space-y-3">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-800 leading-relaxed p-3 rounded-lg bg-warm-50/50 border border-slate-200/60">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Benefits Column */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">
                Expected Business Outcomes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <Card key={idx} variant="flat" className="bg-emerald-50/30 border-emerald-200/70 p-5">
                    <h3 className="font-bold text-emerald-900 text-sm font-serif mb-1">
                      Key Advantage {idx + 1}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {benefit}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Process Steps */}
      <section className="bg-warm-50/40 py-16 border-b border-slate-200/60">
        <Container>
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Step-by-Step Implementation Workflow
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              How we execute your {service.title} project from initial setup to final scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                  Phase {idx + 1}
                </span>
                <h3 className="font-bold text-slate-900 text-base font-serif pt-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service FAQs */}
      {service.faq && service.faq.length > 0 && (
        <section className="bg-white py-16 border-b border-slate-200/60">
          <Container size="narrow">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 font-serif flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-emerald-600" />
                {service.title} FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {service.faq.map((f, i) => (
                <div key={i} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h3 className="font-bold text-slate-900 text-base font-serif">{f.question}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Contact Section Pre-selecting Service */}
      <section className="bg-warm-50/60 py-16">
        <Container size="narrow">
          <ContactForm defaultService={service.title} />
        </Container>
      </section>
    </>
  );
}
