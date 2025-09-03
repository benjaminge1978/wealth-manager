import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import netfinLogo from "../assets/netfin-logo.svg";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={netfinLogo} 
                alt="Netfin Logo" 
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
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Regulatory Information</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <HandDrawnIcon type="phone" size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <HandDrawnIcon type="mail" size={16} />
                <span>info@wealthmaster.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <HandDrawnIcon type="map-pin" size={16} className="mt-0.5 flex-shrink-0" />
                <span>123 Financial District, Suite 500<br />New York, NY 10004</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/60">
            © 2025 WealthMaster Financial Advisers. All rights reserved.
          </div>
          <div className="text-xs text-primary-foreground/60 text-center md:text-right">
            Investment advisory services offered through WealthMaster Financial Advisers, a registered investment adviser.
            <br />
            Securities and insurance products are not FDIC insured and may lose value.
          </div>
        </div>
      </div>
    </footer>
  );
}