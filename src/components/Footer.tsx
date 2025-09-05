import { useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { CookiePreferences } from "./CookiePreferences";
import wealthMasterLogo from "../assets/wealth_master_logo.svg";

export function Footer() {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={wealthMasterLogo} 
                alt="Wealth Master Logo" 
                className="h-10 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted partner for goals-based financial planning and wealth management. Building financial success through regulated advice and personalized strategies.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Wealth Management</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Financial Planning</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Investment Advisory</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Retirement Planning</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Risk Management</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#process" className="hover:text-primary-foreground transition-colors">Our Process</a></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link></li>
              <li>
                <button
                  onClick={() => setShowCookiePreferences(true)}
                  className="hover:text-primary-foreground transition-colors text-left"
                >
                  Cookie Settings
                </button>
              </li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Regulatory Information</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <HandDrawnIcon type="mail" size={16} />
                <span>finance@netfin.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/60">
            © 2025 Netfin Financial Advisers. All rights reserved.
          </div>
          <div className="text-xs text-primary-foreground/60 text-center md:text-right">
            Investment advisory services offered through Netfin Financial Advisers, a registered investment adviser.
            <br />
            Securities and insurance products are not FDIC insured and may lose value.
          </div>
        </div>
      </div>
      
      <CookiePreferences
        isOpen={showCookiePreferences}
        onClose={() => setShowCookiePreferences(false)}
      />
    </footer>
  );
}