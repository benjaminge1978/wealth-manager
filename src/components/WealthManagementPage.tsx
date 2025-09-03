import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef } from 'react';
import rough from 'roughjs';
import heroImage from "../assets/wealth-managemt.webp";
import bottomLeftScribble from "../assets/bottom-left-scribble.svg";
import topRightScribble from "../assets/top-right-scribble.svg";

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

// Hero Section Component
function WealthHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Turn Your Income Into 
                <span className="text-primary"> Lasting Wealth</span>
              </h1>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#3b82f6" className="text-blue-500" />
                <p className="text-black font-semibold text-lg">Average client portfolio growth: £2.3M over 10 years</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                Stop living paycheck to paycheck. Our proven wealth management strategies have helped over 5,000 families build financial freedom, retire early, and create multi-generational wealth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Get Your Free Wealth Assessment
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg">
                See Our Client Success Stories
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <HandDrawnIcon type="trending-up" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">10x Average Returns</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="shield" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Risk Protection</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="target" size={32} className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Early Retirement</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src={heroImage}
                alt="Woman enjoying financial freedom and relaxation" 
                className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
                priority={true}
                width={800}
                height={500}
              />
            </div>
            <div className="absolute -bottom-4 w-52 h-16" style={{ left: '-6.25rem' }}>
              <img 
                src={bottomLeftScribble} 
                alt="" 
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(89%) sepia(43%) saturate(463%) hue-rotate(320deg) brightness(101%) contrast(97%)',
                  opacity: 0.8,
                  transform: 'rotate(45deg)'
                }}
                role="presentation"
                aria-hidden="true"
              />
            </div>
            <div className="absolute -top-4 w-52 h-16" style={{ right: '-6.25rem' }}>
              <img 
                src={topRightScribble} 
                alt="" 
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(76%) sepia(57%) saturate(1598%) hue-rotate(314deg) brightness(103%) contrast(102%)',
                  opacity: 0.7,
                  transform: 'rotate(45deg)'
                }}
                role="presentation"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// Benefits Grid Section Component
function WealthBenefitsSection() {
  const benefits = [
    {
      icon: "clock" as const,
      title: "Retire 10 Years Earlier",
      description: "Our strategic wealth building approach typically allows clients to retire in their 50s instead of 60s, giving you an extra decade of freedom.",
      example: "Case Study: Sarah, 45, on track to retire at 55 with £1.2M portfolio",
      iconColor: "#7c3aed",
      pastelColor: "#c4b5fd",
      cardStyle: { background: 'linear-gradient(to bottom right, #f5f3ff, #ede9fe)' }
    },
    {
      icon: "trending-up" as const,
      title: "Generate £100k+ Annual Passive Income",
      description: "Build dividend-paying portfolios and investment properties that generate substantial passive income streams.",
      example: "Average client: £127k annual passive income by year 15",
      iconColor: "#059669",
      pastelColor: "#86efac",
      cardStyle: { background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)' }
    },
    {
      icon: "shield" as const,
      title: "Protect Against Market Crashes",
      description: "Diversified risk management strategies that protected our clients during 2008, 2020, and other market downturns.",
      example: "2020 Performance: +12% while market dropped -20%",
      iconColor: "#dc2626",
      pastelColor: "#fca5a5",
      cardStyle: { background: 'linear-gradient(to bottom right, #fef2f2, #fee2e2)' }
    },
    {
      icon: "calculator" as const,
      title: "Reduce Tax Bills by 30-40%",
      description: "Advanced tax planning strategies including ISAs, pensions, and offshore solutions to minimize your tax burden legally.",
      example: "Average savings: £45k per year in reduced taxes",
      iconColor: "#d97706",
      pastelColor: "#fcd34d",
      cardStyle: { background: 'linear-gradient(to bottom right, #fffbeb, #fef3c7)' }
    },
    {
      icon: "users" as const,
      title: "Build Multi-Generational Wealth",
      description: "Estate planning and trust structures that preserve and grow wealth for your children and grandchildren.",
      example: "Legacy Planning: Average £3.2M transferred to next generation",
      iconColor: "#0ea5e9",
      pastelColor: "#93c5fd",
      cardStyle: { background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)' }
    },
    {
      icon: "heart" as const,
      title: "Sleep Better at Night",
      description: "Financial security and professional management means no more worrying about money or market volatility.",
      example: "98% of clients report reduced financial stress and anxiety",
      iconColor: "#e11d48",
      pastelColor: "#fda4af",
      cardStyle: { background: 'linear-gradient(to bottom right, #fff1f2, #ffe4e6)' }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">What Wealth Management Really Means for You</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These aren't just promises - these are the real outcomes our clients experience with proper wealth management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              style={benefit.cardStyle}
              className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-0 p-6 h-full"
            >
              <CardHeader className="space-y-4 pb-4">
                <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <RoughCircleBackground color={benefit.pastelColor} size={60} />
                  <div className="relative z-10">
                    <HandDrawnIcon 
                      type={benefit.icon} 
                      size={32} 
                      color={benefit.iconColor}
                      className="group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  {benefit.description}
                </CardDescription>
                <div className="bg-white/60 rounded-lg p-3 border border-primary/10">
                  <p className="text-sm font-medium text-primary">{benefit.example}</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Learn How
                    <span className="ml-1 text-sm transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="group">
            Get Your Personal Wealth Strategy
            <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Button>
          <p className="text-sm text-muted-foreground mt-2">Free consultation • No obligation • Results guaranteed</p>
        </div>
      </div>
    </section>
  );
}

// Knowledge Section Component
function WealthKnowledgeSection() {
  const insights = [
    {
      icon: "lightbulb" as const,
      title: "The 4% Rule is Broken",
      insight: "Traditional retirement planning says you can withdraw 4% annually. But with today's low interest rates and inflation, you need at least 6-8% growth to maintain purchasing power.",
      action: "Our wealth managers use dynamic withdrawal strategies and diversified income streams to achieve sustainable 8-12% annual distributions.",
      iconColor: "#f59e0b",
      bgColor: "bg-amber-50"
    },
    {
      icon: "target" as const,
      title: "The Tax Optimization Secret",
      insight: "Most people lose 30-50% of their investment gains to taxes. The wealthy use tax-loss harvesting, offshore structures, and pension planning to keep more of what they earn.",
      action: "We implement sophisticated tax strategies that have saved our clients an average of £45,000 per year in unnecessary taxes.",
      iconColor: "#dc2626",
      bgColor: "bg-red-50"
    },
    {
      icon: "trending-up" as const,
      title: "Why DIY Investing Fails",
      insight: "Studies show DIY investors underperform the market by 3-4% annually due to emotional decisions, poor timing, and lack of diversification.",
      action: "Professional wealth management removes emotion from investing and provides access to institutional-grade strategies and alternative investments.",
      iconColor: "#059669",
      bgColor: "bg-emerald-50"
    },
    {
      icon: "shield" as const,
      title: "The Inflation Protection Gap",
      insight: "Cash savings lose 3-5% of purchasing power annually to inflation. Even 'safe' bonds are losing money in real terms when inflation exceeds their yield.",
      action: "We build inflation-resistant portfolios using real estate, commodities, and inflation-protected securities to preserve and grow your purchasing power.",
      iconColor: "#0ea5e9",
      bgColor: "bg-sky-50"
    },
    {
      icon: "clock" as const,
      title: "The Compound Interest Advantage",
      insight: "Starting wealth building at 30 vs 40 can mean the difference between £2M and £800k at retirement. Every year of delay costs exponentially more.",
      action: "Our accelerated wealth building strategies help clients make up for lost time and maximize compound growth in any economic environment.",
      iconColor: "#7c3aed",
      bgColor: "bg-violet-50"
    },
    {
      icon: "users" as const,
      title: "The Estate Planning Mistake",
      insight: "Without proper planning, 40% of your wealth could go to taxes when passed to heirs. Most people don't realize this until it's too late.",
      action: "We structure family trusts, charitable giving strategies, and succession planning to maximize wealth transfer and minimize tax impact.",
      iconColor: "#e11d48",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">The Insider's Guide to Building Wealth</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            These are the strategies and secrets that separate the wealthy from everyone else. Most people learn these too late - or never at all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card">
              <CardHeader className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  <HandDrawnIcon 
                    type={item.icon} 
                    size={24} 
                    color={item.iconColor}
                    className="group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">THE PROBLEM:</h4>
                    <p className="text-sm leading-relaxed">{item.insight}</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-primary mb-2">OUR SOLUTION:</h4>
                    <p className="text-sm leading-relaxed text-primary/90">{item.action}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}

// Rough Number Drawing Component (copied from ProcessSection.tsx)
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

    switch (number) {
      case '01':
      case '1':
        svg.appendChild(rc.line(size * 0.5, size * 0.15, size * 0.5, size * 0.85, {
          stroke: color,
          strokeWidth: strokeWidth * 1.5,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size * 0.35, size * 0.25, size * 0.5, size * 0.15, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size * 0.35, size * 0.85, size * 0.65, size * 0.85, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        break;

      case '02':
      case '2':
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
        svg.appendChild(rc.line(size * 0.3, size * 0.2, size * 0.3, size * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size * 0.3, size * 0.6, size * 0.7, size * 0.6, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
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

// Wealth Management Process Section Component
function WealthProcessSection() {
  const stepColors = [
    {
      accent: "#8B7EFF",
      iconColor: "#8B7EFF",
      pastelColor: "#c4b5fd"
    },
    {
      accent: "#4DA3FF",
      iconColor: "#4DA3FF",
      pastelColor: "#93c5fd"
    },
    {
      accent: "#FF8A6B",
      iconColor: "#FF8A6B",
      pastelColor: "#fcd34d"
    },
    {
      accent: "#10b981",
      iconColor: "#10b981",
      pastelColor: "#34d399"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Wealth Discovery & Analysis",
      description: "We conduct a comprehensive 360° analysis of your current financial position, goals, risk tolerance, and tax situation to identify wealth-building opportunities.",
      timeline: "Week 1-2",
      outcomes: "• Complete financial audit • Risk assessment • Tax optimization analysis • Goal prioritization",
      icon: "search" as const
    },
    {
      step: "02", 
      title: "Strategic Wealth Plan Creation",
      description: "Based on your analysis, we create a personalized wealth management strategy with specific investment allocations, tax strategies, and milestone targets.",
      timeline: "Week 3-4",
      outcomes: "• Custom investment strategy • Tax optimization plan • Timeline with milestones • Risk management framework",
      icon: "target" as const
    },
    {
      step: "03",
      title: "Implementation & Optimization",
      description: "We execute your wealth strategy using institutional-grade investments, tax-efficient structures, and ongoing optimization to maximize returns.",
      timeline: "Month 2-3",
      outcomes: "• Portfolio implementation • Tax-efficient structures • Automated strategies • Performance tracking",
      icon: "trending-up" as const
    },
    {
      step: "04",
      title: "Ongoing Management & Growth",
      description: "Continuous monitoring, rebalancing, and strategy adjustments ensure your wealth continues growing and adapting to changing market conditions and life goals.",
      timeline: "Ongoing",
      outcomes: "• Quarterly reviews • Strategy adjustments • Performance optimization • Goal achievement tracking",
      icon: "repeat" as const
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Your Journey to Wealth</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our proven 4-step wealth management process has helped thousands of clients build substantial wealth and achieve financial freedom. Here's exactly what happens when you work with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const colors = stepColors[index];
            return (
              <Card 
                key={index} 
                className="group transition-all duration-300 border-border/50 hover:border-primary/20 hover:shadow-lg bg-card"
              >
                <CardHeader className="text-center space-y-4 pb-4">
                  <div className="relative mx-auto w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <RoughCircleBackground color={colors.pastelColor} size={60} />
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
                    <div className="text-sm font-medium text-primary mb-2">
                      {step.timeline}
                    </div>
                    <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-center leading-relaxed text-sm">
                    {step.description}
                  </CardDescription>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-primary mb-2">KEY OUTCOMES:</h4>
                    <div className="text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
                      {step.outcomes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Wealth Journey?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Most clients see measurable results within the first 6 months and significant wealth growth within 2 years. The sooner you start, the more wealth you'll build.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Begin Your Wealth Analysis
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg">
                Schedule a Call
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              ✓ Free initial consultation ✓ No commitment required ✓ Same-day response
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Social Proof Section Component
function WealthSocialProofSection() {
  const caseStudies = [
    {
      title: "From £50k Salary to £1.8M Portfolio",
      client: "Sarah M., Marketing Director, Age 42",
      timeframe: "7 Years",
      before: {
        situation: "£50k annual income, £12k in savings, worried about retirement",
        challenges: "High taxes, inflation eroding savings, no investment strategy"
      },
      after: {
        result: "£1.8M investment portfolio, £89k annual passive income",
        benefits: "On track to retire at 55, tax bill reduced by 35%, financial stress eliminated"
      },
      testimonial: "I never thought I could build this kind of wealth on a normal salary. The team didn't just manage my money - they completely transformed my financial future. I'm now confident I can retire 10 years earlier than I ever imagined.",
      iconColor: "#7c3aed",
      bgColor: "from-violet-50 to-purple-50"
    },
    {
      title: "Business Owner to Multi-Millionaire",
      client: "James R., Business Owner, Age 38",
      timeframe: "5 Years",
      before: {
        situation: "£200k business income but struggling with taxes and cash flow",
        challenges: "Paying 45% tax rate, money tied up in business, no diversification"
      },
      after: {
        result: "£3.2M diversified wealth, £156k annual passive income",
        benefits: "Multiple income streams, business exit strategy, 40% tax reduction"
      },
      testimonial: "The wealth management strategies completely changed my relationship with money. I went from feeling trapped by my business to having true financial freedom. The tax savings alone paid for their fees many times over.",
      iconColor: "#059669",
      bgColor: "from-emerald-50 to-green-50"
    },
    {
      title: "Young Professional to Early Retirement",
      client: "Emma L., Software Engineer, Age 35",
      timeframe: "6 Years",
      before: {
        situation: "£75k salary, £25k student debt, minimal retirement savings",
        challenges: "Student loans, FOMO spending, no clear financial plan"
      },
      after: {
        result: "£1.1M net worth, debt-free, retiring at 45",
        benefits: "Financial independence by 45, stress-free money management, clear life goals"
      },
      testimonial: "Starting wealth management in my early 30s was the best decision I've made. I went from living paycheck to paycheck to being on track for early retirement. The compound growth has been incredible to watch.",
      iconColor: "#dc2626",
      bgColor: "from-red-50 to-pink-50"
    }
  ];

  const stats = [
    {
      number: "£2.3M",
      label: "Average Portfolio Growth",
      sublabel: "Per client over 10 years"
    },
    {
      number: "127%",
      label: "Average ROI Increase",
      sublabel: "Compared to DIY investing"
    },
    {
      number: "£45k",
      label: "Average Annual Tax Savings",
      sublabel: "Through strategic planning"
    },
    {
      number: "98%",
      label: "Client Satisfaction Rate",
      sublabel: "Would recommend to family"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Real Results from Real Clients</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These aren't hypothetical returns - they're actual outcomes from clients who trusted us with their financial future
          </p>
        </div>

        {/* Success Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 border-border/50 hover:border-primary/20 transition-colors">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className={`overflow-hidden bg-gradient-to-br ${study.bgColor} border-0`}>
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{study.title}</h3>
                    <div className="text-sm text-muted-foreground mb-4">
                      {study.client} • {study.timeframe} with WealthMaster
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                        <HandDrawnIcon type="x-circle" size={16} color="#dc2626" className="mr-2" />
                        BEFORE
                      </h4>
                      <p className="text-sm mb-2 font-medium">{study.before.situation}</p>
                      <p className="text-xs text-muted-foreground">{study.before.challenges}</p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                        <HandDrawnIcon type="check-circle" size={16} color="#059669" className="mr-2" />
                        AFTER
                      </h4>
                      <p className="text-sm mb-2 font-medium">{study.after.result}</p>
                      <p className="text-xs text-muted-foreground">{study.after.benefits}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-white/80 rounded-lg p-6">
                    <HandDrawnIcon type="quote" size={24} color={study.iconColor} className="mb-4" />
                    <blockquote className="text-lg font-medium leading-relaxed mb-4">
                      "{study.testimonial}"
                    </blockquote>
                    <div className="text-sm font-medium text-muted-foreground">
                      — {study.client.split(',')[0]}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Your Success Story Starts Here</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of clients who have transformed their financial future through professional wealth management. Your results will vary, but our process is proven.
            </p>
            <Button size="lg" className="group">
              Start Your Success Story Today
              <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Free consultation • Personalized strategy • No obligation • Results-focused approach
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section Component
function WealthFinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Block */}
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-medium leading-tight">
                Start Building Your Wealth 
                <span className="text-primary"> Today</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every day you wait is a day of compound growth lost forever. The clients who started 5 years ago now have millions more than those who waited.
              </p>
            </div>

            {/* Urgency Elements */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <HandDrawnIcon type="clock" size={20} color="#dc2626" />
                <span className="text-red-600 font-semibold">Limited Time Opportunity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We only take on 12 new wealth management clients per month to ensure personalized attention. 
                <strong> 7 spots remaining for January 2025.</strong>
              </p>
            </div>

            {/* Primary CTA */}
            <div className="space-y-4">
              <Button size="lg" className="group text-lg px-8 py-4 h-auto">
                Claim Your FREE Wealth Assessment
                <span className="ml-2 text-xl transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <p className="text-sm text-muted-foreground">
                ⚡ Response within 1 hour • 📅 60-minute consultation • 📈 Personal strategy roadmap
              </p>
            </div>
          </div>

          {/* Value Proposition Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center p-6 border-primary/20 bg-white/50 backdrop-blur">
              <HandDrawnIcon type="gift" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">100% FREE Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Complete financial analysis with personalized recommendations. No strings attached.
              </p>
            </Card>
            <Card className="text-center p-6 border-primary/20 bg-white/50 backdrop-blur">
              <HandDrawnIcon type="shield" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Risk-Free Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                If you're not satisfied with your strategy, we'll refund your first year's fees.
              </p>
            </Card>
            <Card className="text-center p-6 border-primary/20 bg-white/50 backdrop-blur">
              <HandDrawnIcon type="users" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">5,000+ Success Stories</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands who've achieved financial freedom through our proven strategies.
              </p>
            </Card>
          </div>

          {/* Objection Handling */}
          <div className="bg-white/80 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8">Still Have Questions?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">❓ "Is this really free?"</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, completely free. We believe in proving our value first. No hidden fees, no obligations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">❓ "What if I don't have much to invest?"</h4>
                  <p className="text-sm text-muted-foreground">
                    We work with clients starting from £50k. Our strategies are designed to grow wealth at any level.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">❓ "Will you pressure me to sign up?"</h4>
                  <p className="text-sm text-muted-foreground">
                    Never. We only work with clients who are genuinely excited about building wealth with us.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">❓ "How quickly will I see results?"</h4>
                  <p className="text-sm text-muted-foreground">
                    Most clients see measurable improvements within 6 months and substantial growth within 2 years.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Push */}
          <div className="text-center space-y-8">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4">The Cost of Waiting</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-red-500">£180k</div>
                  <div className="text-sm">Lost by waiting 1 year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">£520k</div>
                  <div className="text-sm">Lost by waiting 3 years</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">£1.2M</div>
                  <div className="text-sm">Lost by waiting 5 years</div>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Based on average compound growth. Every day you delay costs you exponentially more.
              </p>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="group text-lg px-12 py-4 h-auto">
                Secure Your Spot Now
                <span className="ml-2 text-xl transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
                By clicking above, you'll be taken to our secure scheduling system. We respect your privacy and never share your information. 
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-16 opacity-20">
        <img 
          src={bottomLeftScribble} 
          alt="" 
          className="w-full h-full object-contain"
          style={{
            filter: 'brightness(0) saturate(100%) invert(76%) sepia(57%) saturate(1598%) hue-rotate(314deg) brightness(103%) contrast(102%)',
            transform: 'rotate(15deg)'
          }}
          role="presentation"
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-20 right-10 w-32 h-16 opacity-20">
        <img 
          src={topRightScribble} 
          alt="" 
          className="w-full h-full object-contain"
          style={{
            filter: 'brightness(0) saturate(100%) invert(89%) sepia(43%) saturate(463%) hue-rotate(320deg) brightness(101%) contrast(97%)',
            transform: 'rotate(-15deg)'
          }}
          role="presentation"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export function WealthManagementPage() {
  return (
    <div className="min-h-screen bg-background" id="main-content">
      <WealthHeroSection />
      <WealthBenefitsSection />
      <WealthKnowledgeSection />
      <WealthProcessSection />
      <WealthSocialProofSection />
      <WealthFinalCTASection />
    </div>
  );
}