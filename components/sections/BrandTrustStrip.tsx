import React from "react";
import { Container } from "@/components/ui/Container";
import { TopographicWaveBackground } from "@/components/ui/TopographicWaveBackground";
import { Building2, Hotel, ShieldCheck, Globe2, ShoppingBag, GraduationCap } from "lucide-react";

export function BrandTrustStrip() {
  const brands = [
    { name: "Marina Byblos Hotel", role: "Dubai Marina Hospitality", icon: Hotel },
    { name: "Green Crystal Ventilators", role: "UAE B2B Industrial", icon: Building2 },
    { name: "Ahmed Almazrouei Group", role: "Abu Dhabi Enterprise", icon: ShieldCheck },
    { name: "Extreme Commerce", role: "E-Commerce Training", icon: GraduationCap },
    { name: "Skillsrator", role: "Digital Growth Mentorship", icon: Globe2 },
    { name: "Mamiora", role: "International D2C Shopify", icon: ShoppingBag },
  ];

  return (
    <section className="bg-[#060c1a] text-white py-12 border-y border-slate-800/80 relative overflow-hidden">
      <TopographicWaveBackground mode="dark" opacity={0.22} />
      <Container>
        <div className="text-center space-y-2 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00a896]">
            PROVEN TRACK RECORD & BRAND EXPERIENCE
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-slate-200 font-serif">
            Trusted by Hospitality, Retail & B2B Brands Across Dubai, Abu Dhabi & Global Markets
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.name}
                className="bg-slate-800/80 hover:bg-slate-800 p-4 rounded-xl border border-slate-700/60 flex flex-col items-center justify-center text-center space-y-1.5 transition-all hover:border-[#00a896]/60 group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-[#00a896] group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-slate-100 group-hover:text-[#00a896] transition-colors leading-tight">
                  {b.name}
                </p>
                <span className="text-[10px] text-slate-400 font-medium">
                  {b.role}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
