"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site-config";
import { Linkedin, MapPin, Briefcase } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function AuthorByline() {
  const handleLinkedinClick = () => {
    trackEvent("linkedin_profile_click", { location: "author_byline" });
  };

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-200/60">
      <Container size="narrow">
        <div className="rounded-2xl bg-warm-50/80 p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Author Photo */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-full border-2 border-emerald-600 shadow-md">
              <Image
                src="/images/rizwan-saeed.png"
                alt="Rizwan Saeed — Expert Digital Marketing Manager"
                fill
                sizes="112px"
                className="object-cover object-top"
              />
            </div>

            {/* Author Bio Info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    {siteConfig.name}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-700">
                    {siteConfig.title}
                  </p>
                </div>

                {/* LinkedIn Link */}
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkedinClick}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-emerald-700 transition-colors shadow-2xs self-center sm:self-start"
                >
                  <Linkedin className="h-4 w-4 text-emerald-600" />
                  <span>Verify on LinkedIn</span>
                </a>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
                  5+ Years Experience
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  Markets: UAE · USA · UK
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-normal pt-1">
                {siteConfig.fullBio}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
