import { HeroSection } from "./HeroSection";
import { ServicesBar } from "./ServicesBar";
import { WhyWealthMasterSection } from "./WhyWealthMasterSection";
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
      <WhyWealthMasterSection />
      <ServicesSection />
      <ProcessSection />
      <CalculatorSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}