import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HandDrawnIcon } from "../ui/HandDrawnIcon";
import { useState } from "react";

export function AdvisorInterviewQuestions() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with ConvertKit or email service
    console.log("Email captured:", email);
    setIsSubmitted(true);
  };

  const questionCategories = [
    {
      category: "Essential Opening Questions",
      icon: "help-circle" as const,
      questions: [
        "Are you a fiduciary 100% of the time when providing advice?",
        "How are you compensated for your services?",
        "What are your qualifications and credentials?",
        "Are you registered with the Financial Conduct Authority?",
        "Do you carry Professional Indemnity Insurance?"
      ]
    },
    {
      category: "Fee Structure & Costs",
      icon: "calculator" as const,
      questions: [
        "What is your annual management fee percentage?",
        "Are there any hidden fees or additional charges?",
        "How do you bill for financial planning services?",
        "What is the minimum investment requirement?",
        "Do you receive any commissions from product sales?"
      ]
    },
    {
      category: "Investment Philosophy",
      icon: "trending-up" as const,
      questions: [
        "What is your investment philosophy and approach?",
        "How do you determine asset allocation for clients?",
        "How often do you rebalance portfolios?",
        "What investment platforms do you use?",
        "How do you handle market volatility?"
      ]
    },
    {
      category: "Client Service & Communication",
      icon: "users" as const,
      questions: [
        "How often will we meet to review my portfolio?",
        "What is your typical response time to client inquiries?",
        "Who will I work with day-to-day?",
        "How do you report on portfolio performance?",
        "What happens if you're unavailable?"
      ]
    },
    {
      category: "Experience & Track Record",
      icon: "award" as const,
      questions: [
        "How many clients do you currently serve?",
        "What is your typical client profile?",
        "How long have you been providing financial advice?",
        "Can you provide client references?",
        "What is your client retention rate?"
      ]
    },
    {
      category: "Red Flag Questions",
      icon: "alert-triangle" as const,
      questions: [
        "Have you ever been subject to regulatory discipline?",
        "Do you guarantee investment returns?",
        "Why are you better than other advisors?",
        "What is your worst client experience?",
        "Why did your last clients leave?"
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
              Check your email for the 50 Essential Financial Advisor Interview Questions PDF.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              You'll also receive our weekly newsletter with expert interviews and advisor selection insights.
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
              50 Essential Financial Advisor
              <span className="text-primary"> Interview Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Download our comprehensive list of questions to ask any financial advisor before hiring them. Avoid costly mistakes and find the perfect match for your needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="file-text" size={20} color="#3b82f6" />
                <span>8-Page PDF Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="help-circle" size={20} color="#3b82f6" />
                <span>50 Key Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="shield" size={20} color="#10b981" />
                <span>Printable Format</span>
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
              <h2 className="text-3xl font-semibold">6 Critical Question Categories</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every question is designed to reveal crucial information about your potential advisor's qualifications, approach, and suitability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {questionCategories.map((category, index) => (
                <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <HandDrawnIcon type={category.icon} size={24} color="#3b82f6" />
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {category.questions.slice(0, 3).map((question, questionIndex) => (
                        <li key={questionIndex} className="text-muted-foreground">
                          • {question}
                        </li>
                      ))}
                      <li className="text-primary font-medium">
                        + {category.questions.length - 3} more questions...
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
                  <CardTitle className="text-2xl">Get Your Free Interview Guide</CardTitle>
                  <CardDescription className="text-lg">
                    Download the complete list of 50 questions plus expert guidance on what answers to look for.
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
                      Download Free Interview Questions PDF
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

      {/* How to Use Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-semibold">How to Use These Questions</h2>
              <p className="text-lg text-muted-foreground">
                Strategic advice on getting the most from your advisor interviews.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border/50">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <HandDrawnIcon type="target" size={24} color="#3b82f6" />
                  </div>
                  <CardTitle className="text-xl">Before the Meeting</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Review and select the most relevant questions for your situation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Print the guide and bring it to your meeting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Prepare follow-up questions based on your specific needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Research the advisor's background and credentials first</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                    <HandDrawnIcon type="lightbulb" size={24} color="#10b981" />
                  </div>
                  <CardTitle className="text-xl">During the Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Take notes on their responses for later comparison</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Ask for written documentation of key claims</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Pay attention to how they explain complex concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HandDrawnIcon type="check-circle" size={16} color="#10b981" className="mt-0.5 flex-shrink-0" />
                      <span>Notice red flags like evasive answers or pressure tactics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Trusted by Thousands</h2>
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <HandDrawnIcon type="users" size={20} color="#3b82f6" />
                  <span>8,500+ Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <HandDrawnIcon type="star" size={20} color="#f59e0b" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <HandDrawnIcon type="check-circle" size={20} color="#10b981" />
                  <span>Updated for 2025</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto mb-4">
                "These questions helped me identify that my potential advisor wasn't actually a fiduciary! The fee transparency questions saved me from choosing someone with hidden charges."
              </p>
              <p className="text-sm text-muted-foreground">
                — Michael R., Manchester
              </p>
              <hr className="my-6 border-border/50" />
              <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto mb-4">
                "I interviewed three advisors using this guide. The questions about client retention rates and references really separated the professionals from the salespeople."
              </p>
              <p className="text-sm text-muted-foreground">
                — Emma L., Edinburgh
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}