import React from "react";
import { 
  PieChart, 
  FileText, 
  Shield, 
  TrendingUp, 
  GraduationCap,
  Heart,
  ChevronRight 
} from "lucide-react";

export function ServicesBar() {
  const services = [
    {
      icon: <PieChart className="w-4 h-4" />,
      label: "Wealth Management",
      href: "#services"
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Financial Planning",
      href: "#services"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      label: "Risk Management",
      href: "#services"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "Investment Advisory",
      href: "#services"
    },
    {
      icon: <GraduationCap className="w-4 h-4" />,
      label: "Education Planning",
      href: "#services"
    },
    {
      icon: <Heart className="w-4 h-4" />,
      label: "Retirement Planning",
      href: "#services"
    }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-primary w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center py-4">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              onClick={(e) => handleClick(e, service.href)}
              className="flex items-center gap-2 px-4 py-3 text-white/90 hover:text-white transition-all hover:bg-white/10 rounded-lg text-base group"
            >
              <span className="group-hover:scale-110 transition-transform">
                {React.cloneElement(service.icon, { className: "w-5 h-5" })}
              </span>
              <span className="whitespace-nowrap hover:underline underline-offset-4 font-medium">
                {service.label}
              </span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}