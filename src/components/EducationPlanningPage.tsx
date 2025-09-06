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
import heroImage from "../assets/education-finance-netfin.webp";
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
function EducationPlanningHeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-br from-background via-amber-50 to-amber-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Secure Your Children's 
                <span className="text-primary"> Educational Future</span>
              </h1>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="graduation-cap" size={20} color="#d97706" className="text-amber-600" />
                <p className="text-black font-semibold text-lg">Average UK private education: £300,000+ per child</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                Education costs are rising faster than inflation. Start planning now with our tax-efficient education savings strategies to give your children the best opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-amber-600 hover:bg-amber-700" onClick={() => navigate('/contact')}>
                Get Your Free Education Plan
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                Calculate Education Costs
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <HandDrawnIcon type="book" size={32} className="text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Best Schools</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="trending-up" size={32} className="text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Tax Efficient</p>
              </div>
              <div className="text-center">
                <HandDrawnIcon type="shield" size={32} className="text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Future Secured</p>
              </div>
            </div>
          </div>

          <div className="relative lg:order-2 order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={heroImage}
                alt="Family celebrating child's graduation"
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

// Education Cost Calculator Section
function EducationCostCalculator() {
  const [childAge, setChildAge] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [university, setUniversity] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);

  const calculateCosts = () => {
    const age = parseInt(childAge) || 0;
    const yearsToSchool = Math.max(0, 4 - age); // Assuming school starts at 4
    const yearsToUniversity = Math.max(0, 18 - age);
    
    let schoolCost = 0;
    if (schoolType === 'private') {
      const schoolYears = Math.max(0, 18 - Math.max(4, age));
      schoolCost = schoolYears * 15000; // £15k per year private school
    }
    
    const universityCost = university ? 50000 : 0; // £50k total for university
    const total = schoolCost + universityCost;
    const monthsToSave = Math.max(12, yearsToUniversity * 12);
    const monthly = total / monthsToSave;
    
    setTotalCost(total);
    setMonthlySavings(monthly);
    setCalculated(true);
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Education Cost Calculator</h2>
            <p className="text-lg text-muted-foreground">
              Estimate the total cost of your child's education and required monthly savings
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Calculate Your Education Costs</CardTitle>
              <CardDescription>
                Get a realistic estimate of education expenses and savings requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!calculated ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age">Child's Current Age</Label>
                      <Select onValueChange={setChildAge}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Newborn</SelectItem>
                          <SelectItem value="1">1 year</SelectItem>
                          <SelectItem value="2">2 years</SelectItem>
                          <SelectItem value="3">3 years</SelectItem>
                          <SelectItem value="4">4 years</SelectItem>
                          <SelectItem value="5">5 years</SelectItem>
                          <SelectItem value="6">6 years</SelectItem>
                          <SelectItem value="7">7 years</SelectItem>
                          <SelectItem value="8">8 years</SelectItem>
                          <SelectItem value="9">9 years</SelectItem>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="11">11 years</SelectItem>
                          <SelectItem value="12">12 years</SelectItem>
                          <SelectItem value="13">13 years</SelectItem>
                          <SelectItem value="14">14 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="16">16 years</SelectItem>
                          <SelectItem value="17">17 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school">School Type</Label>
                      <Select onValueChange={setSchoolType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select school type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="state">State school (free)</SelectItem>
                          <SelectItem value="private">Private school</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="university" 
                      checked={university}
                      onCheckedChange={(checked) => setUniversity(checked as boolean)}
                    />
                    <label htmlFor="university" className="text-sm">Include university costs</label>
                  </div>
                  <Button 
                    onClick={calculateCosts} 
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={!childAge || !schoolType}
                  >
                    Calculate Education Costs
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-amber-50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Estimated Total Cost</p>
                      <p className="text-3xl font-bold text-amber-600 mb-2">
                        £{totalCost.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {schoolType === 'private' ? 'Private school + ' : ''}
                        {university ? 'University included' : 'University not included'}
                      </p>
                    </div>
                    <div className="text-center p-6 bg-amber-50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Required Monthly Savings</p>
                      <p className="text-3xl font-bold text-amber-600 mb-2">
                        £{Math.round(monthlySavings).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Starting today with 5% annual growth
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-center text-muted-foreground">
                      These are estimates based on current costs. Actual costs may vary. 
                      We can help you create a tax-efficient savings strategy.
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
                      className="flex-1 bg-amber-600 hover:bg-amber-700"
                    >
                      Get Education Plan
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

// Savings Strategies Section
function EducationSavingsStrategiesSection() {
  const strategies = [
    {
      icon: "piggy-bank",
      title: "Junior ISAs",
      description: "Tax-free growth with annual allowance of £9,000. Funds belong to the child at 18, perfect for university costs.",
      benefits: ["Tax-free growth", "£9,000 annual allowance", "Access at 18"],
      color: "#d97706",
      pastelColor: "#fcd34d"
    },
    {
      icon: "shield",
      title: "Education Trusts",
      description: "Flexible trust arrangements that can pay for school fees directly, with potential inheritance tax benefits.",
      benefits: ["IHT planning", "Flexible access", "Professional management"],
      color: "#7c3aed",
      pastelColor: "#c4b5fd"
    },
    {
      icon: "trending-up",
      title: "Investment Plans",
      description: "Diversified investment portfolios designed for education funding with appropriate risk management.",
      benefits: ["Professional management", "Diversified portfolio", "Regular contributions"],
      color: "#0ea5e9",
      pastelColor: "#93c5fd"
    },
    {
      icon: "pound-sterling",
      title: "Savings Bonds",
      description: "Government and corporate bonds providing predictable returns for specific future education dates.",
      benefits: ["Predictable returns", "Capital protection", "Maturity matching"],
      color: "#059669",
      pastelColor: "#86efac"
    },
    {
      icon: "home",
      title: "Property Investment",
      description: "Buy-to-let property that can be sold or provide rental income to fund education expenses.",
      benefits: ["Potential capital growth", "Rental income", "Tangible asset"],
      color: "#dc2626",
      pastelColor: "#fca5a5"
    },
    {
      icon: "briefcase",
      title: "Business Investment",
      description: "Invest in children's future careers by funding business ventures or professional qualifications.",
      benefits: ["Career development", "Business ownership", "Long-term value"],
      color: "#e11d48",
      pastelColor: "#fda4af"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Education Savings Strategies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multiple tax-efficient approaches to build your children's education fund
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <Card key={index} className="group hover:shadow-lg hover:shadow-amber-100 transition-all duration-300 border-border/50 hover:border-amber-200">
              <CardHeader className="space-y-4 pb-2">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <RoughCircleBackground color={strategy.pastelColor} size={60} />
                  <div className="relative z-10">
                    <HandDrawnIcon 
                      type={strategy.icon as any} 
                      size={32} 
                      color={strategy.color}
                      className="group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">{strategy.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                <CardDescription className="text-base leading-relaxed">
                  {strategy.description}
                </CardDescription>
                <div>
                  <p className="text-sm font-medium mb-2">Key Benefits:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {strategy.benefits.map((benefit, i) => (
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

// Timeline Planner Section
function EducationTimelinePlannerSection() {
  const timelineStages = [
    {
      age: "0-4",
      stage: "Early Years",
      focus: "Start saving early for maximum compound growth",
      actions: ["Open Junior ISA", "Set up regular savings plan", "Consider education trust"]
    },
    {
      age: "5-10",
      stage: "Primary School",
      focus: "Build substantial education fund with consistent contributions",
      actions: ["Maximize annual ISA allowances", "Review investment performance", "Adjust contributions as income grows"]
    },
    {
      age: "11-15",
      stage: "Secondary School",
      focus: "Prepare for immediate education expenses while maintaining long-term growth",
      actions: ["Consider fee-paying schools", "Plan for university applications", "Review university funding options"]
    },
    {
      age: "16-18",
      stage: "Sixth Form",
      focus: "Finalize university funding and optimize tax position",
      actions: ["University application support", "Student loan vs. private funding analysis", "Final tax planning"]
    },
    {
      age: "18+",
      stage: "University",
      focus: "Efficient drawdown of education funds to minimize tax impact",
      actions: ["Coordinate funding sources", "Support living expenses", "Plan for post-graduation"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Education Planning Timeline</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A structured approach to education funding from birth to graduation
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {timelineStages.map((stage, index) => (
            <div key={index} className="flex gap-6 mb-12 last:mb-0">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 font-bold text-sm">{stage.age}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{stage.stage}</h3>
                <p className="text-muted-foreground mb-4">{stage.focus}</p>
                <div className="space-y-2">
                  <p className="font-medium text-sm">Key Actions:</p>
                  <ul className="space-y-1">
                    {stage.actions.map((action, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <HandDrawnIcon type="arrow-right" size={16} className="text-amber-600" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < timelineStages.length - 1 && (
                  <div className="w-0.5 h-12 bg-amber-200 ml-10 mt-6" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function EducationPlanningFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When should I start saving for my child's education?",
      answer: "The earlier you start, the better. Starting from birth gives you 18 years of compound growth. Even small amounts saved early can grow significantly. If you start later, you'll need to save more each month to reach the same target."
    },
    {
      question: "How much does private education cost in the UK?",
      answer: "Private school fees average £15,000-20,000 per year for day schools and £30,000-40,000 for boarding schools. University costs including accommodation can be £15,000-20,000 per year. Total private education can cost £300,000+ per child."
    },
    {
      question: "What are the tax benefits of Junior ISAs for education?",
      answer: "Junior ISAs offer tax-free growth with an annual allowance of £9,000. All investment growth is tax-free, and funds become available at 18. This can result in significant tax savings over the investment period."
    },
    {
      question: "Should I use my own ISA or open a Junior ISA?",
      answer: "Both have merits. Junior ISAs belong to the child and provide tax-free growth specifically for them. Your own ISA gives you more control but reduces your ISA allowance. We often recommend a combination approach."
    },
    {
      question: "What if my child doesn't go to university?",
      answer: "Education plans should be flexible. Funds can be used for other education expenses, apprenticeships, professional qualifications, or simply provide a financial head start in life. We design plans with flexibility in mind."
    },
    {
      question: "Can grandparents contribute to education planning?",
      answer: "Yes, grandparents can make significant contributions through gifts, Junior ISA funding, or setting up education trusts. This can also provide inheritance tax benefits while helping with education costs."
    },
    {
      question: "How do I choose between different saving options?",
      answer: "The choice depends on your circumstances, time horizon, risk tolerance, and tax position. We analyze all options and recommend the most suitable combination for your situation."
    },
    {
      question: "What happens to the money if my child gets a scholarship?",
      answer: "If education costs are reduced through scholarships, the funds can be redirected to other education expenses, living costs, or provide financial security for your child's future career or business ventures."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium">Education Planning Questions</h2>
            <p className="text-lg text-muted-foreground">
              Answers to common questions about funding your child's education
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-amber-200 transition-colors"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-amber-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <HandDrawnIcon
                    type={openIndex === index ? "chevron-up" : "chevron-down"}
                    size={20}
                    className="text-amber-600"
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
function EducationPlanningFinalCTASection() {
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
      <section id="cta" className="py-20 bg-gradient-to-br from-amber-50 via-amber-100 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <HandDrawnIcon type="check-circle" size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-medium mb-4">Education Plan Request Received!</h2>
            <p className="text-lg text-muted-foreground">
              We'll contact you within 1 business hour to discuss your child's education goals and create a personalized funding strategy.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-amber-50 via-amber-100 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl lg:text-4xl font-medium">Start Your Child's Education Plan Today</h2>
              <p className="text-lg text-muted-foreground">
                Give your children the educational opportunities they deserve with professional planning
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
                <Label>Number of children requiring education planning</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 child</SelectItem>
                    <SelectItem value="2">2 children</SelectItem>
                    <SelectItem value="3">3 children</SelectItem>
                    <SelectItem value="4+">4+ children</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Education preferences (Select all that apply)</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="private" />
                    <label htmlFor="private" className="text-sm">Private school education</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="university" />
                    <label htmlFor="university" className="text-sm">University funding</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="international" />
                    <label htmlFor="international" className="text-sm">International education</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="professional" />
                    <label htmlFor="professional" className="text-sm">Professional qualifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flexible" />
                    <label htmlFor="flexible" className="text-sm">Flexible education fund</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Monthly savings budget</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-200">£0 - £200</SelectItem>
                    <SelectItem value="200-500">£200 - £500</SelectItem>
                    <SelectItem value="500-1000">£500 - £1,000</SelectItem>
                    <SelectItem value="1000-2000">£1,000 - £2,000</SelectItem>
                    <SelectItem value="2000+">£2,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="consent" required />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                  I agree to be contacted about education planning services. We'll never share your information.
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full bg-amber-600 hover:bg-amber-700">
                Get My Free Education Plan
                <span className="ml-2">→</span>
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Free consultation • Tax-efficient strategies • Junior ISA specialists • No obligation
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EducationPlanningPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background" id="main-content">
      <EducationPlanningHeroSection />
      <EducationCostCalculator />
      <EducationSavingsStrategiesSection />
      <EducationTimelinePlannerSection />
      <EducationPlanningFAQSection />
      <EducationPlanningFinalCTASection />
    </div>
  );
}