import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  PieChart, 
  Shield, 
  TrendingUp, 
  FileText, 
  Heart, 
  Home,
  Briefcase,
  GraduationCap 
} from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: <PieChart className="w-8 h-8 text-primary" />,
      title: "Wealth Management",
      description: "Comprehensive portfolio management and investment strategies tailored to your risk tolerance and financial goals."
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Financial Planning",
      description: "Goals-based financial planning that creates a clear roadmap to achieve your short and long-term objectives."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Risk Management",
      description: "Protect your wealth with strategic insurance planning and risk assessment tailored to your unique situation."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Investment Advisory",
      description: "Regulated investment advice with ongoing portfolio monitoring and strategic adjustments as markets evolve."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Education Planning",
      description: "Strategic planning for education expenses with tax-efficient savings strategies and investment growth."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Retirement Planning",
      description: "Comprehensive retirement strategies ensuring you maintain your desired lifestyle throughout your golden years."
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardHeader className="space-y-4">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-card to-secondary/10 border border-primary/10 rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-medium mb-6 text-center">Specialized Expertise</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                  {specialty.icon}
                </div>
                <div>
                  <h4 className="font-medium mb-2">{specialty.title}</h4>
                  <p className="text-muted-foreground">{specialty.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}