import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { useState } from "react";
import netfinLogo from "../assets/netfin-logo.svg";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
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
            aria-label="Netfin home page"
          >
            <img 
              src={netfinLogo} 
              alt="Netfin Logo" 
              className="h-8 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <div className="relative">
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onBlur={(e) => {
                  // Close dropdown if focus moves outside the dropdown container
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                    setTimeout(() => setServicesDropdownOpen(false), 150);
                  }
                }}
                className={`hover:text-foreground transition-colors focus:outline-none px-2 py-1 flex items-center gap-1 relative ${servicesDropdownOpen || location.pathname === '/wealth-management' ? 'text-foreground' : 'text-muted-foreground'}`}
                style={servicesDropdownOpen || location.pathname === '/wealth-management' ? { 
                  borderBottom: '2px solid #3b82f6',
                  paddingBottom: 'calc(0.25rem - 2px)'
                } : {}}
                aria-label="Services menu"
                aria-expanded={servicesDropdownOpen}
              >
                Services
                <HandDrawnIcon 
                  type="chevron-down" 
                  size={14} 
                  className="transition-transform duration-200" 
                  style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                />
              </button>
              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 rounded-xl shadow-xl py-2 z-50 w-[450px]"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                >
                  <Link
                    to="/wealth-management"
                    className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors whitespace-nowrap"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    Wealth Management
                  </Link>
                  <button
                    onClick={() => { handleNavClick('services'); setServicesDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Financial Planning
                  </button>
                  <button
                    onClick={() => { handleNavClick('services'); setServicesDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Investment Advisory
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none px-2 py-1 relative"
              aria-label="Navigate to About section"
            >
              About
            </button>
            <Link 
              to="/insights" 
              className={`hover:text-foreground transition-colors focus:outline-none px-2 py-1 relative ${location.pathname.startsWith('/insights') ? 'text-foreground' : 'text-muted-foreground'}`}
              style={location.pathname.startsWith('/insights') ? { 
                borderBottom: '2px solid #3b82f6',
                paddingBottom: 'calc(0.25rem - 2px)'
              } : {}}
              aria-label="View our insights and resources"
            >
              Insights
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-foreground transition-colors focus:outline-none px-2 py-1 relative ${location.pathname === '/contact' ? 'text-foreground' : 'text-muted-foreground'}`}
              style={location.pathname === '/contact' ? { 
                borderBottom: '2px solid #3b82f6',
                paddingBottom: 'calc(0.25rem - 2px)'
              } : {}}
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
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground px-2 py-1 uppercase tracking-wider">
                  Services
                </div>
                <div className="bg-muted/30 rounded-lg p-2 space-y-1">
                  <Link 
                    to="/wealth-management"
                    className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Go to Wealth Management page and close menu"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/30 mr-3"></div>
                    <div>
                      <div className="font-medium">Wealth Management</div>
                      <div className="text-xs text-muted-foreground">Build lasting wealth</div>
                    </div>
                  </Link>
                  <button
                    onClick={() => { handleNavClick('services'); setMobileMenuOpen(false); }}
                    className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-md"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500/30 mr-3"></div>
                    <div className="text-left">
                      <div className="font-medium">Financial Planning</div>
                      <div className="text-xs text-muted-foreground">Goals-based strategies</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { handleNavClick('services'); setMobileMenuOpen(false); }}
                    className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-md"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500/30 mr-3"></div>
                    <div className="text-left">
                      <div className="font-medium">Investment Advisory</div>
                      <div className="text-xs text-muted-foreground">Expert portfolio management</div>
                    </div>
                  </button>
                </div>
              </div>
              <button 
                onClick={() => { handleNavClick('about'); setMobileMenuOpen(false); }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-2"
                aria-label="Navigate to About section and close menu"
              >
                About
              </button>
              <Link 
                to="/insights" 
                className="block text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="View our insights and resources and close menu"
              >
                Insights
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