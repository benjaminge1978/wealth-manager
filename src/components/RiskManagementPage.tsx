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
import heroImage from "../assets/wealth-management-happy-family.jpg";
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
function RiskManagementHeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-br from-background via-emerald-50 to-emerald-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Protect What Matters Most
                <span className="text-emerald-600"> Before It's Too Late</span>
              </h1>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#059669" className="text-emerald-600" />
                <p className="text-black font-semibold text-lg">£500M+ in protection coverage arranged</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                Life doesn't always go to plan. Our comprehensive risk management solutions ensure your family, income, and assets are protected against life's uncertainties.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('/contact')}>
                Get Your Free Protection Review
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                Calculate Your Coverage Gap
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <HandDrawnIcon type="shield" size={32} className="text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Full Protection</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="heart" size={32} className="text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Family Security</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="check-circle" size={32} className="text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Peace of Mind</p>
              </div>
            </div>
          </div>

          <div className="relative lg:order-2 order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={heroImage}
                alt="Protected family enjoying life"
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

// Risk Assessment Calculator Section
function RiskAssessmentCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [dependents, setDependents] = useState('');
  const [existingCover, setExistingCover] = useState('');
  const [calculated, setCalculated] = useState(false);
  const [coverageGap, setCoverageGap] = useState(0);

  const calculateGap = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const deps = parseInt(dependents) || 0;
    const existing = parseFloat(existingCover) || 0;
    
    // Simple calculation: 10x annual income + 5x annual expenses for each dependent
    const recommended = (income * 12 * 10) + (expenses * 12 * 5 * deps);
    const gap = Math.max(0, recommended - existing);
    
    setCoverageGap(gap);
    setCalculated(true);
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Calculate Your Protection Gap</h2>
            <p className="text-lg text-muted-foreground">
              Find out if you have enough coverage to protect your loved ones
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Protection Assessment</CardTitle>
              <CardDescription>
                Answer a few questions to see if you're adequately protected
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!calculated ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="income">Monthly Income (£)</Label>
                      <Input
                        id="income"
                        type="number"
                        placeholder="5000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expenses">Monthly Expenses (£)</Label>
                      <Input
                        id="expenses"
                        type="number"
                        placeholder="3000"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dependents">Number of Dependents</Label>
                      <Input
                        id="dependents"
                        type="number"
                        placeholder="2"
                        value={dependents}
                        onChange={(e) => setDependents(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="existing">Existing Coverage (£)</Label>
                      <Input
                        id="existing"
                        type="number"
                        placeholder="100000"
                        value={existingCover}
                        onChange={(e) => setExistingCover(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={calculateGap} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Calculate My Protection Gap
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center p-8 bg-emerald-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Your Protection Gap</p>
                    <p className="text-4xl font-bold text-emerald-600 mb-4">
                      £{coverageGap.toLocaleString()}
                    </p>
                    {coverageGap > 0 ? (
                      <p className="text-muted-foreground">
                        You may be underinsured by £{coverageGap.toLocaleString()}. 
                        Let's discuss how to close this gap.
                      </p>
                    ) : (
                      <p className="text-muted-foreground">
                        Great! You appear to have adequate coverage. Let's review to make sure it's the right type.
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => setCalculated(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Recalculate
                    </Button>
                    <Button 
                      onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      Get Professional Review
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Coverage Types Section
function CoverageTypesSection() {
  const coverageTypes = [
    {
      icon: "heart",
      title: "Life Insurance",
      description: "Provide financial security for your loved ones with term life or whole life insurance tailored to your family's needs.",
      color: "#e11d48",
      pastelColor: "#fda4af"
    },
    {
      icon: "shield",
      title: "Income Protection",
      description: "Replace up to 70% of your income if illness or injury prevents you from working, maintaining your lifestyle.",
      color: "#059669",
      pastelColor: "#86efac"
    },
    {
      icon: "alert-circle",
      title: "Critical Illness Cover",
      description: "Receive a tax-free lump sum if diagnosed with a specified critical illness, helping cover treatment and living costs.",
      color: "#dc2626",
      pastelColor: "#fca5a5"
    },
    {
      icon: "home",
      title: "Family Protection Trusts",
      description: "Ensure your life insurance pays out quickly to the right people while potentially saving inheritance tax.",
      color: "#7c3aed",
      pastelColor: "#c4b5fd"
    },
    {
      icon: "briefcase",
      title: "Business Protection",
      description: "Key person insurance, shareholder protection, and business loan cover to protect your company's future.",
      color: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      icon: "umbrella",
      title: "Estate Protection",
      description: "Protect your estate from inheritance tax and ensure your wealth transfers efficiently to the next generation.",
      color: "#d97706",
      pastelColor: "#fcd34d"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Comprehensive Protection Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We arrange protection from the UK's leading insurers, ensuring you get the right coverage at competitive rates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverageTypes.map((coverage, index) => (
            <Card key={index} className="group hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300 border-border/50 hover:border-emerald-200">
              <CardHeader className="space-y-4 pb-2">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <RoughCircleBackground color={coverage.pastelColor} size={60} />
                  <div className="relative z-10">
                    <HandDrawnIcon 
                      type={coverage.icon as any} 
                      size={32} 
                      color={coverage.color}
                      className="group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">{coverage.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-base leading-relaxed">
                  {coverage.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-emerald-100 rounded-2xl p-8 text-center">
          <p className="text-lg font-medium mb-2">We work with 30+ leading UK insurers</p>
          <p className="text-muted-foreground">
            Including Aviva, Legal & General, Vitality, Royal London, and more
          </p>
        </div>
      </div>
    </section>
  );
}

// Process Section
function RiskManagementProcessSection() {
  const stepColors = [
    {
      accent: "#059669",
      iconColor: "#059669",
      pastelColor: "#86efac"
    },
    {
      accent: "#0ea5e9",
      iconColor: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      accent: "#dc2626",
      iconColor: "#dc2626",
      pastelColor: "#fca5a5"
    },
    {
      accent: "#7c3aed",
      iconColor: "#7c3aed",
      pastelColor: "#c4b5fd"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Risk Assessment",
      description: "We analyze your personal and financial situation to identify potential risks and vulnerabilities that need protection.",
      timeline: "Week 1",
      outcomes: "• Personal risk analysis • Financial vulnerability assessment • Protection gap identification • Family circumstances review",
      icon: "search" as const
    },
    {
      step: "02",
      title: "Coverage Analysis",
      description: "Review your existing policies to identify gaps and overlaps, ensuring you're not over or under-insured.",
      timeline: "Week 2",
      outcomes: "• Policy review • Gap analysis • Cost comparison • Overlap identification",
      icon: "file-text" as const
    },
    {
      step: "03",
      title: "Market Comparison",
      description: "Compare quotes from 30+ leading insurers to find the best coverage at the most competitive rates.",
      timeline: "Week 3",
      outcomes: "• Multi-insurer quotes • Best value options • Terms comparison • Application preparation",
      icon: "trending-up" as const
    },
    {
      step: "04",
      title: "Implementation & Claims Support",
      description: "We handle all paperwork and provide ongoing support, including assistance with any future claims.",
      timeline: "Week 4+",
      outcomes: "• Policy setup • Ongoing review • Claims assistance • Annual health checks",
      icon: "shield" as const
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Protection Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A thorough approach to ensure you have the right protection at the right price
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
                    <div className="text-sm font-medium text-emerald-600 mb-2">
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
                    <h4 className="text-xs font-semibold text-emerald-600 mb-2">KEY OUTCOMES:</h4>
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
function RiskManagementFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much life insurance do I need?",
      answer: "A general rule is 10 times your annual income, plus any outstanding debts. However, the right amount depends on your specific circumstances, including dependents, lifestyle, debts, and future financial goals. We'll help calculate your exact needs."
    },
    {
      question: "What's the difference between life insurance and income protection?",
      answer: "Life insurance pays out a lump sum to your beneficiaries if you die. Income protection replaces a portion of your income if you can't work due to illness or injury. Most people need both types of coverage."
    },
    {
      question: "Can I get coverage with pre-existing medical conditions?",
      answer: "Yes, in many cases. While pre-existing conditions may affect premiums or require special underwriting, we work with specialist insurers who can often provide coverage. We'll find the best options for your situation."
    },
    {
      question: "How much does protection insurance cost?",
      answer: "Costs vary based on age, health, coverage amount, and type of protection. Life insurance for a healthy 35-year-old might cost £20-50 per month for £500,000 of coverage. We'll get quotes from multiple insurers to find the best value."
    },
    {
      question: "What is critical illness cover?",
      answer: "Critical illness cover pays out a tax-free lump sum if you're diagnosed with one of the specified serious illnesses listed in your policy, such as cancer, heart attack, or stroke. This can help cover treatment costs or lifestyle adjustments."
    },
    {
      question: "Should I get protection through my employer or independently?",
      answer: "While employer coverage is valuable, it's usually not enough and ends when you leave the job. Independent coverage ensures continuous protection regardless of employment changes. We typically recommend a combination of both."
    },
    {
      question: "How quickly can coverage be put in place?",
      answer: "Simple life insurance can often be arranged within 24-48 hours. More complex coverage or cases requiring medical underwriting may take 2-4 weeks. We'll expedite the process as much as possible."
    },
    {
      question: "What happens to my premiums over time?",
      answer: "This depends on the type of policy. Level term insurance maintains the same premium throughout. Reviewable premiums may change. Index-linked policies increase with inflation. We'll explain all options and help you choose what's best."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Common Protection Questions</h2>
            <p className="text-lg text-muted-foreground">
              Get answers to frequently asked questions about risk management and protection
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-emerald-200 transition-colors"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-emerald-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <HandDrawnIcon
                    type={openIndex === index ? "chevron-up" : "chevron-down"}
                    size={20}
                    className="text-emerald-600"
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
function RiskManagementFinalCTASection() {
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
      <section id="cta" className="py-20 bg-gradient-to-br from-emerald-50 via-emerald-100 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <HandDrawnIcon type="check-circle" size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-medium mb-4">Protection Review Requested!</h2>
            <p className="text-lg text-muted-foreground">
              We'll contact you within 1 business hour to schedule your free protection review and help secure your family's future.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-emerald-50 via-emerald-100 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
                <HandDrawnIcon type="alert-circle" size={20} />
                <span className="font-medium">Don't wait until it's too late</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-medium">Get Your Free Protection Review Today</h2>
              <p className="text-lg text-muted-foreground">
                Discover gaps in your coverage and get expert recommendations - completely free
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
                <Label>What type of protection are you interested in? (Select all that apply)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="life" />
                    <label htmlFor="life" className="text-sm">Life insurance</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="income" />
                    <label htmlFor="income" className="text-sm">Income protection</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="critical" />
                    <label htmlFor="critical" className="text-sm">Critical illness cover</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="business" />
                    <label htmlFor="business" className="text-sm">Business protection</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="review" />
                    <label htmlFor="review" className="text-sm">Review existing policies</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dependents">Do you have dependents?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No dependents</SelectItem>
                    <SelectItem value="1">1 dependent</SelectItem>
                    <SelectItem value="2">2 dependents</SelectItem>
                    <SelectItem value="3">3 dependents</SelectItem>
                    <SelectItem value="4+">4+ dependents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="consent" required />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I agree to be contacted about protection services. We'll never share your information.
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Get My Free Protection Review
                <span className="ml-2">→</span>
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                No obligation • FCA regulated • Access to 30+ insurers • Claims support included
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RiskManagementPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background" id="main-content">
      <RiskManagementHeroSection />
      <RiskAssessmentCalculator />
      <CoverageTypesSection />
      <RiskManagementProcessSection />
      <RiskManagementFAQSection />
      <RiskManagementFinalCTASection />
    </div>
  );
}