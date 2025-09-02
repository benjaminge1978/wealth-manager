import { HeroSection } from "./HeroSection";
import { ServicesBar } from "./ServicesBar";
import { ServicesSection } from "./ServicesSection";
import { ProcessSection } from "./ProcessSection";
import { CalculatorSection } from "./CalculatorSection";
import { AboutSection } from "./AboutSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactSection } from "./ContactSection";

export function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ServicesBar />
      <ServicesSection />
      <ProcessSection />
      <CalculatorSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}