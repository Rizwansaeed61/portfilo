import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandTrustStrip } from "@/components/sections/BrandTrustStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand & Track Record Strip */}
      <BrandTrustStrip />

      {/* 3. Services I Offer */}
      <ServicesGrid />

      {/* 3. Selected Projects */}
      <SelectedProjects />

      {/* 4. Client Testimonial Quote */}
      <TestimonialSection />

      {/* 5. Results That Matter */}
      <ResultsSection />

      {/* 6. How I Work Process */}
      <ProcessSection />

      {/* 7. Start Your Project Contact Section */}
      <section id="contact" className="bg-slate-50/60 py-16 sm:py-20 border-b border-slate-100">
        <Container>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
