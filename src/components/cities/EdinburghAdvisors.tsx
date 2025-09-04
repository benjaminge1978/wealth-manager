import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function EdinburghAdvisors() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Schema markup for Edinburgh financial advisors page
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Financial Advisors in Edinburgh - Netfin",
    "description": "Find vetted, qualified financial advisors and wealth managers in Edinburgh. Expert Scottish financial planning with international perspective.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Edinburgh",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": "Edinburgh"
    }
  };

  const edinburghInsights = [
    {
      title: "Scottish Financial Heritage",
      description: "Edinburgh's centuries-old financial heritage provides access to some of the UK's most experienced and established wealth management firms.",
      icon: "award" as const
    },
    {
      title: "International Investment Expertise",
      description: "Strong Scottish fund management industry offers sophisticated international investment strategies and alternative asset access.",
      icon: "globe" as const
    },
    {
      title: "Tax Efficiency Focus", 
      description: "Edinburgh advisors excel at Scottish tax planning, including LBTT optimization, Scottish Income Tax considerations, and cross-border strategies.",
      icon: "calculator" as const
    },
    {
      title: "Institutional Quality Service",
      description: "Access to institutional-grade investment research and strategies typically reserved for much larger portfolios.",
      icon: "trending-up" as const
    }
  ];

  const advisorTypes = [
    {
      type: "Scottish Fund Managers",
      description: "Baillie Gifford, Aberdeen Standard Investments offer world-class investment management with direct advisor access.",
      minInvestment: "£250K+",
      fees: "0.75-1.35% annually",
      bestFor: "Growth-focused investors"
    },
    {
      type: "Private Client Advisors",
      description: "Established firms like Adam & Company, Rathbone Investment Management provide comprehensive wealth planning.",
      minInvestment: "£500K+",
      fees: "0.85-1.5% + planning fees",
      bestFor: "High-net-worth families"
    },
    {
      type: "Independent Scottish IFAs",
      description: "Local independent advisors with deep understanding of Scottish regulations, property markets, and tax considerations.",
      minInvestment: "£50K+",
      fees: "£200-£500/hour",
      bestFor: "Local expertise needs"
    },
    {
      type: "Pension Specialists",
      description: "Experts in Scottish public sector pensions, SIPP management, and pension transfer advice for expat professionals.",
      minInvestment: "Variable",
      fees: "1-3% of pension value",
      bestFor: "Pension optimization"
    }
  ];

  const faqs = [
    {
      question: "How do Scottish financial advisors differ from English ones?",
      answer: "Scottish advisors have specialized knowledge of Scottish Income Tax rates, Land and Buildings Transaction Tax (LBTT), and Scottish legal frameworks. They also understand unique Scottish financial products and property markets."
    },
    {
      question: "What are typical fees for Edinburgh financial advisors?",
      answer: "Edinburgh advisors typically charge 0.75%-1.5% annually for investment management, with hourly rates from £200-£500. Private client services at prestigious firms may charge higher fees but offer institutional-quality expertise."
    },
    {
      question: "Do Edinburgh advisors work with smaller portfolios?",
      answer: "Yes, many independent Scottish advisors work with portfolios from £50,000. Some of the larger Edinburgh firms have higher minimums (£250K-£500K), but offer access to institutional investment strategies."
    },
    {
      question: "Are Edinburgh advisors experienced with international clients?",
      answer: "Absolutely. Edinburgh's financial sector has strong international connections. Many advisors regularly work with expats, international property investors, and clients with cross-border tax considerations."
    },
    {
      question: "What makes Edinburgh's fund management industry special?",
      answer: "Edinburgh hosts some of the world's most respected fund managers like Baillie Gifford and Aberdeen. This provides local access to institutional-quality research and investment strategies not available in many other UK cities."
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
              Premier 
              <span className="text-primary"> Financial Advisors</span> in Edinburgh
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access world-class financial expertise in Scotland's capital. Connect with advisors who combine centuries of Scottish financial heritage with modern investment strategies.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                <span>FCA Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#10b981" />
                <span>Scottish Tax Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="users" size={20} color="#10b981" />
                <span>40+ Edinburgh Advisors</span>
              </div>
            </div>
            <Button size="lg" className="group">
              Find Edinburgh Advisors Now
              <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Edinburgh Insights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">The Edinburgh Advantage</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Edinburgh's unique position as both a historic financial center and modern fund management hub offers unparalleled expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {edinburghInsights.map((insight, index) => (
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
              <h2 className="text-3xl font-semibold">Edinburgh Financial Advisor Types</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From world-renowned fund managers to specialist Scottish tax advisors, Edinburgh offers exceptional financial expertise.
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
              <h2 className="text-3xl font-semibold">Edinburgh Financial Advisor FAQs</h2>
              <p className="text-lg text-muted-foreground">
                Your questions about finding financial advisors in Edinburgh answered
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
            <h2 className="text-3xl font-semibold">Connect with Edinburgh's Finest Financial Advisors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access world-class Scottish financial expertise. Find advisors who understand both local regulations and international opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Match Me With Edinburgh Advisors
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg">
                Explore All Edinburgh Options
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HandDrawnIcon type="clock" size={20} color="#10b981" />
              <p className="text-sm text-muted-foreground">Complimentary matching • Scottish tax expertise</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}