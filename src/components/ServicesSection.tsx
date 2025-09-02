import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  PieChart, 
  Shield, 
  TrendingUp, 
  FileText, 
  Heart, 
  Home,
  Briefcase,
  GraduationCap,
  DollarSign,
  Building,
  BarChart,
  Target,
  Scale,
  Lock,
  Gem,
  Smartphone,
  Star,
  Zap
} from "lucide-react";
import { useServicesData } from "../hooks/useSanityData";

export function ServicesSection() {
  const { data: servicesData, loading, error } = useServicesData();

  // Icon mapping
  const iconMap = {
    PieChart,
    FileText,
    Shield,
    TrendingUp,
    GraduationCap,
    Heart,
    DollarSign,
    Building,
    BarChart,
    Target,
    Briefcase,
    Home,
    Scale,
    Lock,
    Gem,
    Smartphone,
    Star,
    Zap
  } as const;

  // Fallback data
  const fallbackServices = [
    {
      icon: "PieChart",
      title: "Wealth Management",
      description: "Comprehensive portfolio management and investment strategies tailored to your risk tolerance and financial goals.",
      order: 1
    },
    {
      icon: "FileText",
      title: "Financial Planning",
      description: "Goals-based financial planning that creates a clear roadmap to achieve your short and long-term objectives.",
      order: 2
    },
    {
      icon: "Shield",
      title: "Risk Management",
      description: "Protect your wealth with strategic insurance planning and risk assessment tailored to your unique situation.",
      order: 3
    },
    {
      icon: "TrendingUp",
      title: "Investment Advisory",
      description: "Regulated investment advice with ongoing portfolio monitoring and strategic adjustments as markets evolve.",
      order: 4
    },
    {
      icon: "GraduationCap",
      title: "Education Planning",
      description: "Strategic planning for education expenses with tax-efficient savings strategies and investment growth.",
      order: 5
    },
    {
      icon: "Heart",
      title: "Retirement Planning",
      description: "Comprehensive retirement strategies ensuring you maintain your desired lifestyle throughout your golden years.",
      order: 6
    }
  ];

  const services = servicesData || fallbackServices;

  const specialties = [
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "Business Owners",
      description: "Exit planning, succession strategies, and business protection"
    },
    {
      icon: <Home className="w-6 h-6 text-primary" />,
      title: "Estate Planning",
      description: "Wealth transfer strategies and legacy preservation"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial services designed to help you build, protect, and transfer wealth effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || PieChart;
            return (
              <Card key={index} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div 
                    className="group-hover:scale-110 transition-transform duration-300 inline-block"
                    style={{ transformOrigin: 'left center' }}
                  >
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {service.description}
                  </CardDescription>
                  <a 
                    href={service.link || "#services"} 
                    className="text-primary hover:text-primary/80 text-base font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    Learn more
                    <span className="text-sm">›</span>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}