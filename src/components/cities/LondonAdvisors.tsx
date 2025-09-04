import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function LondonAdvisors() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Schema markup for London financial advisors page
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Financial Advisors in London - Netfin",
    "description": "Find vetted, qualified financial advisors and wealth managers in London. Compare fees, credentials, and specializations.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": "London"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "51.5074",
        "longitude": "-0.1278"
      },
      "geoRadius": "50000"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much do financial advisors charge in London?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "London financial advisors typically charge 0.75% to 1.5% annually for assets under management. Hourly rates range from £200-£600. Initial consultation fees vary from £200-£500, though many offer free initial meetings."
        }
      },
      {
        "@type": "Question", 
        "name": "What qualifications should London financial advisors have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Look for advisors registered with the Financial Conduct Authority (FCA). Key credentials include Certified Financial Planner (CFP), Chartered Financial Analyst (CFA), or Chartered Financial Planner. They should also have Professional Indemnity Insurance."
        }
      },
      {
        "@type": "Question",
        "name": "Are there minimum investment requirements for London wealth managers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most London wealth managers require £250,000-£500,000 minimum investments. However, financial advisors often work with smaller portfolios from £50,000. Some fee-only planners work on hourly basis regardless of assets."
        }
      }
    ]
  };

  const londonInsights = [
    {
      title: "London's Financial District Advantage",
      description: "Access to world-class financial professionals in the City and Canary Wharf, with expertise in international markets and complex wealth structures.",
      icon: "building" as const
    },
    {
      title: "High-Net-Worth Specialists",
      description: "London hosts numerous wealth managers specializing in ultra-high-net-worth individuals, offering sophisticated investment strategies and tax planning.",
      icon: "trending-up" as const
    },
    {
      title: "International Expertise", 
      description: "Many London advisors have experience with expat clients, international tax planning, and cross-border investment strategies.",
      icon: "globe" as const
    },
    {
      title: "Regulatory Excellence",
      description: "Strict FCA oversight ensures high professional standards, with comprehensive client protections and fiduciary responsibilities.",
      icon: "shield" as const
    }
  ];

  const advisorTypes = [
    {
      type: "Private Banks",
      description: "Coutts, JP Morgan Private Bank, UBS offer comprehensive wealth management for £1M+ portfolios. Premium service with relationship managers.",
      minInvestment: "£1M+",
      fees: "0.5-1.2% + banking fees",
      bestFor: "Ultra-high-net-worth families"
    },
    {
      type: "Independent Wealth Managers",
      description: "Boutique firms like Quilter, Brewin Dolphin provide personalized service with lower minimums than private banks.",
      minInvestment: "£250K+",
      fees: "0.75-1.5% annually",
      bestFor: "Affluent professionals"
    },
    {
      type: "Fee-Only Financial Planners",
      description: "Independent advisors charging hourly or project fees. No product commissions, purely advice-focused.",
      minInvestment: "Variable",
      fees: "£200-£600/hour",
      bestFor: "Specific planning needs"
    },
    {
      type: "Robo-Advisors with Human Support",
      description: "Nutmeg, Moneybox offer algorithm-based investing with London-based support teams for more complex queries.",
      minInvestment: "£500+",
      fees: "0.35-0.95% annually",
      bestFor: "Tech-savvy investors"
    }
  ];

  const faqs = [
    {
      question: "How much do financial advisors charge in London?",
      answer: "London financial advisors typically charge 0.75% to 1.5% annually for assets under management. Hourly rates range from £200-£600. Initial consultation fees vary from £200-£500, though many offer free initial meetings. Private banks may charge lower percentages but have higher minimums."
    },
    {
      question: "What qualifications should London financial advisors have?",
      answer: "Look for advisors registered with the Financial Conduct Authority (FCA). Key credentials include Certified Financial Planner (CFP), Chartered Financial Analyst (CFA), or Chartered Financial Planner. They should also have Professional Indemnity Insurance and be members of professional bodies like the Personal Finance Society."
    },
    {
      question: "Are there minimum investment requirements for London wealth managers?",
      answer: "Most London wealth managers require £250,000-£500,000 minimum investments. Private banks typically require £1M+. However, financial advisors often work with smaller portfolios from £50,000. Some fee-only planners work on hourly basis regardless of assets."
    },
    {
      question: "Should I choose a City-based or local London advisor?",
      answer: "City-based advisors often have more institutional investment experience and international expertise. Local advisors may offer more personal service and understand regional property markets better. Choose based on your specific needs and comfort level."
    },
    {
      question: "How do London advisor fees compare to other UK cities?",
      answer: "London advisors typically charge 10-20% more than regional advisors due to higher operating costs. However, they often provide access to more sophisticated investment strategies and have deeper capital markets expertise, which can justify higher fees for complex portfolios."
    }
  ];

  return (
    <div className="min-h-screen bg-background" id="main-content">
      {/* Schema Markup */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
              Find the Best 
              <span className="text-primary"> Financial Advisors</span> in London
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with vetted, qualified financial advisors and wealth managers in London. Compare credentials, fees, and specializations to find your perfect financial partner.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                <span>FCA Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#10b981" />
                <span>Fully Vetted</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="users" size={20} color="#10b981" />
                <span>100+ London Advisors</span>
              </div>
            </div>
            <Button size="lg" className="group">
              Find Your London Advisor Now
              <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* London Insights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Why Choose a London Financial Advisor?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                London's status as a global financial center provides unique advantages for wealth management and financial planning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {londonInsights.map((insight, index) => (
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
              <h2 className="text-3xl font-semibold">Types of Financial Advisors in London</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                London offers diverse financial advisory services, from private banks to independent planners. Find the right fit for your wealth level and needs.
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
              <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about finding financial advisors in London
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
            <h2 className="text-3xl font-semibold">Ready to Find Your London Financial Advisor?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with pre-vetted, qualified financial advisors in London. Compare credentials, fees, and specializations in minutes, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Match Me With London Advisors
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="lg">
                View All London Advisors
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <HandDrawnIcon type="clock" size={20} color="#10b981" />
              <p className="text-sm text-muted-foreground">Average match time: 3 minutes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}