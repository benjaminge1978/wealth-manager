import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function BirminghamAdvisors() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Financial Advisors in Birmingham - Netfin",
    "description": "Find vetted, qualified financial advisors and wealth managers in Birmingham. Expert Midlands financial planning with competitive rates.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Birmingham",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": "Birmingham"
    }
  };

  const birminghamInsights = [
    {
      title: "Midlands Business Hub",
      description: "Birmingham's central location and diverse economy provide advisors with extensive experience in manufacturing, services, and emerging tech sectors.",
      icon: "building" as const
    },
    {
      title: "Competitive Fee Structure",
      description: "Birmingham advisors offer excellent value with fees typically 15-20% below London rates while maintaining professional service standards.",
      icon: "calculator" as const
    },
    {
      title: "Manufacturing Wealth Expertise", 
      description: "Strong specialization in business succession planning, industrial property investment, and wealth strategies for manufacturing families.",
      icon: "briefcase" as const
    },
    {
      title: "Diverse Client Base",
      description: "Experience serving Birmingham's multicultural business community with culturally sensitive financial planning and international investment knowledge.",
      icon: "users" as const
    }
  ];

  const advisorTypes = [
    {
      type: "Midlands Wealth Managers",
      description: "Regional firms like St. James's Place, Smith & Williamson offer comprehensive wealth management with strong Midlands presence.",
      minInvestment: "£150K+",
      fees: "0.7-1.3% annually",
      bestFor: "Growing wealth families"
    },
    {
      type: "Business-Focused IFAs",
      description: "Independent advisors specializing in business protection, commercial property, and succession planning for Birmingham's business owners.",
      minInvestment: "£50K+",
      fees: "£180-£450/hour",
      bestFor: "Entrepreneurs"
    },
    {
      type: "Property Investment Specialists",
      description: "Experts in Midlands property markets, buy-to-let strategies, and commercial property investment across Birmingham's regeneration areas.",
      minInvestment: "£75K+",
      fees: "1.5-2.5% + performance",
      bestFor: "Property investors"
    },
    {
      type: "Pension & Retirement Advisors",
      description: "Specialists in workplace pensions, final salary transfers, and retirement planning for Birmingham's large employee base.",
      minInvestment: "Variable",
      fees: "1-2% of pension value",
      bestFor: "Retirement planning"
    }
  ];

  const faqs = [
    {
      question: "How much do Birmingham financial advisors charge?",
      answer: "Birmingham financial advisors typically charge 0.7-1.3% annually for investment management, with hourly consultation rates from £180-£450. This represents excellent value compared to London, often 15-20% lower for comparable services."
    },
    {
      question: "What expertise do Birmingham advisors offer?",
      answer: "Birmingham advisors excel in business succession planning, manufacturing wealth strategies, property investment, and pension planning. Many have experience with the city's diverse business sectors and multicultural community."
    },
    {
      question: "Do Birmingham advisors work with smaller portfolios?",
      answer: "Yes, many Birmingham IFAs work with portfolios from £50,000 upwards. The city's competitive market means advisors are often more flexible with minimum requirements than in more expensive locations."
    },
    {
      question: "Are Birmingham financial advisors properly qualified?",
      answer: "All legitimate Birmingham financial advisors must be FCA registered with appropriate qualifications. Many hold Chartered Financial Planner status or similar credentials, with mandatory Professional Indemnity Insurance."
    },
    {
      question: "Should I choose a Birmingham advisor for property investment?",
      answer: "Birmingham advisors often have exceptional knowledge of Midlands property markets, regeneration projects, and buy-to-let opportunities. They understand local market dynamics better than national advisors."
    }
  ];

  return (
    <div className="min-h-screen bg-background" id="main-content">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
              Leading 
              <span className="text-primary"> Financial Advisors</span> in Birmingham
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with experienced financial advisors in the Midlands. Benefit from competitive fees, business expertise, and deep knowledge of Birmingham's diverse economy.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                <span>FCA Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#10b981" />
                <span>Business Specialists</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="users" size={20} color="#10b981" />
                <span>45+ Birmingham Advisors</span>
              </div>
            </div>
            <Button size="lg" className="group">
              Find Birmingham Advisors Now
              <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Why Choose Birmingham Financial Advisors?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Birmingham's strategic location and business heritage provide unique advantages for wealth management and financial planning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {birminghamInsights.map((insight, index) => (
                <Card key={index} className="text-center border-border/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                      <HandDrawnIcon type={insight.icon} size={32} color="#3b82f6" />
                    </div>
                    <CardTitle className="text-xl">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {insight.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Birmingham Financial Advisor Options</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From business succession specialists to property investment experts, Birmingham offers comprehensive financial expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {advisorTypes.map((advisor, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <HandDrawnIcon type="briefcase" size={24} color="#3b82f6" />
                      {advisor.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {advisor.description}
                    </CardDescription>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Minimum</p>
                        <p className="font-semibold">{advisor.minInvestment}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Fees</p>
                        <p className="font-semibold text-sm">{advisor.fees}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Best For</p>
                        <p className="font-semibold text-sm">{advisor.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Birmingham Financial Advisor FAQs</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader 
                    className="cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  >
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{faq.question}</span>
                      <HandDrawnIcon 
                        type={faqOpen === index ? "minus" : "plus"} 
                        size={24} 
                        color="#3b82f6"
                      />
                    </CardTitle>
                  </CardHeader>
                  {faqOpen === index && (
                    <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-200">
                      <CardDescription className="text-base leading-relaxed">
                        {faq.answer}
                      </CardDescription>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-semibold">Connect with Birmingham's Best Financial Advisors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find experienced Birmingham financial advisors who understand your business needs and offer competitive, transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Match Me With Birmingham Advisors
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg">
                Browse Birmingham Options
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}