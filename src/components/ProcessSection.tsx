import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, MessageSquare, Target, TrendingUp } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Discovery & Consultation",
      description: "We start with an in-depth consultation to understand your current financial situation, goals, and concerns. This forms the foundation of your personalized strategy."
    },
    {
      step: "02",
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Goals-Based Planning",
      description: "We create a comprehensive financial plan that aligns with your specific goals, whether it's retirement, education funding, or wealth preservation."
    },
    {
      step: "03",
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      title: "Implementation",
      description: "We execute your personalized strategy with regulated investment advice and ongoing portfolio management to keep you on track."
    },
    {
      step: "04",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Monitoring & Adjusting",
      description: "We continuously monitor your progress and adjust your strategy as your life circumstances and market conditions change."
    }
  ];

  return (
    <section id="process" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven, systematic approach to achieving your financial goals through personalized planning and expert guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/30 transition-all duration-300">
                  {step.icon}
                </div>
                <div>
                  <div className="text-sm text-primary font-medium mb-2">Step {step.step}</div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 transform -translate-y-1/2">
                  <div className="w-full h-0.5 bg-border"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-border border-y-2 border-y-transparent"></div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}