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
    const roughness = 0.3;
    const bowing = 0.2;

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
          `M ${size * 0.2} ${size * 0.3} Q ${size * 0.5} ${size * 0.15} ${size * 0.8} ${size * 0.3} Q ${size * 0.8} ${size * 0.5} ${size * 0.2} ${size * 0.85} L ${size * 0.8} ${size * 0.85}`,
          { stroke: color, strokeWidth, roughness, bowing, fill: 'none' }
        ));
        break;

      case '03':
      case '3':
        svg.appendChild(rc.path(
          `M ${size * 0.2} ${size * 0.2} Q ${size * 0.5} ${size * 0.15} ${size * 0.8} ${size * 0.3} Q ${size * 0.7} ${size * 0.5} ${size * 0.5} ${size * 0.5} Q ${size * 0.7} ${size * 0.5} ${size * 0.8} ${size * 0.7} Q ${size * 0.5} ${size * 0.85} ${size * 0.2} ${size * 0.8}`,
          { stroke: color, strokeWidth, roughness, bowing, fill: 'none' }
        ));
        break;

      case '04':
      case '4':
        svg.appendChild(rc.line(size * 0.15, size * 0.7, size * 0.65, size * 0.7, {
          stroke: color, strokeWidth, roughness, bowing
        }));
        svg.appendChild(rc.line(size * 0.65, size * 0.15, size * 0.65, size * 0.85, {
          stroke: color, strokeWidth: strokeWidth * 1.5, roughness, bowing
        }));
        svg.appendChild(rc.line(size * 0.15, size * 0.15, size * 0.65, size * 0.7, {
          stroke: color, strokeWidth, roughness, bowing
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

// Hero Section Component
function FinancialPlanningHeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-br from-background via-violet-50 to-violet-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Transform Your Dreams Into 
                <span className="text-violet-600"> Achievable Financial Milestones</span>
              </h1>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#7c3aed" className="text-violet-600" />
                <p className="text-black font-semibold text-lg">Helped 2,000+ families achieve financial clarity</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                Stop living paycheck to paycheck. Our goals-based financial planning creates a clear roadmap to achieve your short and long-term objectives, from emergency funds to early retirement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-violet-600 hover:bg-violet-700" onClick={() => navigate('/contact')}>
                Get Your Free Financial Roadmap
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
                See Our Planning Process
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <HandDrawnIcon type="target" size={32} className="text-violet-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Clear Goals</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="trending-up" size={32} className="text-violet-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Proven Results</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="file-text" size={32} className="text-violet-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Tailored Plans</p>
              </div>
            </div>
          </div>

          <div className="relative lg:order-2 order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={heroImage}
                alt="Happy couple reviewing their financial plan"
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

// Benefits Section
function FinancialPlanningBenefitsSection() {
  const benefits = [
    {
      icon: "target",
      title: "Clear Financial Roadmap",
      description: "Get a personalised plan that maps out exactly how to achieve your financial goals, with specific milestones and timelines.",
      color: "#7c3aed",
      pastelColor: "#c4b5fd"
    },
    {
      icon: "shield",
      title: "Emergency Fund Building",
      description: "Establish a solid financial foundation with a properly sized emergency fund to protect against life's uncertainties.",
      color: "#059669",
      pastelColor: "#86efac"
    },
    {
      icon: "trending-down",
      title: "Debt Elimination Strategy",
      description: "Create an efficient plan to eliminate debt faster while maintaining your quality of life and building wealth simultaneously.",
      color: "#dc2626",
      pastelColor: "#fca5a5"
    },
    {
      icon: "pie-chart",
      title: "Investment Timeline",
      description: "Know exactly when and how to invest, with strategies aligned to your risk tolerance and time horizons.",
      color: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      icon: "clock",
      title: "Retirement Planning",
      description: "Calculate exactly how much you need to retire comfortably and create a realistic path to achieve it.",
      color: "#e11d48",
      pastelColor: "#fda4af"
    },
    {
      icon: "home",
      title: "Legacy Planning",
      description: "Ensure your wealth transfers efficiently to the next generation with proper estate planning strategies.",
      color: "#d97706",
      pastelColor: "#fcd34d"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-violet-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Financial Planning That Delivers Results</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive financial planning service addresses every aspect of your financial life, creating a cohesive strategy for wealth building and protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-lg hover:shadow-violet-100 transition-all duration-300 border-border/50 hover:border-violet-200">
              <CardHeader className="space-y-4 pb-2">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <RoughCircleBackground color={benefit.pastelColor} size={60} />
                  <div className="relative z-10">
                    <HandDrawnIcon 
                      type={benefit.icon as any} 
                      size={32} 
                      color={benefit.color}
                      className="group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-base leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function FinancialPlanningProcessSection() {
  const stepColors = [
    {
      accent: "#7c3aed",
      iconColor: "#7c3aed", 
      pastelColor: "#c4b5fd"
    },
    {
      accent: "#0ea5e9",
      iconColor: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      accent: "#d97706",
      iconColor: "#d97706",
      pastelColor: "#fcd34d"
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
      title: "Discovery & Assessment",
      description: "We begin with a comprehensive review of your current financial situation, understanding your income, expenses, assets, and liabilities.",
      timeline: "Week 1",
      outcomes: "• Complete financial audit • Goal identification • Risk assessment • Current strategy review",
      icon: "search" as const
    },
    {
      step: "02",
      title: "Goal Prioritization",
      description: "Together, we identify and prioritize your financial goals, from immediate needs to long-term dreams, creating a clear hierarchy of objectives.",
      timeline: "Week 2",
      outcomes: "• Clear goal hierarchy • Timeline mapping • Resource allocation • Success metrics",
      icon: "target" as const
    },
    {
      step: "03",
      title: "Strategy Development",
      description: "Our experts craft a personalised financial plan with specific strategies for budgeting, saving, investing, and risk management.",
      timeline: "Week 3-4",
      outcomes: "• Custom financial plan • Investment strategy • Tax optimization • Risk management",
      icon: "file-text" as const
    },
    {
      step: "04",
      title: "Implementation & Monitoring",
      description: "We help you implement your plan and provide ongoing monitoring, making adjustments as your life and goals evolve.",
      timeline: "Ongoing",
      outcomes: "• Plan implementation • Regular reviews • Strategy adjustments • Goal tracking",
      icon: "trending-up" as const
    }
  ];

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-background to-violet-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Our Planning Process</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our proven 4-step financial planning process ensures nothing is overlooked and your plan is truly comprehensive.
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
                    <div className="text-sm font-medium text-primary mb-2">
                      {step.timeline}
                    </div>
                    <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
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
      </div>
    </section>
  );
}

// Knowledge Section
function FinancialPlanningKnowledgeSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-violet-50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Why Financial Planning Matters</h2>
            <p className="text-lg text-muted-foreground">
              Understanding the impact of professional financial planning on your future
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Without Financial Planning</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="x" size={20} className="text-red-500 mt-1" />
                  <span className="text-muted-foreground">Living paycheck to paycheck with no clear path forward</span>
                </li>
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="x" size={20} className="text-red-500 mt-1" />
                  <span className="text-muted-foreground">Unclear retirement timeline and insufficient savings</span>
                </li>
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="x" size={20} className="text-red-500 mt-1" />
                  <span className="text-muted-foreground">Paying more taxes than necessary</span>
                </li>
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="x" size={20} className="text-red-500 mt-1" />
                  <span className="text-muted-foreground">No protection against financial emergencies</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">With Professional Planning</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="check" size={20} className="text-green-500 mt-1" />
                  <span className="text-muted-foreground">Clear financial roadmap with achievable milestones</span>
                </li>
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="check" size={20} className="text-green-500 mt-1" />
                  <span className="text-muted-foreground">Confidence in your retirement timeline and lifestyle</span>
                </li>
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="check" size={20} className="text-green-500 mt-1" />
                  <span className="text-muted-foreground">Tax-optimized strategies saving thousands annually</span>
                </li>
                <li className="flex items-start gap-3">
                  <HandDrawnIcon type="check" size={20} className="text-green-500 mt-1" />
                  <span className="text-muted-foreground">Protected family and assets with proper planning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-violet-100 rounded-2xl p-8 text-center">
            <p className="text-lg font-medium mb-2">Did you know?</p>
            <p className="text-2xl font-bold text-violet-600 mb-4">
              People with written financial plans accumulate 2.5x more wealth
            </p>
            <p className="text-muted-foreground">
              Source: The Value of Financial Planning Study, Financial Planning Standards Council
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FinancialPlanningFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is financial planning?",
      answer: "Financial planning is a comprehensive process that helps you make informed decisions about your money to achieve your life goals. It involves analyzing your current financial situation, identifying your objectives, and creating strategies for budgeting, saving, investing, and managing risk."
    },
    {
      question: "How much does financial planning cost?",
      answer: "Our initial consultation is completely free. After that, we offer both fee-based and percentage-based options depending on your needs. Most clients find that the tax savings and investment improvements more than cover our fees within the first year."
    },
    {
      question: "How long does the planning process take?",
      answer: "The initial financial plan typically takes 2-4 weeks to complete after our discovery meeting. This includes data gathering, analysis, and strategy development. Implementation timelines vary based on the complexity of your situation."
    },
    {
      question: "Do I need a minimum amount of assets?",
      answer: "No, we work with clients at all stages of their financial journey. Whether you're just starting out or have accumulated significant wealth, we have planning solutions tailored to your situation."
    },
    {
      question: "How often should I review my financial plan?",
      answer: "We recommend reviewing your plan at least annually, or whenever you experience a major life change such as marriage, birth of a child, job change, or inheritance. Regular reviews ensure your plan stays aligned with your evolving goals."
    },
    {
      question: "What's included in a financial plan?",
      answer: "A comprehensive financial plan includes cash flow analysis, goal setting, investment strategy, tax planning, risk management, retirement planning, and estate planning considerations. We tailor each plan to address your specific needs and objectives."
    },
    {
      question: "Can you help with debt management?",
      answer: "Absolutely. Debt management is a crucial component of financial planning. We'll analyze your current debts and create an efficient repayment strategy that balances debt elimination with wealth building."
    },
    {
      question: "How is financial planning different from investment advice?",
      answer: "Investment advice focuses specifically on portfolio management and asset allocation. Financial planning is much broader, encompassing all aspects of your financial life including budgeting, insurance, taxes, and estate planning, with investments being just one component."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about our financial planning services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-violet-200 transition-colors"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-violet-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <HandDrawnIcon
                    type={openIndex === index ? "chevron-up" : "chevron-down"}
                    size={20}
                    className="text-violet-600"
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
function FinancialPlanningFinalCTASection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    // In real implementation, would send to backend
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-violet-50 via-violet-100 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <HandDrawnIcon type="check-circle" size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-medium mb-4">Thank You!</h2>
            <p className="text-lg text-muted-foreground">
              We've received your request and will contact you within 1 business hour to schedule your free financial planning consultation.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 via-violet-100 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl lg:text-4xl font-medium">Start Your Financial Planning Journey Today</h2>
              <p className="text-lg text-muted-foreground">
                Take the first step towards financial freedom with a free, no-obligation consultation
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
                <Label>What are your primary financial goals? (Select all that apply)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="retirement" />
                    <label htmlFor="retirement" className="text-sm">Planning for retirement</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="savings" />
                    <label htmlFor="savings" className="text-sm">Building emergency savings</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="debt" />
                    <label htmlFor="debt" className="text-sm">Eliminating debt</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="investment" />
                    <label htmlFor="investment" className="text-sm">Growing investments</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="property" />
                    <label htmlFor="property" className="text-sm">Buying property</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assets">Current investable assets</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50k">£0 - £50,000</SelectItem>
                    <SelectItem value="50-250k">£50,000 - £250,000</SelectItem>
                    <SelectItem value="250-500k">£250,000 - £500,000</SelectItem>
                    <SelectItem value="500k-1m">£500,000 - £1,000,000</SelectItem>
                    <SelectItem value="1m+">£1,000,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="consent" required />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I agree to be contacted about financial planning services. We'll never share your information with third parties.
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-violet-600 hover:bg-violet-700">
                Get Your Free Financial Assessment
                <span className="ml-2">→</span>
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                We'll call within 1 business hour • Free consultation • No obligation • FCA regulated
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinancialPlanningPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background" id="main-content">
      <FinancialPlanningHeroSection />
      <FinancialPlanningBenefitsSection />
      <FinancialPlanningProcessSection />
      <FinancialPlanningKnowledgeSection />
      <FinancialPlanningFAQSection />
      <FinancialPlanningFinalCTASection />
    </div>
  );
}