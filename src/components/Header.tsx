import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { useState } from "react";
import netfinLogo from "../assets/netfin-logo.svg";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      // If on homepage, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on homepage, navigate to homepage then scroll
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50" role="banner">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center"
            aria-label="WealthMaster home page"
          >
            <img 
              src={netfinLogo} 
              alt="Netfin Logo" 
              className="h-10 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <button 
              onClick={() => handleNavClick('services')} 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Navigate to Services section"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Navigate to About section"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('process')} 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Navigate to Our Process section"
            >
              Our Process
            </button>
            <Link 
              to="/blog" 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="View our blog posts"
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to contact page"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button aria-label="Schedule consultation with a financial adviser">
              Speak to an adviser
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <HandDrawnIcon type="menu" size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav 
            id="mobile-navigation"
            className="md:hidden border-t bg-white/95 backdrop-blur"
            role="navigation" 
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button 
                onClick={() => { handleNavClick('services'); setMobileMenuOpen(false); }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-2"
                aria-label="Navigate to Services section and close menu"
              >
                Services
              </button>
              <button 
                onClick={() => { handleNavClick('about'); setMobileMenuOpen(false); }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-2"
                aria-label="Navigate to About section and close menu"
              >
                About
              </button>
              <button 
                onClick={() => { handleNavClick('process'); setMobileMenuOpen(false); }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-2"
                aria-label="Navigate to Our Process section and close menu"
              >
                Our Process
              </button>
              <Link 
                to="/blog" 
                className="block text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="View our blog posts and close menu"
              >
                Blog
              </Link>
              <Link 
                to="/contact"
                className="block text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Go to contact page and close menu"
              >
                Contact
              </Link>
              <Button 
                className="w-full mt-4" 
                aria-label="Schedule consultation with a financial adviser"
              >
                Speak to an adviser
              </Button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}