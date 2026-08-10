"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceData } from "@/content/experience";
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";

export function ExperienceTimeline({
  experiences = experienceData,
}: {
  experiences?: typeof experienceData;
}) {
  const [showAllRoles, setShowAllRoles] = useState(false);

  const featuredRoles = experiences.filter((r) => r.isFeatured);
  const secondaryRoles = experiences.filter((r) => !r.isFeatured);

  const visibleRoles = showAllRoles ? experiences : featuredRoles;

  return (
    <section id="experience" className="bg-warm-50/40 py-16 sm:py-24 border-b border-slate-200/60">
      <Container>
        <SectionHeading
          badge="Career & Client History"
          questionH2="Where Has Rizwan Saeed Applied His Experience?"
          subtitle="From managing luxury hotel hospitality marketing in Dubai Marina to engineering e-commerce stores for global clients."
        />

        <div className="relative border-l-2 border-slate-200 ml-3 sm:ml-6 space-y-10">
          {visibleRoles.map((role) => (
            <div key={role.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 transition-colors ${
                  role.isCurrent
                    ? "bg-emerald-600 border-white ring-4 ring-emerald-100"
                    : "bg-slate-300 border-white group-hover:bg-emerald-500"
                }`}
              />

              <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-slate-900 font-serif">
                        {role.role}
                      </h3>
                      {role.isCurrent && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-emerald-700 mt-0.5">
                      {role.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {role.period}
                    </span>
                    <span className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {role.location}
                    </span>
                  </div>
                </div>

                {role.responsibilities.length > 0 && (
                  <ul className="space-y-2 pt-1">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <Briefcase className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-1" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button for Full Career History */}
        {secondaryRoles.length > 0 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAllRoles(!showAllRoles)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs"
            >
              <span>{showAllRoles ? "Show Key Roles Only" : `View Additional History (${secondaryRoles.length} Roles)`}</span>
              {showAllRoles ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
