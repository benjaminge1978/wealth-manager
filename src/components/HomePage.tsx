import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { ProcessSection } from "./ProcessSection";
import { CalculatorSection } from "./CalculatorSection";
import { AboutSection } from "./AboutSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactSection } from "./ContactSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <CalculatorSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}