import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function ManchesterAdvisors() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Schema markup for Manchester financial advisors page
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Financial Advisors in Manchester - Netfin",
    "description": "Find vetted, qualified financial advisors and wealth managers in Manchester. Compare fees, credentials, and local expertise.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Manchester",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": "Manchester"
    }
  };

  const manchesterInsights = [
    {
      title: "Northern Powerhouse Hub",
      description: "Manchester's growing financial sector offers competitive advisory services with strong local market knowledge and emerging business expertise.",
      icon: "trending-up" as const
    },
    {
      title: "Cost-Effective Excellence",
      description: "Manchester advisors typically charge 10-15% less than London while maintaining high professional standards and comprehensive service offerings.",
      icon: "calculator" as const
    },
    {
      title: "Business & Property Focus", 
      description: "Strong expertise in commercial property investment, business succession planning, and supporting the region's entrepreneurial community.",
      icon: "building" as const
    },
    {
      title: "Personal Service Approach",
      description: "Manchester advisors are known for building long-term client relationships with more personal attention than larger metropolitan practices.",
      icon: "users" as const
    }
  ];

  const advisorTypes = [
    {
      type: "Regional Wealth Managers",
      description: "Established firms like Fairstone, Foster Denovo offer comprehensive wealth management with strong regional presence.",
      minInvestment: "£100K+",
      fees: "0.65-1.25% annually",
      bestFor: "Growing wealth individuals"
    },
    {
      type: "Independent Financial Advisors",
      description: "Local IFAs providing personalized financial planning, pension advice, and investment guidance with competitive fees.",
      minInvestment: "£25K+",
      fees: "£150-£400/hour",
      bestFor: "Comprehensive planning"
    },
    {
      type: "Specialist Property Advisors",
      description: "Advisors focusing on Manchester's strong property market, buy-to-let strategies, and commercial property investment.",
      minInvestment: "£50K+",
      fees: "1-2% + performance",
      bestFor: "Property investors"
    },
    {
      type: "Business & Corporate Advisors",
      description: "Specialists in business protection, key person insurance, and corporate pension schemes for Manchester's business community.",
      minInvestment: "Variable",
      fees: "Commission/fee basis",
      bestFor: "Business owners"
    }
  ];

  const faqs = [
    {
      question: "How much do financial advisors charge in Manchester?",
      answer: "Manchester financial advisors typically charge 0.65% to 1.25% annually for investment management, with hourly rates from £150-£400. This is generally 10-15% less than London advisors while maintaining comparable service quality."
    },
    {
      question: "What makes Manchester advisors different from London?",
      answer: "Manchester advisors often provide more personal service with lower fees. They have strong expertise in regional property markets, business succession planning, and understand the local economic landscape better than national firms."
    },
    {
      question: "Do Manchester advisors work with smaller portfolios?",
      answer: "Yes, many Manchester IFAs work with portfolios from £25,000 upwards. Regional wealth managers typically start at £100,000, which is lower than London equivalents. Some advisors work on hourly basis regardless of assets."
    },
    {
      question: "Are Manchester financial advisors properly regulated?",
      answer: "All legitimate financial advisors in Manchester must be registered with the Financial Conduct Authority (FCA). They're subject to the same regulatory standards as London advisors, with Professional Indemnity Insurance requirements."
    },
    {
      question: "Should I choose a Manchester advisor over a London-based one?",
      answer: "Manchester advisors often provide better value and more personal attention. Choose Manchester if you prefer local relationships, regional property focus, or want competitive fees. Consider London for ultra-sophisticated international strategies."
    }
  ];

  return (
    <div className="min-h-screen bg-background" id="main-content">
      {/* Schema Markup */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
              Top Rated 
              <span className="text-primary"> Financial Advisors</span> in Manchester
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover qualified financial advisors and wealth managers in Manchester. Benefit from competitive fees, personal service, and deep local market knowledge.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                <span>FCA Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#10b981" />
                <span>Fully Vetted</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="users" size={20} color="#10b981" />
                <span>50+ Local Advisors</span>
              </div>
            </div>
            <Button size="lg" className="group">
              Find Manchester Advisors Now
              <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Manchester Insights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Why Choose a Manchester Financial Advisor?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Manchester's thriving financial sector offers exceptional value and expertise for personal and business wealth management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {manchesterInsights.map((insight, index) => (
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

      {/* Advisor Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Types of Financial Advisors in Manchester</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From independent financial advisors to specialist wealth managers, Manchester offers diverse financial expertise at competitive rates.
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Manchester Financial Advisor FAQs</h2>
              <p className="text-lg text-muted-foreground">
                Answers to common questions about financial advisors in Manchester
              </p>
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
                        className="transition-transform duration-200"
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

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-semibold">Find Your Perfect Manchester Financial Advisor</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with vetted Manchester financial advisors who understand your local needs and offer competitive, transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Match Me With Manchester Advisors
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg">
                Browse All Manchester Advisors
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HandDrawnIcon type="clock" size={20} color="#10b981" />
              <p className="text-sm text-muted-foreground">Free matching service • No obligation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}