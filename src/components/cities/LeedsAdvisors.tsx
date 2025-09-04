import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function LeedsAdvisors() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Financial Advisors in Leeds - Netfin",
    "description": "Find vetted, qualified financial advisors and wealth managers in Leeds. Expert Yorkshire financial planning with regional expertise.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Leeds",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": "Leeds"
    }
  };

  const leedsInsights = [
    {
      title: "Yorkshire Business Expertise",
      description: "Leeds advisors understand the unique needs of Yorkshire businesses, from traditional industries to modern tech and financial services.",
      icon: "briefcase" as const
    },
    {
      title: "Northern Financial Center",
      description: "As the North's leading financial center, Leeds offers access to sophisticated advisory services with regional understanding and competitive pricing.",
      icon: "trending-up" as const
    },
    {
      title: "Property Market Knowledge", 
      description: "Deep expertise in Yorkshire property markets, commercial real estate, and the region's strong buy-to-let opportunities.",
      icon: "building" as const
    },
    {
      title: "Value-Focused Service",
      description: "Leeds advisors combine professional expertise with Yorkshire values - straightforward advice, competitive fees, and long-term relationships.",
      icon: "handshake" as const
    }
  ];

  const advisorTypes = [
    {
      type: "Yorkshire Wealth Managers",
      description: "Regional firms like Sandaire, Maitland offer comprehensive wealth management with strong understanding of Northern business culture.",
      minInvestment: "£200K+",
      fees: "0.75-1.4% annually",
      bestFor: "Regional wealth building"
    },
    {
      type: "Leeds Independent IFAs",
      description: "Local independent advisors providing personalized financial planning, with particular strength in business and property advice.",
      minInvestment: "£25K+",
      fees: "£170-£420/hour",
      bestFor: "Personal financial planning"
    },
    {
      type: "Commercial Property Specialists",
      description: "Experts in Leeds' thriving commercial property market, industrial investments, and development finance opportunities.",
      minInvestment: "£100K+",
      fees: "1-2.5% + performance",
      bestFor: "Property development"
    },
    {
      type: "Business Succession Advisors",
      description: "Specialists in family business transitions, management buyouts, and succession planning for Yorkshire's business families.",
      minInvestment: "Variable",
      fees: "Project-based £5K-£50K",
      bestFor: "Business transitions"
    }
  ];

  const faqs = [
    {
      question: "How do Leeds financial advisor fees compare?",
      answer: "Leeds financial advisors typically charge 0.75-1.4% annually for investment management, with hourly rates from £170-£420. This offers excellent value - typically 20-25% less than London while maintaining high professional standards."
    },
    {
      question: "What makes Leeds advisors different?",
      answer: "Leeds advisors combine professional expertise with Yorkshire business values - straight talking, competitive pricing, and long-term relationship focus. They have deep understanding of Northern business culture and property markets."
    },
    {
      question: "Do Leeds advisors work with smaller investments?",
      answer: "Yes, many Leeds IFAs work with portfolios from £25,000. The competitive local market means advisors are often more accessible than those in expensive metropolitan areas, with flexible fee structures."
    },
    {
      question: "Are Leeds advisors experienced with business clients?",
      answer: "Absolutely. Leeds has a strong business advisory culture, with many advisors specializing in succession planning, business protection, and commercial property. They understand the needs of Yorkshire business owners."
    },
    {
      question: "Should I choose a Leeds advisor for property investment?",
      answer: "Leeds advisors have excellent knowledge of Yorkshire property markets, regeneration areas, and commercial opportunities. They understand local market dynamics and development potential better than national advisors."
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
              Trusted 
              <span className="text-primary"> Financial Advisors</span> in Leeds
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with experienced financial advisors in Yorkshire's business capital. Benefit from regional expertise, competitive fees, and straightforward Yorkshire values.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                <span>FCA Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#10b981" />
                <span>Yorkshire Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="users" size={20} color="#10b981" />
                <span>35+ Leeds Advisors</span>
              </div>
            </div>
            <Button size="lg" className="group">
              Find Leeds Advisors Now
              <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">The Leeds Financial Advantage</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Leeds combines Northern business heritage with modern financial expertise, offering exceptional value and regional understanding.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leedsInsights.map((insight, index) => (
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
              <h2 className="text-3xl font-semibold">Leeds Financial Advisory Services</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From wealth management to business succession, Leeds offers comprehensive financial expertise at competitive rates.
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
              <h2 className="text-3xl font-semibold">Leeds Financial Advisor FAQs</h2>
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
            <h2 className="text-3xl font-semibold">Find Your Perfect Leeds Financial Advisor</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with trusted Leeds financial advisors who combine Yorkshire values with professional expertise and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Match Me With Leeds Advisors
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg">
                Browse All Leeds Options
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}