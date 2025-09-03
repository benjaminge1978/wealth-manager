import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
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
    const roughness = 0.8;
    const bowing = 0.5;

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

function RoughNumber({ 
  number, 
  size = 64, 
  color = 'currentColor', 
  className = '' 
}: { 
  number: string;
  size?: number;
  color?: string;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasDrawn = useRef(false);

  useEffect(() => {
    if (!svgRef.current || hasDrawn.current) return;

    const svg = svgRef.current;
    const rc = rough.svg(svg);

    const strokeWidth = Math.max(2, size / 20);
    const roughness = 0.8;
    const bowing = 0.5;

    // Only draw once
    switch (number) {
      case '01':
      case '1':
        // Number 1 - vertical line with serifs
        svg.appendChild(rc.line(size * 0.5, size * 0.15, size * 0.5, size * 0.85, {
          stroke: color,
          strokeWidth: strokeWidth * 1.5,
          roughness,
          bowing
        }));
        // Top serif
        svg.appendChild(rc.line(size * 0.35, size * 0.25, size * 0.5, size * 0.15, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        // Bottom serif
        svg.appendChild(rc.line(size * 0.35, size * 0.85, size * 0.65, size * 0.85, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case '02':
      case '2':
        // Number 2 - curved top, angled middle, straight bottom
        svg.appendChild(rc.path(
          `M ${size * 0.25} ${size * 0.3} Q ${size * 0.5} ${size * 0.1} ${size * 0.75} ${size * 0.3} Q ${size * 0.8} ${size * 0.45} ${size * 0.6} ${size * 0.6} L ${size * 0.25} ${size * 0.8} L ${size * 0.8} ${size * 0.8}`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case '03':
      case '3':
        // Number 3 - two curved segments
        svg.appendChild(rc.path(
          `M ${size * 0.25} ${size * 0.25} Q ${size * 0.6} ${size * 0.15} ${size * 0.6} ${size * 0.35} Q ${size * 0.6} ${size * 0.5} ${size * 0.45} ${size * 0.5}`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        svg.appendChild(rc.path(
          `M ${size * 0.45} ${size * 0.5} Q ${size * 0.65} ${size * 0.5} ${size * 0.65} ${size * 0.7} Q ${size * 0.65} ${size * 0.85} ${size * 0.25} ${size * 0.75}`,
          {
            stroke: color,
            strokeWidth,
            roughness,
            bowing,
            fill: 'none'
          }
        ));
        break;

      case '04':
      case '4':
        // Number 4 - vertical line, horizontal line, angled line
        // Left vertical
        svg.appendChild(rc.line(size * 0.3, size * 0.2, size * 0.3, size * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        // Horizontal crossbar
        svg.appendChild(rc.line(size * 0.3, size * 0.6, size * 0.7, size * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        // Right vertical (full height)
        svg.appendChild(rc.line(size * 0.7, size * 0.15, size * 0.7, size * 0.85, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;
    }

    hasDrawn.current = true;
  }, [number, size, color]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      className={className}
      style={{ color }}
    />
  );
}

export function ProcessSection() {
  const stepColors = [
    {
      cardBg: "#E6F3FF", // Soft Blue (same as step 2)
      hoverCardBg: "#D6EDFF",
      accent: "#8B7EFF",
      iconColor: "#8B7EFF",
      pastelColor: "#c4b5fd" // Light purple
    },
    {
      cardBg: "#E6F3FF", // Soft Blue
      hoverCardBg: "#D6EDFF", 
      accent: "#4DA3FF",
      iconColor: "#4DA3FF",
      pastelColor: "#93c5fd" // Light blue
    },
    {
      cardBg: "#E6F3FF", // Soft Blue (same as step 2)
      hoverCardBg: "#D6EDFF",
      accent: "#FF8A6B",
      iconColor: "#FF8A6B",
      pastelColor: "#fcd34d" // Light orange
    },
    {
      cardBg: "#E6F3FF", // Soft Blue (same as step 2)
      hoverCardBg: "#D6EDFF",
      accent: "#10b981", 
      iconColor: "#10b981",
      pastelColor: "#34d399" // Darker emerald
    }
  ];

  const steps = [
    {
      step: "01",
      iconType: "message-square" as const,
      title: "Discovery & Consultation",
      description: "We start with an in-depth consultation to understand your current financial situation, goals, and concerns. This forms the foundation of your personalized strategy."
    },
    {
      step: "02",
      iconType: "target" as const,
      title: "Goals-Based Planning",
      description: "We create a comprehensive financial plan that aligns with your specific goals, whether it's retirement, education funding, or wealth preservation."
    },
    {
      step: "03",
      iconType: "check-circle" as const,
      title: "Implementation",
      description: "We execute your personalized strategy with regulated investment advice and ongoing portfolio management to keep you on track."
    },
    {
      step: "04",
      iconType: "trending-up" as const,
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
                className="relative group transition-all duration-300 border-0 bg-transparent"
              >
                <CardHeader className="text-center space-y-4">
                  <div className="relative mx-auto w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {/* Rough circle background */}
                    <RoughCircleBackground color={colors.pastelColor} size={60} />
                    {/* Rough number in front */}
                    <div className="relative z-10">
                      <RoughNumber 
                        number={step.step} 
                        size={40} 
                        color={colors.iconColor}
                        className="group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
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