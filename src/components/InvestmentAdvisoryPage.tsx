import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rough from 'roughjs';
import heroImage from "../assets/financial-advive-couple.jpg";
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
        break;
      case '02':
      case '2':
        svg.appendChild(rc.path(`M${size * 0.2} ${size * 0.3} Q${size * 0.5} ${size * 0.15} ${size * 0.8} ${size * 0.3} L${size * 0.2} ${size * 0.7} L${size * 0.8} ${size * 0.7}`, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        break;
      case '03':
      case '3':
        svg.appendChild(rc.path(`M${size * 0.2} ${size * 0.25} Q${size * 0.5} ${size * 0.15} ${size * 0.8} ${size * 0.3} Q${size * 0.5} ${size * 0.5} ${size * 0.8} ${size * 0.7} Q${size * 0.5} ${size * 0.85} ${size * 0.2} ${size * 0.75}`, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing,
          fill: 'none'
        }));
        break;
      case '04':
      case '4':
        svg.appendChild(rc.line(size * 0.2, size * 0.2, size * 0.2, size * 0.5, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size * 0.2, size * 0.5, size * 0.7, size * 0.5, {
          stroke: color,
          strokeWidth,
          roughness,
          bowing
        }));
        svg.appendChild(rc.line(size * 0.7, size * 0.2, size * 0.7, size * 0.8, {
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
      style={{ overflow: 'visible' }}
    />
  );
}

// Hero Section Component
function InvestmentAdvisoryHeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-br from-background via-sky-50 to-sky-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Professional Investment Management
                <span className="text-sky-600"> That Outperforms</span>
              </h1>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="trending-up" size={20} color="#0ea5e9" className="text-sky-600" />
                <p className="text-black font-semibold text-lg">Average 12.3% annual returns over 10 years</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                Stop leaving money on the table with DIY investing. Our professional investment advisory services have consistently outperformed market indices while managing risk.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-sky-600 hover:bg-sky-700" onClick={() => navigate('/contact')}>
                Get Your Free Portfolio Review
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' })}>
                See Our Track Record
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <HandDrawnIcon type="pie-chart" size={32} className="text-sky-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Expert Allocation</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="shield" size={32} className="text-sky-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Risk Managed</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="trending-up" size={32} className="text-sky-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Consistent Growth</p>
              </div>
            </div>
          </div>

          <div className="relative lg:order-2 order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={heroImage}
                alt="Couple reviewing investment portfolio performance"
                className="w-full h-full object-cover"
                fallbackSrc="/api/placeholder/600/400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            

          </div>
        </div>
      </div>
    </section>
  );
}

// Performance Track Record Section
function PerformanceTrackRecordSection() {
  const performanceData = [
    { period: "1 Year", our: "14.2%", ftse: "6.8%", difference: "+7.4%" },
    { period: "3 Years", our: "11.8%", ftse: "4.2%", difference: "+7.6%" },
    { period: "5 Years", our: "13.1%", ftse: "5.9%", difference: "+7.2%" },
    { period: "10 Years", our: "12.3%", ftse: "7.1%", difference: "+5.2%" }
  ];

  return (
    <section id="performance" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Track Record Speaks for Itself</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consistent outperformance across all timeframes with professional risk management
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Performance Comparison (Annualised Returns)</CardTitle>
              <CardDescription>
                Our managed portfolios vs. FTSE All-Share Index
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((data, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center p-4 bg-sky-50 rounded-lg">
                    <div className="font-semibold">{data.period}</div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Our Portfolio</p>
                      <p className="text-lg font-bold text-sky-600">{data.our}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">FTSE All-Share</p>
                      <p className="text-lg font-bold">{data.ftse}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Outperformance</p>
                      <p className="text-lg font-bold text-green-600">{data.difference}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Important:</strong> Past performance is not indicative of future results. 
                  Capital at risk. Performance figures are net of fees.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Investment Philosophy Section
function InvestmentPhilosophySection() {
  const philosophyPoints = [
    {
      icon: "target",
      title: "Goals-Based Investing",
      description: "Every investment decision is aligned with your specific financial goals and timeline, ensuring your portfolio works towards your objectives.",
      color: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      icon: "shield",
      title: "Risk-Adjusted Returns",
      description: "We focus on maximizing returns while managing downside risk, using diversification and asset allocation to protect your wealth.",
      color: "#059669",
      pastelColor: "#86efac"
    },
    {
      icon: "trending-up",
      title: "Active Management",
      description: "Our investment committee continuously monitors markets and makes tactical adjustments to capture opportunities and avoid pitfalls.",
      color: "#dc2626",
      pastelColor: "#fca5a5"
    },
    {
      icon: "globe",
      title: "Global Diversification",
      description: "Access to worldwide investment opportunities across asset classes, sectors, and geographies to reduce concentration risk.",
      color: "#7c3aed",
      pastelColor: "#c4b5fd"
    },
    {
      icon: "clock",
      title: "Long-Term Focus",
      description: "We invest with a long-term perspective, avoiding short-term noise and focusing on sustainable wealth creation.",
      color: "#d97706",
      pastelColor: "#fcd34d"
    },
    {
      icon: "pound-sterling",
      title: "Tax Efficiency",
      description: "Utilizing ISAs, SIPPs, and other tax-efficient wrappers to maximize your after-tax returns and minimize unnecessary tax drag.",
      color: "#e11d48",
      pastelColor: "#fda4af"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-sky-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Investment Philosophy</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Time-tested principles that have guided our investment approach for over a decade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophyPoints.map((point, index) => (
            <Card key={index} className="group hover:shadow-lg hover:shadow-sky-100 transition-all duration-300 border-border/50 hover:border-sky-200">
              <CardHeader className="space-y-4 pb-2">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <RoughCircleBackground color={point.pastelColor} size={60} />
                  <div className="relative z-10">
                    <HandDrawnIcon 
                      type={point.icon as any} 
                      size={32} 
                      color={point.color}
                      className="group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">{point.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-base leading-relaxed">
                  {point.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Portfolio Strategies Section
function PortfolioStrategiesSection() {
  const strategies = [
    {
      name: "Conservative Growth",
      riskLevel: "Low-Medium",
      expectedReturn: "6-8% p.a.",
      allocation: "30% Equity, 60% Bonds, 10% Alternatives",
      description: "Ideal for investors seeking steady growth with capital preservation"
    },
    {
      name: "Balanced Growth",
      riskLevel: "Medium",
      expectedReturn: "8-10% p.a.",
      allocation: "60% Equity, 30% Bonds, 10% Alternatives",
      description: "Balanced approach for long-term growth with moderate risk tolerance"
    },
    {
      name: "Growth Focused",
      riskLevel: "Medium-High",
      expectedReturn: "10-12% p.a.",
      allocation: "80% Equity, 10% Bonds, 10% Alternatives",
      description: "For investors with higher risk tolerance seeking strong growth"
    },
    {
      name: "Aggressive Growth",
      riskLevel: "High",
      expectedReturn: "12-15% p.a.",
      allocation: "90% Equity, 5% Bonds, 5% Alternatives",
      description: "Maximum growth potential for investors comfortable with volatility"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Portfolio Strategies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the strategy that aligns with your risk tolerance and return objectives
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((strategy, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{strategy.name}</CardTitle>
                  <span className="text-sm bg-sky-100 text-sky-600 px-3 py-1 rounded-full">
                    {strategy.riskLevel} Risk
                  </span>
                </div>
                <CardDescription>{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expected Return</span>
                  <span className="font-semibold text-sky-600">{strategy.expectedReturn}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Asset Allocation</p>
                  <p className="text-sm">{strategy.allocation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Expected returns are indicative and not guaranteed. Capital at risk.
          </p>
          <Button 
            size="lg" 
            className="bg-sky-600 hover:bg-sky-700"
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Find Your Ideal Strategy
          </Button>
        </div>
      </div>
    </section>
  );
}

// Investment Process Section
function InvestmentProcessSection() {
  const stepColors = [
    {
      accent: "#0ea5e9",
      iconColor: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      accent: "#7c3aed",
      iconColor: "#7c3aed",
      pastelColor: "#c4b5fd"
    },
    {
      accent: "#dc2626",
      iconColor: "#dc2626",
      pastelColor: "#fca5a5"
    },
    {
      accent: "#059669",
      iconColor: "#059669",
      pastelColor: "#86efac"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Portfolio Analysis",
      description: "We review your current investments, assess performance, and identify opportunities for improvement and optimization.",
      timeline: "Week 1",
      outcomes: "• Current portfolio review • Performance analysis • Cost assessment • Risk evaluation",
      icon: "search" as const
    },
    {
      step: "02",
      title: "Strategy Selection",
      description: "Based on your goals, risk tolerance, and timeline, we recommend the most appropriate investment strategy and asset allocation.",
      timeline: "Week 2",
      outcomes: "• Risk profiling • Strategic asset allocation • Investment strategy • Platform selection",
      icon: "target" as const
    },
    {
      step: "03",
      title: "Portfolio Construction",
      description: "We build a diversified portfolio using institutional-grade funds and direct investments, optimized for tax efficiency.",
      timeline: "Week 3-4",
      outcomes: "• Fund selection • Tax wrapper optimization • Portfolio implementation • Cost minimization",
      icon: "pie-chart" as const
    },
    {
      step: "04",
      title: "Ongoing Management",
      description: "Regular portfolio reviews, rebalancing, and tactical adjustments ensure your investments stay on track to meet your goals.",
      timeline: "Ongoing",
      outcomes: "• Quarterly reviews • Rebalancing • Performance reporting • Strategy adjustments",
      icon: "trending-up" as const
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Investment Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A disciplined approach to building and managing your investment portfolio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const colors = stepColors[index % stepColors.length];
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardHeader className="text-center space-y-4 pb-2">
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
                    <div className="text-sm font-medium text-sky-600 mb-2">
                      {step.timeline}
                    </div>
                    <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <CardDescription className="text-center leading-relaxed text-sm">
                    {step.description}
                  </CardDescription>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-sky-600 mb-2">KEY OUTCOMES:</h4>
                    <div className="text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
                      {step.outcomes}
                    </div>
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

// FAQ Section
function InvestmentAdvisoryFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "We work with clients from £50,000 upwards. This allows us to build properly diversified portfolios and provide cost-effective management. For smaller amounts, we can recommend suitable low-cost index funds."
    },
    {
      question: "How are your fees structured?",
      answer: "Our management fee is transparent and typically ranges from 0.75% to 1.25% annually depending on portfolio size and complexity. This includes ongoing management, regular reviews, and all trading costs. No hidden fees or commissions."
    },
    {
      question: "How often do you review and rebalance portfolios?",
      answer: "We conduct formal portfolio reviews quarterly and rebalance as needed. However, we monitor markets daily and can make tactical adjustments more frequently if market conditions warrant it. Clients receive quarterly reports."
    },
    {
      question: "What investment platforms do you use?",
      answer: "We use institutional-grade platforms including Transact, Aegon, and AJ Bell. These provide access to a wide range of investments, competitive dealing costs, and comprehensive reporting functionality."
    },
    {
      question: "Can you manage my existing ISAs and pensions?",
      answer: "Yes, we can manage investments within ISAs, SIPPs, and workplace pensions. We'll help you maximize your annual allowances and ensure your investments are tax-efficiently structured."
    },
    {
      question: "Do you invest in individual stocks or funds?",
      answer: "We primarily use institutional-grade funds and ETFs for diversification and cost efficiency. For larger portfolios (£500k+), we may include some direct equity investments to provide additional customization and potential tax benefits."
    },
    {
      question: "How do you manage risk in volatile markets?",
      answer: "We use multiple risk management techniques including diversification across asset classes and geographies, position sizing, and tactical asset allocation adjustments. Our focus is on managing downside risk while capturing upside potential."
    },
    {
      question: "What makes your approach different from robo-advisors?",
      answer: "While robo-advisors use simple algorithms, we provide personalized advice, active management, and human expertise. We can adapt to changing market conditions, consider your full financial picture, and provide ongoing guidance and support."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Investment Advisory FAQ</h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our investment management services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-sky-200 transition-colors"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-sky-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <HandDrawnIcon
                    type={openIndex === index ? "chevron-up" : "chevron-down"}
                    size={20}
                    className="text-sky-600"
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function InvestmentAdvisoryFinalCTASection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="cta" className="py-20 bg-gradient-to-br from-sky-50 via-sky-100 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <HandDrawnIcon type="check-circle" size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-medium mb-4">Portfolio Review Scheduled!</h2>
            <p className="text-lg text-muted-foreground">
              We'll contact you within 1 business hour to discuss your investment goals and arrange your free portfolio review.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-sky-50 via-sky-100 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl lg:text-4xl font-medium">Get Your Free Portfolio Review</h2>
              <p className="text-lg text-muted-foreground">
                Discover how professional investment management can improve your returns
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="07XXX XXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assets">Current investable assets</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-100k">£50,000 - £100,000</SelectItem>
                    <SelectItem value="100-250k">£100,000 - £250,000</SelectItem>
                    <SelectItem value="250-500k">£250,000 - £500,000</SelectItem>
                    <SelectItem value="500k-1m">£500,000 - £1,000,000</SelectItem>
                    <SelectItem value="1m+">£1,000,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>What are your investment priorities? (Select all that apply)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="growth" />
                    <label htmlFor="growth" className="text-sm">Long-term growth</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="income" />
                    <label htmlFor="income" className="text-sm">Regular income</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="preservation" />
                    <label htmlFor="preservation" className="text-sm">Capital preservation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tax" />
                    <label htmlFor="tax" className="text-sm">Tax efficiency</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ethical" />
                    <label htmlFor="ethical" className="text-sm">Ethical investing</label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="consent" required />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I agree to be contacted about investment advisory services. We'll never share your information.
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-sky-600 hover:bg-sky-700">
                Get My Free Portfolio Review
                <span className="ml-2">→</span>
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Free consultation • No obligation • FCA regulated • Institutional-grade platform access
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InvestmentAdvisoryPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background" id="main-content">
      <InvestmentAdvisoryHeroSection />
      <PerformanceTrackRecordSection />
      <InvestmentPhilosophySection />
      <PortfolioStrategiesSection />
      <InvestmentProcessSection />
      <InvestmentAdvisoryFAQSection />
      <InvestmentAdvisoryFinalCTASection />
    </div>
  );
}