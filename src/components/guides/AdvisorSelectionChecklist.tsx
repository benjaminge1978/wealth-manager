import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function AdvisorSelectionChecklist() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with ConvertKit or email service
    console.log("Email captured:", email);
    setIsSubmitted(true);
  };

  const checklistItems = [
    {
      category: "Credentials & Qualifications",
      items: [
        "✓ FCA registered and authorized",
        "✓ Relevant professional qualifications (CFP, CFA, Chartered Financial Planner)",
        "✓ Professional Indemnity Insurance confirmed",
        "✓ Clean regulatory record (no disciplinary actions)",
        "✓ Member of professional bodies (Personal Finance Society, etc.)"
      ]
    },
    {
      category: "Fee Structure & Transparency",
      items: [
        "✓ Clear explanation of how they're compensated",
        "✓ Written fee disclosure provided",
        "✓ No hidden fees or commission conflicts",
        "✓ Annual management fees clearly stated",
        "✓ Initial consultation and ongoing service costs outlined"
      ]
    },
    {
      category: "Fiduciary Standards",
      items: [
        "✓ Confirms they act as fiduciary 100% of the time",
        "✓ Written investment policy statement provided",
        "✓ Regular portfolio reviews scheduled",
        "✓ Conflicts of interest disclosed",
        "✓ Client agreement clearly defines relationship"
      ]
    },
    {
      category: "Experience & Specialization",
      items: [
        "✓ Relevant experience with your asset level",
        "✓ Specialization matches your needs",
        "✓ Client references available",
        "✓ Track record of client retention",
        "✓ Examples of similar client situations handled"
      ]
    },
    {
      category: "Communication & Service",
      items: [
        "✓ Clear communication schedule established",
        "✓ Multiple contact methods available",
        "✓ Response time expectations set",
        "✓ Technology platform demonstrated",
        "✓ Support team and backup coverage explained"
      ]
    },
    {
      category: "Investment Philosophy & Approach",
      items: [
        "✓ Investment philosophy clearly articulated",
        "✓ Risk assessment process explained",
        "✓ Asset allocation methodology shared",
        "✓ Rebalancing strategy outlined",
        "✓ Performance reporting format shown"
      ]
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
              <HandDrawnIcon type="check-circle" size={32} color="#10b981" />
            </div>
            <CardTitle className="text-2xl">Download Link Sent!</CardTitle>
            <CardDescription className="text-lg">
              Check your email for the comprehensive Financial Advisor Selection Checklist PDF.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              You'll also receive our weekly newsletter with expert financial planning insights and advisor selection tips.
            </p>
            <Button onClick={() => window.history.back()}>
              Return to Previous Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" id="main-content">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
              Financial Advisor Selection
              <span className="text-primary"> Checklist</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Download our comprehensive 30-point checklist to evaluate and select the perfect financial advisor for your needs. Used by thousands of successful investors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="file-text" size={20} color="#3b82f6" />
                <span>6-Page PDF Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                <span>30-Point Checklist</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#10b981" />
                <span>Expert Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">What's Inside the Checklist</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Six essential categories covering everything you need to evaluate when choosing a financial advisor.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {checklistItems.map((category, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <HandDrawnIcon type="check-circle" size={24} color="#3b82f6" />
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {category.items.slice(0, 3).map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                      <li className="text-primary font-medium">
                        + {category.items.length - 3} more points...
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Email Capture Form */}
            <div className="max-w-2xl mx-auto">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Download Your Free Checklist</CardTitle>
                  <CardDescription className="text-lg">
                    Enter your email to receive the complete PDF guide instantly, plus weekly expert insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full group">
                      Download Free Checklist PDF
                      <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </Button>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <HandDrawnIcon type="shield" size={16} color="#10b981" />
                        <span>No spam, ever</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HandDrawnIcon type="mail" size={16} color="#3b82f6" />
                        <span>Unsubscribe anytime</span>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">Why This Checklist Works</h2>
              <p className="text-lg text-muted-foreground">
                Based on regulatory guidance and expert recommendations from certified financial planners.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-border/50">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
                    <HandDrawnIcon type="shield" size={32} color="#10b981" />
                  </div>
                  <CardTitle className="text-xl">Avoid Costly Mistakes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Prevent choosing advisors with hidden fees, conflicts of interest, or inadequate qualifications that could cost you thousands.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-border/50">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4">
                    <HandDrawnIcon type="target" size={32} color="#3b82f6" />
                  </div>
                  <CardTitle className="text-xl">Save Time & Effort</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Streamline your advisor selection process with a proven framework instead of starting from scratch.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-border/50">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mx-auto mb-4">
                    <HandDrawnIcon type="award" size={32} color="#f59e0b" />
                  </div>
                  <CardTitle className="text-xl">Expert-Approved</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Developed by certified financial planners and reviewed by industry experts for completeness and accuracy.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Join 5,000+ Smart Investors</h2>
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <HandDrawnIcon type="users" size={20} color="#3b82f6" />
                  <span>5,000+ Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <HandDrawnIcon type="star" size={20} color="#f59e0b" />
                  <span>4.9/5 Average Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                  <span>Updated January 2025</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                "This checklist saved me from choosing an advisor with hidden fees. The questions about fiduciary standards were eye-opening!"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — Sarah M., London
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}