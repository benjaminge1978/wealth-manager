import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function FeeOnlyVsCommissionGuide() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Schema markup for comparison guide
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Fee-Only vs Commission Financial Advisors: Complete 2025 Analysis",
    "description": "Comprehensive comparison of fee-only and commission-based financial advisors, including costs, conflicts of interest, and which type is best for different situations.",
    "author": {
      "@type": "Organization",
      "name": "Netfin"
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the difference between fee-only and commission financial advisors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fee-only advisors are compensated directly by clients through fees and receive no commissions from product sales. Commission-based advisors earn money by selling financial products and may receive commissions from insurance companies, fund managers, or other providers."
        }
      },
      {
        "@type": "Question",
        "name": "Are fee-only financial advisors better?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fee-only advisors generally have fewer conflicts of interest since they don't benefit financially from recommending specific products. However, the best advisor depends on your specific needs, complexity of situation, and budget for advice."
        }
      },
      {
        "@type": "Question",
        "name": "How much do fee-only financial advisors cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fee-only advisors typically charge 0.5% to 1.5% of assets under management annually, or £200-£600 per hour for project-based work. Some charge flat fees of £2,000-£10,000 for comprehensive financial plans."
        }
      }
    ]
  };

  const comparisonTable = {
    feeOnly: {
      name: "Fee-Only Advisors",
      icon: "check-circle" as const,
      color: "#10b981",
      compensation: "Direct client fees only",
      conflicts: "Minimal conflicts of interest",
      transparency: "Complete fee transparency",
      fiduciary: "Always act as fiduciary",
      cost: "0.5-1.5% AUM or £200-600/hour",
      bestFor: "Complex planning, high net worth",
      pros: [
        "No product sales conflicts",
        "Objective advice focused on client needs",
        "Transparent fee structure",
        "Fiduciary standard always applies",
        "Access to full range of investments"
      ],
      cons: [
        "Higher upfront costs",
        "May not offer insurance products",
        "Limited accessibility for smaller portfolios",
        "No ongoing product support"
      ]
    },
    commission: {
      name: "Commission-Based Advisors",
      icon: "credit-card" as const,
      color: "#f59e0b",
      compensation: "Product commissions + some fees",
      conflicts: "Potential conflicts from product sales",
      transparency: "Commission disclosure required",
      fiduciary: "Suitability standard (lower than fiduciary)",
      cost: "\"Free\" advice, costs built into products",
      bestFor: "Basic planning, insurance needs",
      pros: [
        "No upfront advice fees",
        "Access to insurance and annuity products",
        "Ongoing product service and support",
        "More accessible for smaller investors"
      ],
      cons: [
        "Potential conflicts of interest",
        "May recommend higher-cost products",
        "Less comprehensive planning focus",
        "Hidden costs in product fees"
      ]
    }
  };

  const faqs = [
    {
      question: "What's the difference between fee-only and commission financial advisors?",
      answer: "Fee-only advisors are compensated directly by clients through fees and receive no commissions from product sales. Commission-based advisors earn money by selling financial products and may receive commissions from insurance companies, fund managers, or other providers. This creates different incentive structures and potential conflicts of interest."
    },
    {
      question: "Are fee-only financial advisors better?",
      answer: "Fee-only advisors generally have fewer conflicts of interest since they don't benefit financially from recommending specific products. However, the 'best' advisor depends on your specific needs, complexity of situation, and budget for advice. Commission-based advisors may be more suitable for basic insurance needs or smaller portfolios."
    },
    {
      question: "How much do fee-only financial advisors cost?",
      answer: "Fee-only advisors typically charge 0.5% to 1.5% of assets under management annually, or £200-£600 per hour for project-based work. Some charge flat fees of £2,000-£10,000 for comprehensive financial plans. While more expensive upfront, the absence of hidden product costs often makes them cost-effective long-term."
    },
    {
      question: "Do commission-based advisors really offer 'free' advice?",
      answer: "No - commission-based advice isn't truly free. The costs are embedded in the financial products they sell through higher annual fees, surrender charges, or commissions. These costs can exceed fee-only advisor charges over time, especially for long-term investments."
    },
    {
      question: "Which type should I choose for retirement planning?",
      answer: "For comprehensive retirement planning, fee-only advisors often provide more objective analysis since they're not incentivized to sell specific annuities or pension products. However, commission-based advisors may be suitable if you need specific insurance products or have simpler planning needs."
    },
    {
      question: "Can commission-based advisors act as fiduciaries?",
      answer: "Some commission-based advisors can act as fiduciaries when providing investment advice, but they typically operate under the lower 'suitability' standard when selling products. Fee-only advisors are held to the fiduciary standard for all advice, requiring them to act in your best interest always."
    }
  ];

  return (
    <div className="min-h-screen bg-background" id="main-content">
      {/* Schema Markup */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
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
              Fee-Only vs Commission
              <span className="text-primary"> Financial Advisors</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete 2025 analysis comparing fee-only and commission-based financial advisors. Understand the costs, conflicts, and which type is best for your situation.
            </p>
            <div className="flex items-center justify-center gap-2">
              <HandDrawnIcon type="check-circle" size={20} color="#3b82f6" />
              <p className="text-lg font-medium">Updated January 2025 • Comprehensive Analysis • Unbiased Comparison</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-semibold mb-6 text-center">Quick Answer: Which Should You Choose?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-700">Choose Fee-Only If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>You have £100K+ to invest</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>You want comprehensive financial planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>You prefer transparent, predictable costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>You want advice free from sales conflicts</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-700">Choose Commission If:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="credit-card" size={16} color="#f59e0b" className="mt-0.5 flex-shrink-0" />
                      <span>You primarily need insurance products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="credit-card" size={16} color="#f59e0b" className="mt-0.5 flex-shrink-0" />
                      <span>You have a smaller portfolio (under £50K)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="credit-card" size={16} color="#f59e0b" className="mt-0.5 flex-shrink-0" />
                      <span>You want ongoing product support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="credit-card" size={16} color="#f59e0b" className="mt-0.5 flex-shrink-0" />
                      <span>You prefer no upfront advice fees</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Detailed Side-by-Side Comparison</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compare all aspects of fee-only vs commission-based financial advisors to make an informed decision.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Fee-Only Column */}
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
                    <HandDrawnIcon type={comparisonTable.feeOnly.icon} size={32} color={comparisonTable.feeOnly.color} />
                  </div>
                  <CardTitle className="text-2xl text-green-800">{comparisonTable.feeOnly.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">How They're Paid</h4>
                      <p className="text-sm">{comparisonTable.feeOnly.compensation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Conflicts of Interest</h4>
                      <p className="text-sm">{comparisonTable.feeOnly.conflicts}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Typical Costs</h4>
                      <p className="text-sm">{comparisonTable.feeOnly.cost}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Best For</h4>
                      <p className="text-sm">{comparisonTable.feeOnly.bestFor}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Advantages</h4>
                    <ul className="space-y-2">
                      {comparisonTable.feeOnly.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Disadvantages</h4>
                    <ul className="space-y-2">
                      {comparisonTable.feeOnly.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <HandDrawnIcon type="x-circle" size={16} color="#ef4444" className="mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Commission Column */}
              <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mx-auto mb-4">
                    <HandDrawnIcon type={comparisonTable.commission.icon} size={32} color={comparisonTable.commission.color} />
                  </div>
                  <CardTitle className="text-2xl text-orange-800">{comparisonTable.commission.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">How They're Paid</h4>
                      <p className="text-sm">{comparisonTable.commission.compensation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">Conflicts of Interest</h4>
                      <p className="text-sm">{comparisonTable.commission.conflicts}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">Typical Costs</h4>
                      <p className="text-sm">{comparisonTable.commission.cost}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">Best For</h4>
                      <p className="text-sm">{comparisonTable.commission.bestFor}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-800 mb-3">Advantages</h4>
                    <ul className="space-y-2">
                      {comparisonTable.commission.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-800 mb-3">Disadvantages</h4>
                    <ul className="space-y-2">
                      {comparisonTable.commission.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <HandDrawnIcon type="x-circle" size={16} color="#ef4444" className="mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about fee-only vs commission-based financial advisors
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Ready to Find the Right Advisor for You?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you're looking for fee-only or commission-based advisors, we'll match you with pre-vetted professionals who meet your specific needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button size="lg" className="group">
                  Find Fee-Only Advisors
                  <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Button>
                <Button variant="outline" size="lg">
                  Browse All Advisor Types
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <HandDrawnIcon type="clock" size={20} color="#10b981" />
                <p className="text-sm text-muted-foreground">Free matching service • No obligation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}