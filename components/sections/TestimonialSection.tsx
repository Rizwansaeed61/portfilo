"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function TestimonialSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-slate-100">
      <Container>
        <div className="max-w-5xl mx-auto bg-slate-50/60 rounded-3xl p-8 sm:p-12 border border-slate-100 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Quote Icon & Text Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Giant Teal Quote Mark */}
              <div className="text-6xl font-serif font-black text-[#00a896] leading-none select-none">
                “
              </div>

              {/* Quote Paragraph */}
              <blockquote className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed">
                Arindam is a rare combination of creativity and technical expertise. He delivered a beautiful, high-performing website that exceeded our expectations.
              </blockquote>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00a896]" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
            </div>

            {/* Author Avatar & Info Column */}
            <div className="lg:col-span-4 flex items-center gap-4 lg:flex-col lg:items-end lg:text-right border-t lg:border-t-0 lg:border-l border-slate-200/60 pt-6 lg:pt-0 lg:pl-8">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#00a896] shadow-sm flex-shrink-0">
                <Image
                  src="/images/testimonial-avatar.png"
                  alt="Priya Sharma — Marketing Head, Greenly"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-lg">
                  Priya Sharma
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Marketing Head, Greenly
                </p>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#00a896] pt-1 lg:justify-end">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
