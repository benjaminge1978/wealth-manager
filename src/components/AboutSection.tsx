import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import aboutImage from "../assets/financial-advive-couple.jpg";

export function AboutSection() {
  const stats = [
    {
      icon: <HandDrawnIcon type="users" size={24} className="text-primary" />,
      value: "500+",
      label: "Clients Served"
    },
    {
      icon: <HandDrawnIcon type="clock" size={24} className="text-primary" />,
      value: "15+",
      label: "Years Experience"
    },
    {
      icon: <HandDrawnIcon type="award" size={24} className="text-primary" />,
      value: "$250M+",
      label: "Assets Under Management"
    },
    {
      icon: <HandDrawnIcon type="shield" size={24} className="text-primary" />,
      value: "100%",
      label: "Regulated & Compliant"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/50 to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-medium">
                Trusted Financial Guidance
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For almost 2 decades, we've been helping individuals, families, and businesses make confident financial decisions. Our network of advisers combine expert knowledge with a personal approach, creating strategies designed to support your goals at every stage of life.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                All of the Financial Advisers we work with are fully qualified as well as being authorised and regulated by the Financial Conduct Authority. Every recommendation we make is based on a clear understanding of your circumstances and backed by thorough research and analysis.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Our Commitment</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Clear, regulated advice you can rely on</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Ongoing support and regular reviews</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">A personalised, goals-based approach to financial planning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8 lg:order-2 order-1">
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