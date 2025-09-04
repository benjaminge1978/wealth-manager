import { HeroSection } from "./HeroSection";
import { ServicesBar } from "./ServicesBar";
import { WhyNetfinSection } from "./WhyNetfinSection";
import { ServicesSection } from "./ServicesSection";
import { ProcessSection } from "./ProcessSection";
// import { CalculatorSection } from "./CalculatorSection"; // Temporarily hidden for launch
import { AboutSection } from "./AboutSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactSection } from "./ContactSection";

export function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ServicesBar />
      <WhyNetfinSection />
      <ServicesSection />
      <ProcessSection />
      {/* <CalculatorSection /> */} {/* Temporarily hidden for launch */}
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}