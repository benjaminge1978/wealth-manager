import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { useServicesData } from "../hooks/useSanityData";
import { useEffect, useRef } from 'react';
import rough from 'roughjs';

function RoughCircleBackground({ color, size }: { color: string, size: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasDrawn = useRef(false);

  useEffect(() => {
    if (!svgRef.current || hasDrawn.current) return;

    const svg = svgRef.current;
    const rc = rough.svg(svg);

    const strokeWidth = 1.5;
    const roughness = 0.3;
    const bowing = 0.2;

    // Only draw once
    svg.appendChild(rc.circle(size / 2, size / 2, size * 0.85, {
      stroke: color,
      strokeWidth,
      roughness,
      bowing,
      fill: color,
      fillStyle: 'solid',
      fillOpacity: 0.2
    }));

    hasDrawn.current = true;
  }, [color, size]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0
      }}
    />
  );
}

export function ServicesSection() {
  const { data: servicesData, loading, error } = useServicesData();

  // Icon mapping for hand-drawn icons
  const iconMap = {
    PieChart: 'pie-chart' as const,
    FileText: 'file-text' as const,
    Shield: 'shield' as const,
    TrendingUp: 'trending-up' as const,
    GraduationCap: 'graduation-cap' as const,
    Heart: 'heart' as const,
  };

  // Fallback data with color coordination
  const fallbackServices = [
    {
      icon: "PieChart",
      title: "Wealth Management",
      description: "Comprehensive portfolio management and investment strategies tailored to your risk tolerance and financial goals.",
      order: 1,
      iconColor: "#7c3aed", // Purple
      pastelColor: "#c4b5fd", // Light purple
      iconBackground: "bg-violet-100 group-hover:bg-violet-200",
      circleColor: "bg-violet-300"
    },
    {
      icon: "FileText",
      title: "Financial Planning",
      description: "Goals-based financial planning that creates a clear roadmap to achieve your short and long-term objectives.",
      order: 2,
      iconColor: "#0ea5e9", // Sky blue
      pastelColor: "#93c5fd", // Light sky blue
      iconBackground: "bg-sky-100 group-hover:bg-sky-200",
      circleColor: "bg-sky-300"
    },
    {
      icon: "Shield",
      title: "Protection",
      description: "Whatever matters most — your family, business, or income — we'll ensure it's properly protected with the right life, health and income plans.",
      order: 3,
      iconColor: "#059669", // Emerald
      pastelColor: "#86efac", // Light emerald
      iconBackground: "bg-emerald-100 group-hover:bg-emerald-200",
      circleColor: "bg-emerald-300"
    },
    {
      icon: "TrendingUp",
      title: "Mortgage Advice",
      description: "Access experienced mortgage advisers who provide clear, regulated guidance for first-time buyers, remortgaging or buy-to-let solutions.",
      order: 4,
      iconColor: "#dc2626", // Red
      pastelColor: "#fca5a5", // Light red
      iconBackground: "bg-red-100 group-hover:bg-red-200",
      circleColor: "bg-red-300"
    },
    {
      icon: "GraduationCap",
      title: "Education Planning",
      description: "Strategic planning for education expenses with tax-efficient savings strategies and investment growth.",
      order: 5,
      iconColor: "#d97706", // Amber
      pastelColor: "#fcd34d", // Light amber
      iconBackground: "bg-amber-100 group-hover:bg-amber-200",
      circleColor: "bg-amber-300"
    },
    {
      icon: "Heart",
      title: "Retirement Planning",
      description: "Comprehensive retirement strategies ensuring you maintain your desired lifestyle throughout your golden years.",
      order: 6,
      iconColor: "#e11d48", // Rose
      pastelColor: "#fda4af", // Light rose
      iconBackground: "bg-rose-100 group-hover:bg-rose-200",
      circleColor: "bg-rose-300"
    }
  ];

  const services = servicesData || fallbackServices;

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whatever your financial goals, we'll connect you with an adviser who can help you move forward with the confidence you need to build, protect and transfer wealth effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const iconType = iconMap[service.icon as keyof typeof iconMap] || 'pie-chart';
            return (
              <Card key={index} className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {/* Rough circle background - smaller with pastel colors */}
                    <RoughCircleBackground color={service.pastelColor} size={60} />
                    {/* Icon in front */}
                    <div className="relative z-10">
                      <HandDrawnIcon 
                        type={iconType} 
                        size={32} 
                        color={service.iconColor}
                        className="group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
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