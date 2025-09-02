import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, MessageSquare, Target, TrendingUp } from "lucide-react";

export function ProcessSection() {
  const stepColors = [
    {
      cardBg: "#E6F3FF", // Soft Blue (same as step 2)
      hoverCardBg: "#D6EDFF",
      accent: "#8B7EFF",
      iconColor: "text-purple-600"
    },
    {
      cardBg: "#E6F3FF", // Soft Blue
      hoverCardBg: "#D6EDFF", 
      accent: "#4DA3FF",
      iconColor: "text-blue-600"
    },
    {
      cardBg: "#E6F3FF", // Soft Blue (same as step 2)
      hoverCardBg: "#D6EDFF",
      accent: "#FF8A6B",
      iconColor: "text-orange-600"
    },
    {
      cardBg: "#E6F3FF", // Soft Blue (same as step 2)
      hoverCardBg: "#D6EDFF",
      accent: "#4FFFCB", 
      iconColor: "text-emerald-600"
    }
  ];

  const steps = [
    {
      step: "01",
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Discovery & Consultation",
      description: "We start with an in-depth consultation to understand your current financial situation, goals, and concerns. This forms the foundation of your personalized strategy."
    },
    {
      step: "02",
      icon: <Target className="w-8 h-8" />,
      title: "Goals-Based Planning",
      description: "We create a comprehensive financial plan that aligns with your specific goals, whether it's retirement, education funding, or wealth preservation."
    },
    {
      step: "03",
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Implementation",
      description: "We execute your personalized strategy with regulated investment advice and ongoing portfolio management to keep you on track."
    },
    {
      step: "04",
      icon: <TrendingUp className="w-8 h-8" />,
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
          {steps.map((step, index) => {
            const colors = stepColors[index];
            return (
              <Card 
                key={index} 
                className="relative group transition-all duration-300 border-border/50"
                style={{
                  backgroundColor: colors.cardBg,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverCardBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBg;
                }}
              >
                <CardHeader className="text-center space-y-4">
                  <div 
                    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    style={{
                      backgroundColor: 'white',
                      transformOrigin: 'center'
                    }}
                  >
                    <span className={colors.iconColor}>
                      {step.icon}
                    </span>
                  </div>
                  <div>
                    <div 
                      className="text-sm font-medium mb-2"
                      style={{ color: '#1e293b' }}
                    >
                      Step {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}