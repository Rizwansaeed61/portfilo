import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { skillsCategories } from "@/content/skills";
import { Check } from "lucide-react";

export function SkillsGrid() {
  return (
    <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
      <Container>
        <SectionHeading
          badge="Technical Stack & Tools"
          questionH2="What Platforms and Tools Does Rizwan Work With?"
          subtitle="Battle-tested ad platforms, e-commerce engines, analytics suites, and marketing automation frameworks."
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsCategories.map((cat) => (
            <Card
              key={cat.categoryName}
              variant="dark"
              hoverEffect={false}
              className="bg-slate-950/80 border-slate-800 p-6 sm:p-8"
            >
              <h3 className="text-lg font-bold text-emerald-400 font-serif mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>{cat.categoryName}</span>
                <span className="text-xs text-slate-500 font-normal">
                  {cat.skills.length} Tools & Platforms
                </span>
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:border-emerald-500/60 hover:text-white transition-colors"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
