import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";

export function WhyNetfinSection() {
  const features = [
    {
      iconType: "gift" as const,
      title: "A totally FREE, No obligation consultation",
      description: "Start your journey with a comprehensive financial review at no cost. We'll assess your needs and outline opportunities.",
      cardStyle: { background: 'linear-gradient(to bottom right, #fffbeb, #fef3c7)' },
      iconBackground: "bg-amber-100 group-hover:bg-amber-200",
      circleColor: "bg-amber-300/60",
      iconColor: "#f59e0b"
    },
    {
      iconType: "clock" as const,
      title: "We will get back to you within 1 hour",
      description: "Your time is valuable. Our dedicated team ensures you receive expert guidance when you need it most.",
      cardStyle: { background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)' },
      iconBackground: "bg-emerald-100 group-hover:bg-emerald-200",
      circleColor: "bg-emerald-300/60",
      iconColor: "#059669"
    },
    {
      iconType: "shield" as const,
      title: "Trusted by many",
      description: "Join the families, businesses, and individuals our advisers have supported in working towards their financial goals.",
      cardStyle: { background: 'linear-gradient(to bottom right, #f5f3ff, #ede9fe)' },
      iconBackground: "bg-violet-100 group-hover:bg-violet-200",
      circleColor: "bg-violet-300/60",
      iconColor: "#7c3aed"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Why Netfin?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the true power of Personalised Financial Planning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            return (
              <Card 
                key={index} 
                style={feature.cardStyle}
                className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-0 p-8"
              >
                <CardHeader className="space-y-4">
                  <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                    {/* Background circle */}
                    <div className={`absolute inset-0 w-20 h-20 rounded-full ${feature.circleColor} transition-all duration-300 group-hover:scale-105 z-0`}></div>
                    {/* Icon container */}
                    <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${feature.iconBackground}`}>
                      <HandDrawnIcon 
                        type={feature.iconType} 
                        size={56} 
                        color={feature.iconColor}
                        className="group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed text-center">
                    {feature.description}
                  </CardDescription>
                  <div className="text-center pt-2">
                    <a 
                      href="#contact" 
                      className="text-sm font-medium hover:underline transition-all duration-200 inline-flex items-center gap-1"
                      style={{ color: feature.iconColor }}
                    >
                      Find an advisor
                      <span className="text-sm transition-transform duration-200 hover:translate-x-0.5">→</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}