import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Award, Users, Clock, Shield } from "lucide-react";
import aboutImage from "../assets/financial-advive-couple.jpg";

export function AboutSection() {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      value: "500+",
      label: "Clients Served"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      value: "15+",
      label: "Years Experience"
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      value: "$250M+",
      label: "Assets Under Management"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      value: "100%",
      label: "Regulated & Compliant"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/50 to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-medium">
                Trusted Financial Guidance Since 2009
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are a team of experienced financial advisers dedicated to helping individuals and families achieve their financial dreams. Our approach combines deep market expertise with personalized service to create comprehensive wealth management strategies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As regulated financial advisers, we provide transparent, goals-based planning that puts your interests first. Every recommendation is backed by thorough analysis and aligned with your unique circumstances and objectives.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Our Commitment</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Regulated advice you can trust</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Transparent fee structure with no hidden costs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Ongoing support and portfolio monitoring</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Goals-based approach to financial planning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <ImageWithFallback 
                src={aboutImage}
                alt="Financial advice couple consultation" 
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10 rounded-lg"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-primary/10 bg-gradient-to-br from-card to-secondary/10">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-medium">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}