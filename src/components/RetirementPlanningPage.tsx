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
import heroImage from "../assets/retirement-planning-netfin.webp";
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
function RetirementPlanningHeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-br from-background via-rose-50 to-rose-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Retire on Your Terms,
                <span className="text-rose-600"> Not Theirs</span>
              </h1>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="clock" size={20} color="#e11d48" className="text-rose-600" />
                <p className="text-black font-semibold text-lg">Most clients retire 5-10 years early</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                Stop worrying about running out of money in retirement. Our comprehensive retirement planning ensures you maintain your desired lifestyle throughout your golden years.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-rose-600 hover:bg-rose-700" onClick={() => navigate('/contact')}>
                Get Your Free Retirement Analysis
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                Calculate Your Retirement Needs
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <HandDrawnIcon type="home" size={32} className="text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Dream Lifestyle</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="shield" size={32} className="text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Income Security</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="heart" size={32} className="text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Family Legacy</p>
              </div>
            </div>
          </div>

          <div className="relative lg:order-2 order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={heroImage}
                alt="Happy retired couple enjoying their golden years"
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

// Retirement Calculator Section
function RetirementCalculatorSection() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentPension, setCurrentPension] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [desiredIncome, setDesiredIncome] = useState('');
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState({
    projectedFund: 0,
    annualIncome: 0,
    shortfall: 0,
    additionalRequired: 0
  });

  const calculateRetirement = () => {
    const currentAgeNum = parseInt(currentAge) || 0;
    const retirementAgeNum = parseInt(retirementAge) || 65;
    const yearsToRetirement = Math.max(0, retirementAgeNum - currentAgeNum);
    const currentPensionNum = parseFloat(currentPension) || 0;
    const monthlyContributionNum = parseFloat(monthlyContribution) || 0;
    const desiredIncomeNum = parseFloat(desiredIncome) || 0;
    
    // Simple calculation with 5% annual growth
    const monthsToRetirement = yearsToRetirement * 12;
    const futureValueCurrent = currentPensionNum * Math.pow(1.05, yearsToRetirement);
    const futureValueContributions = monthlyContributionNum * 12 * yearsToRetirement * 1.5; // Simplified growth
    const totalFund = futureValueCurrent + futureValueContributions;
    
    // 4% withdrawal rule
    const projectedAnnualIncome = totalFund * 0.04;
    const shortfall = Math.max(0, desiredIncomeNum - projectedAnnualIncome);
    const additionalFundNeeded = shortfall / 0.04;
    const additionalMonthlyRequired = additionalFundNeeded / (12 * yearsToRetirement);
    
    setResults({
      projectedFund: totalFund,
      annualIncome: projectedAnnualIncome,
      shortfall: shortfall,
      additionalRequired: additionalMonthlyRequired
    });
    setCalculated(true);
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Retirement Calculator</h2>
            <p className="text-lg text-muted-foreground">
              Calculate if you're on track for your ideal retirement lifestyle
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Retirement Planning Calculator</CardTitle>
              <CardDescription>
                Enter your details to see if you're saving enough for retirement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!calculated ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentAge">Current Age</Label>
                      <Input
                        id="currentAge"
                        type="number"
                        placeholder="35"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retirementAge">Target Retirement Age</Label>
                      <Input
                        id="retirementAge"
                        type="number"
                        placeholder="60"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentPension">Current Pension Value (£)</Label>
                      <Input
                        id="currentPension"
                        type="number"
                        placeholder="50000"
                        value={currentPension}
                        onChange={(e) => setCurrentPension(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution">Monthly Contributions (£)</Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        placeholder="500"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desiredIncome">Desired Annual Retirement Income (£)</Label>
                    <Input
                      id="desiredIncome"
                      type="number"
                      placeholder="40000"
                      value={desiredIncome}
                      onChange={(e) => setDesiredIncome(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={calculateRetirement} 
                    className="w-full bg-rose-600 hover:bg-rose-700"
                    disabled={!currentAge || !retirementAge || !desiredIncome}
                  >
                    Calculate My Retirement Plan
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-rose-50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Projected Retirement Fund</p>
                      <p className="text-3xl font-bold text-rose-600 mb-2">
                        £{Math.round(results.projectedFund).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-6 bg-rose-50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Projected Annual Income</p>
                      <p className="text-3xl font-bold text-rose-600 mb-2">
                        £{Math.round(results.annualIncome).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {results.shortfall > 0 ? (
                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="text-center mb-4">
                        <p className="text-lg font-semibold text-yellow-800 mb-2">
                          You have a shortfall of £{Math.round(results.shortfall).toLocaleString()} per year
                        </p>
                        <p className="text-yellow-700">
                          You need to save an additional £{Math.round(results.additionalRequired).toLocaleString()} per month
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                      <p className="text-lg font-semibold text-green-800">
                        Congratulations! You're on track for your retirement goals
                      </p>
                    </div>
                  )}
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-center text-muted-foreground">
                      This is a simplified calculation. For a comprehensive retirement analysis, 
                      speak to one of our qualified advisers.
                    </p>
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
                      className="flex-1 bg-rose-600 hover:bg-rose-700"
                    >
                      Get Professional Analysis
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

// Retirement Solutions Section
function RetirementSolutionsSection() {
  const solutions = [
    {
      icon: "briefcase",
      title: "Pension Consolidation",
      description: "Bring together multiple pension pots to reduce fees, improve performance, and simplify management.",
      benefits: ["Lower fees", "Better performance", "Simplified management"],
      color: "#e11d48",
      pastelColor: "#fda4af"
    },
    {
      icon: "pie-chart",
      title: "SIPP Management",
      description: "Self-Invested Personal Pensions providing greater investment choice and control over your retirement savings.",
      benefits: ["Investment flexibility", "Tax relief", "Inheritance planning"],
      color: "#7c3aed",
      pastelColor: "#c4b5fd"
    },
    {
      icon: "trending-down",
      title: "Drawdown Planning",
      description: "Flexible income withdrawal strategies that maximize your pension fund while providing sustainable income.",
      benefits: ["Flexible income", "Tax efficiency", "Fund preservation"],
      color: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      icon: "calculator",
      title: "Tax Planning",
      description: "Optimize your retirement income to minimize tax liability and maximize your after-tax lifestyle.",
      benefits: ["Tax efficiency", "Higher net income", "Strategic timing"],
      color: "#059669",
      pastelColor: "#86efac"
    },
    {
      icon: "home",
      title: "Estate Planning",
      description: "Ensure your retirement savings transfer efficiently to your loved ones with proper estate planning.",
      benefits: ["IHT planning", "Family security", "Legacy protection"],
      color: "#d97706",
      pastelColor: "#fcd34d"
    },
    {
      icon: "heart",
      title: "Healthcare Planning",
      description: "Plan for potential healthcare costs in retirement including long-term care and medical expenses.",
      benefits: ["Healthcare security", "Family protection", "Peace of mind"],
      color: "#dc2626",
      pastelColor: "#fca5a5"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Comprehensive Retirement Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every aspect of your retirement covered with expert planning and ongoing support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <Card key={index} className="group hover:shadow-lg hover:shadow-rose-100 transition-all duration-300 border-border/50 hover:border-rose-200">
              <CardHeader className="space-y-4 pb-2">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <RoughCircleBackground color={solution.pastelColor} size={60} />
                  <div className="relative z-10">
                    <HandDrawnIcon 
                      type={solution.icon as any} 
                      size={32} 
                      color={solution.color}
                      className="group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                <CardDescription className="text-base leading-relaxed">
                  {solution.description}
                </CardDescription>
                <div>
                  <p className="text-sm font-medium mb-2">Key Benefits:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <HandDrawnIcon type="check" size={16} className="text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Retirement Income Options Section
function RetirementIncomeOptionsSection() {
  const options = [
    {
      title: "Annuities",
      description: "Guaranteed income for life",
      pros: ["Guaranteed income", "No investment risk", "Simple to understand"],
      cons: ["Lower returns", "No flexibility", "No inheritance"],
      suitableFor: "Those wanting certainty and guaranteed income"
    },
    {
      title: "Drawdown",
      description: "Flexible income from your pension pot",
      pros: ["Flexible income", "Investment growth potential", "Inheritance options"],
      cons: ["Investment risk", "Income not guaranteed", "Requires management"],
      suitableFor: "Those wanting flexibility and growth potential"
    },
    {
      title: "Hybrid Approach",
      description: "Combination of annuities and drawdown",
      pros: ["Balanced approach", "Some guaranteed income", "Some flexibility"],
      cons: ["More complex", "Higher fees", "Compromised benefits"],
      suitableFor: "Those wanting balance between security and flexibility"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Retirement Income Options</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding your options for turning your pension pot into retirement income
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                <div>
                  <p className="font-medium text-green-600 mb-2">Advantages:</p>
                  <ul className="text-sm space-y-1">
                    {option.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <HandDrawnIcon type="plus" size={16} className="text-green-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-600 mb-2">Disadvantages:</p>
                  <ul className="text-sm space-y-1">
                    {option.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <HandDrawnIcon type="minus" size={16} className="text-red-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="font-medium text-sm mb-1">Best for:</p>
                  <p className="text-sm text-muted-foreground">{option.suitableFor}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function RetirementPlanningFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When should I start planning for retirement?",
      answer: "The sooner the better. Starting in your 20s or 30s gives you the power of compound growth. However, it's never too late to start - even beginning retirement planning in your 50s can significantly improve your retirement prospects."
    },
    {
      question: "How much should I save for retirement?",
      answer: "A common rule is to save 10-15% of your income for retirement. However, the exact amount depends on when you start saving, when you want to retire, and your desired retirement lifestyle. We can help you calculate your specific needs."
    },
    {
      question: "What is the State Pension and how much will I get?",
      answer: "The full new State Pension is currently £203.85 per week (£10,600 per year). You need 35 qualifying years to get the full amount. You can check your State Pension forecast on the government website."
    },
    {
      question: "Should I consolidate my pensions?",
      answer: "Consolidating pensions can reduce fees, improve performance, and simplify management. However, you might lose valuable benefits. We'll analyze your pensions to determine if consolidation makes sense for your situation."
    },
    {
      question: "What's the difference between a SIPP and a workplace pension?",
      answer: "A SIPP offers more investment choice and control, while workplace pensions often have employer contributions but limited investment options. Many people benefit from having both."
    },
    {
      question: "When can I access my pension?",
      answer: "You can normally access your pension from age 55 (rising to 57 in 2028). You can take 25% as a tax-free lump sum. The remainder is subject to income tax when withdrawn."
    },
    {
      question: "What are the annual and lifetime pension allowances?",
      answer: "The annual allowance is £60,000 (2024/25) with a £10,000 minimum for high earners. The lifetime allowance has been abolished from April 2024, but there are still limits on the tax-free lump sum."
    },
    {
      question: "Should I take an annuity or drawdown?",
      answer: "This depends on your circumstances, risk tolerance, and income needs. Annuities provide guaranteed income, while drawdown offers flexibility and growth potential. Many people benefit from a combination approach."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-rose-50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Retirement Planning FAQ</h2>
            <p className="text-lg text-muted-foreground">
              Common questions about retirement planning and pension management
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-rose-200 transition-colors"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-rose-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <HandDrawnIcon
                    type={openIndex === index ? "chevron-up" : "chevron-down"}
                    size={20}
                    className="text-rose-600"
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
function RetirementPlanningFinalCTASection() {
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
      <section id="cta" className="py-20 bg-gradient-to-br from-rose-50 via-rose-100 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <HandDrawnIcon type="check-circle" size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-medium mb-4">Retirement Analysis Booked!</h2>
            <p className="text-lg text-muted-foreground">
              We'll contact you within 1 business hour to discuss your retirement goals and create your personalized retirement strategy.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-rose-50 via-rose-100 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl lg:text-4xl font-medium">Secure Your Dream Retirement Today</h2>
              <p className="text-lg text-muted-foreground">
                Don't leave your retirement to chance - get expert guidance and a personalized plan
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
                <Label htmlFor="age">Your current age</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20-30">20-30</SelectItem>
                    <SelectItem value="31-40">31-40</SelectItem>
                    <SelectItem value="41-50">41-50</SelectItem>
                    <SelectItem value="51-60">51-60</SelectItem>
                    <SelectItem value="61+">61+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Retirement planning priorities (Select all that apply)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="consolidation" />
                    <label htmlFor="consolidation" className="text-sm">Pension consolidation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sipp" />
                    <label htmlFor="sipp" className="text-sm">SIPP setup and management</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="drawdown" />
                    <label htmlFor="drawdown" className="text-sm">Drawdown planning</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tax" />
                    <label htmlFor="tax" className="text-sm">Tax planning</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="estate" />
                    <label htmlFor="estate" className="text-sm">Estate planning</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pension">Current pension value</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50k">£0 - £50,000</SelectItem>
                    <SelectItem value="50-100k">£50,000 - £100,000</SelectItem>
                    <SelectItem value="100-250k">£100,000 - £250,000</SelectItem>
                    <SelectItem value="250-500k">£250,000 - £500,000</SelectItem>
                    <SelectItem value="500k+">£500,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="consent" required />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I agree to be contacted about retirement planning services. We'll never share your information.
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-rose-600 hover:bg-rose-700">
                Get My Free Retirement Analysis
                <span className="ml-2">→</span>
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Free consultation • Pension transfer specialists • FCA regulated • No obligation
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RetirementPlanningPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background" id="main-content">
      <RetirementPlanningHeroSection />
      <RetirementCalculatorSection />
      <RetirementSolutionsSection />
      <RetirementIncomeOptionsSection />
      <RetirementPlanningFAQSection />
      <RetirementPlanningFinalCTASection />
    </div>
  );
}