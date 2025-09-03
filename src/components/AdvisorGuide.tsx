import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";

export function AdvisorGuide() {
  // Schema markup for the guide
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide: How to Choose a Financial Advisor in 2025",
    "description": "Comprehensive guide covering everything you need to know about selecting, vetting, and working with a financial advisor or wealth manager.",
    "author": {
      "@type": "Organization",
      "name": "WealthMaster"
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  const sections = [
    {
      title: "Understanding Different Types of Financial Advisors",
      icon: "users" as const,
      content: [
        {
          subtitle: "Fee-Only Financial Advisors",
          description: "Compensated directly by clients through fees, not commissions. They have no financial incentive to recommend specific products, making their advice more objective."
        },
        {
          subtitle: "Commission-Based Advisors",
          description: "Earn money by selling financial products. While they may offer valuable services, there's potential for conflicts of interest as they benefit from certain recommendations."
        },
        {
          subtitle: "Fee-Based Advisors",
          description: "Combination of fees and commissions. They charge management fees but may also receive commissions from product sales, creating mixed incentives."
        },
        {
          subtitle: "Wealth Managers vs Financial Advisors",
          description: "Wealth managers typically serve high-net-worth individuals (£250k+ assets) with comprehensive services including tax planning, estate planning, and alternative investments."
        }
      ]
    },
    {
      title: "Essential Credentials and Qualifications",
      icon: "award" as const,
      content: [
        {
          subtitle: "Certified Financial Planner (CFP)",
          description: "Gold standard certification requiring extensive education, experience, and ethics training. CFPs must act as fiduciaries and maintain continuing education."
        },
        {
          subtitle: "Chartered Financial Analyst (CFA)",
          description: "Rigorous investment analysis certification. Excellent for advisors focusing on investment management and portfolio construction."
        },
        {
          subtitle: "Personal Financial Specialist (PFS)",
          description: "Credential for Certified Public Accountants (CPAs) who specialize in personal financial planning, combining tax and financial expertise."
        },
        {
          subtitle: "FCA Registration",
          description: "In the UK, verify your advisor is registered with the Financial Conduct Authority. Check their permissions and any disciplinary actions."
        }
      ]
    },
    {
      title: "Red Flags to Avoid",
      icon: "alert-triangle" as const,
      content: [
        {
          subtitle: "Guaranteed Returns Promise",
          description: "No legitimate advisor can guarantee investment returns. Anyone promising specific returns is either lying or taking inappropriate risks with your money."
        },
        {
          subtitle: "Pressure to Invest Immediately",
          description: "Reputable advisors encourage due diligence. High-pressure tactics suggest they prioritize commissions over your financial well-being."
        },
        {
          subtitle: "Lack of Transparency About Fees",
          description: "If an advisor won't clearly explain how they're compensated or what you'll pay, find someone else. Fee transparency is essential."
        },
        {
          subtitle: "No Written Investment Policy",
          description: "Professional advisors provide written investment policy statements outlining your goals, risk tolerance, and strategy. Verbal promises aren't sufficient."
        },
        {
          subtitle: "Disciplinary Actions",
          description: "Check regulatory databases for complaints, sanctions, or legal issues. Past problems may indicate future concerns."
        }
      ]
    },
    {
      title: "Key Questions to Ask Potential Advisors",
      icon: "help-circle" as const,
      content: [
        {
          subtitle: "Fiduciary Standard",
          description: "Ask: 'Are you a fiduciary 100% of the time?' This means they must act in your best interest, not just provide 'suitable' advice."
        },
        {
          subtitle: "Compensation Structure",
          description: "Ask: 'How are you compensated?' Request specific details about fees, commissions, and any third-party payments they receive."
        },
        {
          subtitle: "Experience and Specialization",
          description: "Ask: 'What's your experience with clients like me?' Look for advisors who regularly work with your asset level and financial situations."
        },
        {
          subtitle: "Investment Philosophy",
          description: "Ask: 'What's your investment philosophy?' They should articulate a clear, consistent approach that aligns with your risk tolerance."
        },
        {
          subtitle: "Communication and Service",
          description: "Ask: 'How often will we meet and communicate?' Establish clear expectations for ongoing contact and portfolio reviews."
        }
      ]
    },
    {
      title: "Understanding Fee Structures",
      icon: "calculator" as const,
      content: [
        {
          subtitle: "Assets Under Management (AUM) Fees",
          description: "Typically 0.5% to 2% annually. Higher asset levels usually command lower percentage fees. Ensure you understand exactly what services are included."
        },
        {
          subtitle: "Hourly Fees",
          description: "£200-£500+ per hour for specific financial planning projects. Good for one-time planning needs or second opinions on major financial decisions."
        },
        {
          subtitle: "Fixed Project Fees",
          description: "Flat fees for comprehensive financial plans, typically £2,000-£10,000. Useful when you need specific planning but don't want ongoing management."
        },
        {
          subtitle: "Retainer Fees",
          description: "Monthly or quarterly fees for ongoing advice and planning. Often combined with reduced AUM fees for comprehensive service relationships."
        }
      ]
    },
    {
      title: "The Vetting Process",
      icon: "search" as const,
      content: [
        {
          subtitle: "Initial Research",
          description: "Check FCA registration, verify credentials with issuing organizations, review their website and client materials for professionalism and clarity."
        },
        {
          subtitle: "Background Checks",
          description: "Search for disciplinary actions, complaints, or legal issues through regulatory databases and professional association records."
        },
        {
          subtitle: "Interview Multiple Advisors",
          description: "Meet with at least 3 advisors to compare approaches, fees, and personalities. The best advisor for you depends on your specific needs and preferences."
        },
        {
          subtitle: "Request References",
          description: "Ask for client references, particularly from clients with similar financial situations. Reputable advisors should be comfortable providing references."
        },
        {
          subtitle: "Review Sample Plans",
          description: "Ask to see examples of their work (with client information removed). This shows their planning depth and communication style."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background" id="main-content">
      {/* Schema Markup */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
              Complete Guide: How to Choose a 
              <span className="text-primary"> Financial Advisor</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about selecting, vetting, and working with a financial advisor or wealth manager. Make informed decisions about your financial future.
            </p>
            <div className="flex items-center justify-center gap-2">
              <HandDrawnIcon type="check-circle" size={20} color="#3b82f6" />
              <p className="text-lg font-medium">Updated for 2025 • Comprehensive • Unbiased</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <HandDrawnIcon type={section.icon} size={24} color="#3b82f6" />
                      <h3 className="font-medium text-sm">{section.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <HandDrawnIcon type={section.icon} size={32} color="#3b82f6" />
                  </div>
                  <h2 className="text-3xl font-semibold">{section.title}</h2>
                </div>

                <div className="grid gap-6">
                  {section.content.map((item, itemIndex) => (
                    <Card key={itemIndex} className="border-border/50">
                      <CardHeader>
                        <CardTitle className="text-xl">{item.subtitle}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            {/* Key Takeaways */}
            <div className="bg-primary/5 rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-center">Key Takeaways</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <HandDrawnIcon type="check-circle" size={20} color="#10b981" className="mt-1" />
                    <p><strong>Prioritize fiduciary advisors</strong> who are legally required to act in your best interest.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HandDrawnIcon type="check-circle" size={20} color="#10b981" className="mt-1" />
                    <p><strong>Verify credentials and registration</strong> with proper regulatory bodies before trusting anyone with your money.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HandDrawnIcon type="check-circle" size={20} color="#10b981" className="mt-1" />
                    <p><strong>Understand fee structures completely</strong> and avoid anyone who won't provide transparent fee disclosure.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <HandDrawnIcon type="check-circle" size={20} color="#10b981" className="mt-1" />
                    <p><strong>Interview multiple advisors</strong> to compare approaches, experience, and personality fit.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HandDrawnIcon type="check-circle" size={20} color="#10b981" className="mt-1" />
                    <p><strong>Watch for red flags</strong> like guaranteed returns, high pressure tactics, or lack of transparency.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HandDrawnIcon type="check-circle" size={20} color="#10b981" className="mt-1" />
                    <p><strong>Choose experience over marketing</strong> - focus on advisors who regularly work with clients like you.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Ready to Find Your Perfect Financial Advisor?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Skip the research and vetting process. We've already screened hundreds of financial advisors and wealth managers to find the best professionals for your specific needs.
                </p>
                <Button size="lg" className="group">
                  Find Pre-Vetted Advisors Near You
                  <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Free matching • No obligation • Vetted for credentials and experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}