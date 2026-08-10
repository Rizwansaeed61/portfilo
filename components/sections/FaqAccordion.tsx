"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqsData } from "@/content/faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqPageSchema } from "@/lib/schema";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ faqs = faqsData }: { faqs?: typeof faqsData }) {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16 sm:py-24 border-b border-slate-200/60">
      {/* Sanitize FAQ JSON-LD Schema */}
      <JsonLd data={getFaqPageSchema(faqs)} />

      <Container size="narrow">
        <SectionHeading
          badge="Clear Clarity & Answers"
          questionH2="Frequently Asked Questions"
          subtitle="Everything you need to know about working together, project onboarding, ad spend requirements, and campaign management."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-emerald-500/80 bg-warm-50/50 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="flex w-full items-center justify-between p-5 text-left text-base sm:text-lg font-bold text-slate-900 font-serif focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
