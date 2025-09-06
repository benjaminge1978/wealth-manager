import { HeroSection } from "./HeroSection";
import { ServicesBar } from "./ServicesBar";
import { SEOHead } from "./SEOHead";
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
      <SEOHead
        title="Netfin - Expert Financial Advisory & Wealth Management Services"
        description="Achieve financial success through personalized, goals-based planning and regulated investment advice. Expert wealth management services to help you build the life you want."
        image="https://netfin.co.uk/og-image.jpg"
        url="https://netfin.co.uk/"
        keywords="wealth management, financial advisor, investment planning, retirement planning, financial consulting, portfolio management, UK financial advisor"
      />
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