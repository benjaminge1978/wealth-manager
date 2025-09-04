import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef, useState } from 'react';
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
    const roughness = 0.3;
    const bowing = 0.2;

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
          <div className="space-y-8 lg:order-1 order-2">
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

          <div className="relative lg:order-2 order-1">
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
      icon: "credit-card" as const,
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
      icon: "alert-triangle" as const,
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
                      {study.client} • {study.timeframe} with Netfin
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
            <p className="text-sm text-muted-foreground mt-9">
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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    advisorType: '',
    message: '',
    gdprConsent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.advisorType) {
      newErrors.advisorType = 'Please select an advisor type';
    }
    
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'You must agree to the processing of your personal data';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', advisorType: '', message: '', gdprConsent: false });
      setErrors({});
    } catch (error) {
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const benefits = [
    "FREE consultations with certified advisors",
    "We call you within one hour guaranteed", 
    "Personalized wealth strategy in 30 minutes"
  ];

  const advisorTypes = [
    { value: "wealth-management", label: "Wealth Manager" },
    { value: "financial", label: "Financial Advisor" },
    { value: "investment", label: "Investment Advisor" },
    { value: "estate-planning", label: "Estate Planning" }
  ];

  if (isSubmitted) {
    return (
      <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <HandDrawnIcon type="check-circle" size={80} color="#0065ff" className="mx-auto text-primary" />
              <h1 className="text-4xl lg:text-5xl font-medium leading-tight">
                Thank You!
              </h1>
              <p className="text-xl text-muted-foreground">
                Thank you for contacting us. We'll be with you within the hour.
              </p>
              <p className="text-lg text-muted-foreground">
                One of our certified wealth managers will contact you at <span className="font-medium text-foreground">{formData.phone}</span> to discuss your financial goals.
              </p>
            </div>
            <div className="pt-8">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="lg"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Get Your <span className="text-primary">FREE</span> Wealth Consultation
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Speak with a regulated wealth manager within one hour - no obligation required
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <HandDrawnIcon type="check-circle" size={24} color="#0065ff" className="text-primary flex-shrink-0" />
                  <p className="text-lg font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center gap-3">
                <HandDrawnIcon type="mail" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email us directly</p>
                  <a href="mailto:contact@netfin.co.uk" className="text-lg font-medium text-primary hover:underline">
                    contact@netfin.co.uk
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <HandDrawnIcon type="award" size={32} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-2">Trusted by 500+ Families</h3>
                  <p className="text-sm text-muted-foreground">
                    "Professional, knowledgeable, and always puts our needs first. Highly recommended!"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">- Sarah M., London</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="relative lg:order-2 order-1">
            <Card className="shadow-2xl relative z-10">
              <CardHeader>
                <CardTitle className="text-2xl">Schedule Your FREE Consultation</CardTitle>
                <p className="text-muted-foreground">
                  We'll contact you within one hour to schedule your complimentary consultation.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name <span className="text-red-500" aria-label="required">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Best Phone Number <span className="text-red-500" aria-label="required">*</span></Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="020 7123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={errors.phone ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advisorType">Which advisor can help you most? <span className="text-red-500" aria-label="required">*</span></Label>
                    <Select 
                      value={formData.advisorType} 
                      onValueChange={(value) => handleInputChange('advisorType', value)}
                    >
                      <SelectTrigger 
                        className={errors.advisorType ? "border-red-500 focus:ring-red-500" : ""}
                        aria-invalid={!!errors.advisorType}
                        aria-describedby={errors.advisorType ? "advisorType-error" : undefined}
                      >
                        <SelectValue placeholder="Select an advisor type" />
                      </SelectTrigger>
                      <SelectContent>
                        {advisorTypes.map((advisor) => (
                          <SelectItem key={advisor.value} value={advisor.value}>
                            {advisor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.advisorType && (
                      <p id="advisorType-error" className="text-red-500 text-sm" role="alert">
                        {errors.advisorType}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="gdpr-consent-wealth" 
                      checked={formData.gdprConsent}
                      onCheckedChange={(checked: boolean) => handleInputChange('gdprConsent', checked)}
                      className="mt-1"
                      aria-invalid={!!errors.gdprConsent}
                      aria-describedby={errors.gdprConsent ? "gdpr-consent-error" : undefined}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="gdpr-consent-wealth" 
                        className="text-sm font-normal cursor-pointer"
                      >
                        I agree to the processing of my personal data in accordance with the{" "}
                        <a href="/privacy" className="text-primary hover:underline" target="_blank">
                          Privacy Policy
                        </a>
                        <span className="text-red-500 ml-1" aria-label="required">*</span>
                      </Label>
                      {errors.gdprConsent && (
                        <p id="gdpr-consent-error" className="text-red-500 text-sm" role="alert">
                          {errors.gdprConsent}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? "Scheduling consultation..." : "Get my free consultation"}
                  >
                    {isSubmitting ? "Scheduling..." : "Get My FREE Consultation"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    100% confidential • No obligation • Usually responds within 1 hour
                  </p>
                </form>
              </CardContent>
            </Card>
            {/* Bottom left scribble */}
            <div className="absolute -bottom-4 w-40 h-12" style={{ left: '-2rem' }}>
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
            {/* Top right scribble */}
            <div className="absolute -top-4 w-40 h-12" style={{ right: 'calc(-2rem - 30px)' }}>
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

// FAQ Section Component for AEO Optimization
function WealthFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I choose a good wealth manager?",
      answer: "Look for credentials like CFP or CFA, fee-only structure, fiduciary duty, minimum asset requirements that match your portfolio, transparent fee disclosure, and a clear investment philosophy. Verify their registration with the FCA and check for any disciplinary actions. Interview multiple advisors and ask about their experience with clients in similar situations to yours."
    },
    {
      question: "What's the difference between a financial advisor and wealth manager?",
      answer: "Financial advisors typically work with middle-income clients on budgeting, retirement planning, and basic investment advice. Wealth managers focus on high-net-worth individuals (usually £250k+ assets) and provide comprehensive services including tax planning, estate planning, alternative investments, and coordinated financial strategies."
    },
    {
      question: "How much should I pay for wealth management?",
      answer: "Typical fees range from 0.5% to 2% of assets under management annually. Fee-only advisors charge transparent rates: around 1% for portfolios over £500k, 0.75% for £1M+, and 0.5% for £2M+. Avoid commission-based advisors who may have conflicts of interest. Always understand exactly what services you're getting for the fee."
    },
    {
      question: "What are red flags when choosing a financial advisor?",
      answer: "Warning signs include: promising guaranteed returns, pressure to invest immediately, lack of proper credentials, commission-only compensation, not registered as a fiduciary, avoiding fee disclosure, poor communication, no written investment policy, recent disciplinary actions, or pushing inappropriate high-risk investments."
    },
    {
      question: "Should I use a fee-only or commission-based advisor?",
      answer: "Fee-only advisors are generally preferred because they have no conflicts of interest from product sales. They're paid directly by you for advice, not by investment companies for selling products. Commission-based advisors may recommend investments that pay them higher fees rather than what's best for your portfolio."
    },
    {
      question: "When do I need a wealth manager vs DIY investing?",
      answer: "Consider professional wealth management when you have £250k+ in investable assets, complex financial situations (business ownership, inheritance, multiple properties), limited time for investment research, or need specialized services like tax planning or estate planning. DIY works for simple buy-and-hold strategies with smaller portfolios."
    },
    {
      question: "How do I verify a financial advisor's credentials?",
      answer: "Check their registration with the Financial Conduct Authority (FCA) using their online register. Verify professional certifications like CFP (Certified Financial Planner) or CFA (Chartered Financial Analyst) with the issuing organizations. Look up any disciplinary actions or complaints through regulatory databases."
    },
    {
      question: "What questions should I ask a potential wealth manager?",
      answer: "Essential questions include: Are you a fiduciary? How are you compensated? What are your credentials and experience? What's your investment philosophy? How often will we meet? What services are included in your fee? Can you provide references? How do you handle market downturns? What's your typical client profile?"
    }
  ];

  // Generate FAQ Schema for AI engines
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      {/* FAQ Schema Markup for AI Optimization */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-medium">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about choosing and working with a wealth manager
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="border-border/50 hover:border-primary/20 transition-colors overflow-hidden"
              >
                <div
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFAQ(index);
                    }
                  }}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <HandDrawnIcon 
                        type="help-circle" 
                        size={20} 
                        color="#3b82f6" 
                        className="mt-1 flex-shrink-0" 
                      />
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <HandDrawnIcon 
                      type={openIndex === index ? "minus" : "plus"} 
                      size={20} 
                      color="#3b82f6" 
                      className="flex-shrink-0 transition-transform duration-200"
                    />
                  </div>
                </div>
                {openIndex === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="animate-in slide-in-from-top-2 duration-300"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed pl-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-primary/5 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our vetted wealth management professionals can answer your specific questions and help you make the right financial decisions.
              </p>
              <Button size="lg" className="group">
                Speak to a Qualified Advisor
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                Free consultation • No obligation • Matched to your specific needs
              </p>
            </div>
          </div>
        </div>
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
      <WealthFAQSection />
      <WealthFinalCTASection />
    </div>
  );
}