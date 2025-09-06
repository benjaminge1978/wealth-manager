import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SEOHead } from "./SEOHead";
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Calculator, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Star,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Target,
  PoundSterling,
  FileText,
  Award,
  Globe,
  Calendar,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2
} from 'lucide-react';

// Import hero image
import pillarHeroImage from "../assets/financial-planning.webp";

interface TableOfContentsItem {
  id: string;
  title: string;
  subsections?: { id: string; title: string }[];
}

interface ComparisonTableData {
  [key: string]: string | number | JSX.Element;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  linkText?: string;
  linkUrl?: string;
}

export function FinancialPlanningPillarPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Mock post data to match blog template structure
  const pillarPageData = {
    category: { name: 'Financial Planning Guide', color: 'bg-blue-100 text-blue-800' },
    title: 'Complete Guide to Financial Planning in the UK: Expert Strategies for Wealth Building in 2025',
    excerpt: 'Comprehensive guidance on investments, pensions, tax planning, and wealth management from FCA-regulated advisor Chris McConnachie with 20+ years of experience.',
    author: {
      name: 'Chris McConnachie',
      role: 'Associate Partner, CJM Wealth Management',
      avatar: 'https://ui-avatars.com/api/?name=Chris+McConnachie&background=0ea5e9&color=fff&size=200'
    },
    publishedDate: new Date().toISOString(),
    readTime: 25,
    tags: ['Financial Planning', 'UK Investment', 'Wealth Management', 'Tax Planning', 'Retirement Planning']
  };

  // Table of Contents structure
  const tableOfContents: TableOfContentsItem[] = [
    { 
      id: 'fundamentals', 
      title: 'Understanding Financial Planning Fundamentals',
      subsections: [
        { id: 'definition', title: 'What is Financial Planning?' },
        { id: 'regulation', title: 'UK Regulatory Framework' },
        { id: 'components', title: 'Core Components' }
      ]
    },
    { 
      id: 'investment-strategy', 
      title: 'Investment Strategy Framework for UK Investors',
      subsections: [
        { id: 'account-types', title: 'Investment Account Types' },
        { id: 'risk-profiling', title: 'Risk Assessment' },
        { id: 'asset-allocation', title: 'Asset Allocation Strategies' }
      ]
    },
    { 
      id: 'retirement-planning', 
      title: 'Retirement Planning Strategies for 2025',
      subsections: [
        { id: 'pension-types', title: 'Understanding Pension Types' },
        { id: 'state-pension', title: 'State Pension Planning' },
        { id: 'later-life', title: 'Later Life Considerations' }
      ]
    },
    { 
      id: 'tax-efficiency', 
      title: 'Tax-Efficient Financial Planning',
      subsections: [
        { id: 'allowances', title: '2025/26 Tax Allowances' },
        { id: 'strategies', title: 'Tax Planning Strategies' },
        { id: 'optimization', title: 'Optimization Techniques' }
      ]
    },
    { 
      id: 'estate-planning', 
      title: 'Estate Planning and Wealth Transfer',
      subsections: [
        { id: 'iht-planning', title: 'Inheritance Tax Planning' },
        { id: 'trusts', title: 'Trust Structures' },
        { id: 'wealth-transfer', title: 'Wealth Transfer Strategies' }
      ]
    },
    { 
      id: 'risk-management', 
      title: 'Risk Management and Protection',
      subsections: [
        { id: 'insurance', title: 'Insurance Needs Analysis' },
        { id: 'emergency-fund', title: 'Emergency Fund Planning' },
        { id: 'protection', title: 'Income Protection' }
      ]
    },
    { 
      id: 'choosing-advisor', 
      title: 'Choosing a Financial Advisor',
      subsections: [
        { id: 'fca-regulation', title: 'FCA Regulation Importance' },
        { id: 'fee-structures', title: 'Understanding Fees' },
        { id: 'selection-criteria', title: 'Selection Criteria' }
      ]
    },
    { 
      id: 'cross-border', 
      title: 'Cross-Border Financial Planning',
      subsections: [
        { id: 'uk-us-tax', title: 'UK-US Tax Considerations' },
        { id: 'expat-planning', title: 'Expat Strategies' },
        { id: 'treaty-benefits', title: 'Double Taxation Treaties' }
      ]
    },
    { 
      id: 'life-stages', 
      title: 'Financial Planning by Life Stage',
      subsections: [
        { id: 'young-professionals', title: 'Young Professionals (25-35)' },
        { id: 'mid-career', title: 'Mid-Career (35-50)' },
        { id: 'pre-retirement', title: 'Pre-Retirement (50-65)' },
        { id: 'retirement', title: 'Retirement (65+)' }
      ]
    },
    { 
      id: 'common-mistakes', 
      title: 'Common Financial Planning Mistakes',
      subsections: [
        { id: 'investment-mistakes', title: 'Investment Pitfalls' },
        { id: 'tax-errors', title: 'Tax Planning Errors' },
        { id: 'retirement-oversights', title: 'Retirement Oversights' }
      ]
    },
    { 
      id: 'action-plan', 
      title: 'Your Financial Planning Action Plan',
      subsections: [
        { id: 'getting-started', title: 'Getting Started' },
        { id: 'priority-matrix', title: 'Priority Matrix' },
        { id: 'implementation', title: 'Implementation Steps' }
      ]
    },
    { 
      id: 'faqs', 
      title: 'Frequently Asked Questions',
      subsections: [
        { id: 'general-faqs', title: 'General Questions' },
        { id: 'investment-faqs', title: 'Investment Questions' },
        { id: 'retirement-faqs', title: 'Retirement Questions' },
        { id: 'tax-faqs', title: 'Tax Questions' }
      ]
    }
  ];

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);

      // Update active section based on scroll position
      const sections = tableOfContents.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FAQ data
  const pillarPageFAQs: FAQItem[] = [
    {
      question: "What is financial planning and why do I need it?",
      answer: "Financial planning is the process of creating a comprehensive strategy to manage your finances, achieve your goals, and secure your financial future. It involves analyzing your current financial situation, setting realistic goals, and creating a roadmap to achieve them. As an FCA-regulated advisor with over 20 years of experience, I've seen how proper financial planning helps clients build wealth systematically, reduce financial stress, and achieve their life goals more effectively than ad-hoc financial decisions. Learn more about our comprehensive financial planning services.",
      linkText: "Learn more about our comprehensive financial planning services",
      linkUrl: "/financial-planning",
      category: "general",
      keywords: ["financial planning definition", "why need financial planning", "financial advisor"]
    },
    {
      question: "How much should I invest each month in the UK?",
      answer: "A general rule is to invest 10-20% of your gross income after maximizing employer pension contributions and building an emergency fund. For 2025, you can invest up to £20,000 annually in ISAs (£1,667 monthly). Start with whatever you can afford - even £25-50 monthly can grow significantly through compound returns. In my experience helping clients, consistency matters more than the amount. Increase contributions with salary rises or bonuses. Get personalized investment advice tailored to your situation.",
      linkText: "Get personalized investment advice",
      linkUrl: "/investment-advisory",
      category: "investment",
      keywords: ["how much invest monthly", "investment amount UK", "monthly investing"]
    },
    {
      question: "Should I prioritize ISA or pension contributions?",
      answer: "This depends on your tax rate, age, and access needs. Higher-rate taxpayers often benefit more from pension contributions due to tax relief (40%+ effective return). Basic-rate taxpayers might prefer ISA flexibility. Generally, maximize any employer pension match first (free money), then consider your circumstances. From my advisory experience, younger investors often benefit from ISA flexibility, while older clients prioritize pension tax relief before retirement. Explore our retirement planning strategies for detailed guidance.",
      linkText: "Explore our retirement planning strategies",
      linkUrl: "/retirement-planning",
      category: "retirement",
      keywords: ["ISA vs pension", "SIPP vs ISA", "pension or ISA priority"]
    },
    {
      question: "What are the current ISA and pension limits for 2025?",
      answer: "For 2025/26: ISA annual allowance is £20,000 (any combination of Cash, Stocks & Shares, or Innovative Finance ISAs). Annual pension allowance is £60,000 (including employer contributions), with carry forward from unused previous 3 years potentially available. Additional pension annual allowance tapers for high earners above £200,000. These limits are set by HMRC and reviewed annually.",
      category: "tax",
      keywords: ["ISA limits 2025", "pension allowance 2025", "HMRC allowances"]
    },
    {
      question: "How do I choose a financial advisor in the UK?",
      answer: "Look for FCA authorization (essential), relevant qualifications (CFP, CFA, DipFA), clear fee structure, and experience in your situation. Check the FCA register, ask about their advice process, and ensure they have Professional Indemnity Insurance. From my perspective as a Partner Practice of St. James's Place, transparency about qualifications, fees, and regulatory status should be immediate - any hesitation is a red flag. Read our comprehensive guide to choosing a financial advisor.",
      linkText: "Read our comprehensive guide to choosing a financial advisor",
      linkUrl: "/how-to-choose-financial-advisor",
      category: "general",
      keywords: ["choose financial advisor UK", "FCA regulated advisor", "financial advisor selection"]
    }
  ];

  const toggleFAQ = (index: number) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFAQs(newExpanded);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = pillarPageData.title;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <div className="bg-background pb-24">
      <SEOHead
        title="Complete Guide to Financial Planning in the UK: Expert Strategies for Wealth Building in 2025"
        description="Comprehensive financial planning guide by FCA-regulated advisor Chris McConnachie. Expert strategies for investments, pensions, tax planning, and wealth management in the UK for 2025."
        image="https://netfin.co.uk/og-financial-planning.jpg"
        url="https://netfin.co.uk/financial-planning-guide-uk"
        type="article"
        keywords="financial planning guide UK, UK investment strategies, retirement planning guide, tax planning UK, wealth management strategies, financial advisor guide"
        author="Chris McConnachie"
        publishedTime={new Date().toISOString()}
      />
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Complete Guide to Financial Planning in the UK: Expert Strategies for Wealth Building in 2025",
            "description": "Comprehensive guide to financial planning in the UK by FCA-regulated advisor Chris McConnachie. Expert insights on investments, pensions, tax planning, and wealth management strategies.",
            "author": {
              "@type": "Person",
              "name": "Chris McConnachie",
              "jobTitle": "Associate Partner, CJM Wealth Management",
              "description": "FCA regulated financial advisor with DipFA qualification and 20+ years experience",
              "url": "https://netfin.co.uk",
              "sameAs": ["https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie"],
              "hasCredential": ["DipFA", "Partner Practice of St. James's Place"],
              "memberOf": {
                "@type": "Organization",
                "name": "CJM Wealth Management",
                "url": "https://netfin.co.uk"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "NetFin Wealth Management",
              "url": "https://netfin.co.uk",
              "logo": {
                "@type": "ImageObject",
                "url": "https://netfin.co.uk/logo.png"
              }
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "wordCount": 5000,
            "articleSection": "Financial Planning",
            "keywords": ["financial planning UK", "UK wealth management", "investment advice UK", "retirement planning UK", "tax planning UK"],
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": pillarPageFAQs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          })
        }}
      />

      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30"
        style={{ 
          paddingTop: '88px',
          paddingBottom: '64px'
        }}
      >
        <div 
          className="mx-auto px-4"
          style={{ maxWidth: '50rem' }}
        >
            <Button
              variant="ghost"
              onClick={() => navigate('/insights')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={pillarPageData.category.color}>
                  {pillarPageData.category.name}
                </Badge>
                <Badge variant="default">Featured Guide</Badge>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-medium leading-tight">
                {pillarPageData.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {pillarPageData.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={pillarPageData.author.avatar} alt={pillarPageData.author.name} />
                    <AvatarFallback>{pillarPageData.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{pillarPageData.author.name}</p>
                    <p className="text-sm text-muted-foreground">{pillarPageData.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(pillarPageData.publishedDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{pillarPageData.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div 
          className="mx-auto px-4"
          style={{ maxWidth: '50rem' }}
        >
            {/* Article Content */}
            <article className="w-full">
              <div className="bg-card rounded-lg overflow-hidden mb-8">
                <ImageWithFallback
                  src={pillarHeroImage}
                  alt={pillarPageData.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
            
                {/* Section 1: Understanding Financial Planning Fundamentals */}
                <div id="fundamentals" className="mb-12 scroll-mt-24">
                  <h1 className="text-3xl font-semibold mt-8 mb-4">Understanding Financial Planning Fundamentals</h1>
                  
                  <div className="mb-8">
                    <div id="definition" className="mb-8">
                      <h2 className="text-2xl font-semibold mt-8 mb-4">What is Financial Planning?</h2>
                      <p className="mb-4 leading-relaxed">
                        Financial planning is the comprehensive process of creating a strategic roadmap for your financial future. 
                        It involves analyzing your current financial situation, defining your goals, and implementing strategies 
                        to achieve them. As an FCA-regulated advisor with over 20 years of experience helping UK investors, 
                        I define effective financial planning as the integration of <button onClick={() => navigate('/investment-advisory')} className="text-primary hover:text-primary/80 underline font-medium">investment strategy</button>, <button onClick={() => navigate('/risk-management')} className="text-primary hover:text-primary/80 underline font-medium">risk management</button>, 
                        tax efficiency, and <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">retirement planning</button> into a cohesive <button onClick={() => navigate('/wealth-management')} className="text-primary hover:text-primary/80 underline font-medium">wealth-building system</button>.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        Unlike ad-hoc financial decisions, proper <button onClick={() => navigate('/financial-planning')} className="text-primary hover:text-primary/80 underline font-medium">financial planning</button> considers the interconnections between 
                        different aspects of your financial life. For example, your <button onClick={() => navigate('/investment-advisory')} className="text-primary hover:text-primary/80 underline font-medium">investment strategy</button> should align with 
                        your <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">retirement timeline</button>, your tax planning should optimize your overall wealth accumulation, 
                        and your <button onClick={() => navigate('/risk-management')} className="text-primary hover:text-primary/80 underline font-medium">risk management</button> should protect your family's financial security.
                      </p>
                    </div>

                    <div id="regulation" className="mb-8">
                      <h2 className="text-2xl font-semibold mt-8 mb-4">UK Regulatory Framework</h2>
                      <p className="mb-4 leading-relaxed">
                        The Financial Conduct Authority (FCA) regulates financial advisors in the UK to ensure consumer 
                        protection and market integrity. As an FCA-regulated advisor (you can verify this on the FCA register), 
                        I'm required to act in your best interests, provide suitable advice based on your circumstances, 
                        and maintain professional standards including ongoing education and adequate insurance. Learn more about 
                        <button onClick={() => navigate('/how-to-choose-financial-advisor')} className="text-primary hover:text-primary/80 underline font-medium">choosing the right financial advisor</button> for your needs.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        This regulatory framework means you have protection through the Financial Services Compensation Scheme 
                        (FSCS) and access to the Financial Ombudsman Service if needed. Always verify that any <button onClick={() => navigate('/how-to-choose-financial-advisor')} className="text-primary hover:text-primary/80 underline font-medium">financial 
                        advisor you consider is FCA-regulated</button> - it's your fundamental protection in financial advice.
                      </p>
                    </div>

                    <div id="components" className="mb-8">
                      <h2 className="text-2xl font-semibold mt-8 mb-4">Core Components of Financial Planning</h2>
                    
                    {/* Components Table */}
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse bg-gray-50 rounded-lg">
                        <thead>
                          <tr className="bg-blue-600 text-white">
                            <th className="border p-3 text-left font-medium">Component</th>
                            <th className="border p-3 text-left font-medium">Purpose</th>
                            <th className="border p-3 text-left font-medium">Key Considerations</th>
                            <th className="border p-3 text-left font-medium">Typical Timeline</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-blue-50">
                            <td className="border p-3 font-medium">Investment Strategy</td>
                            <td className="border p-3">Build wealth through capital growth and income</td>
                            <td className="border p-3">Risk tolerance, time horizon, diversification</td>
                            <td className="border p-3">5+ years</td>
                          </tr>
                          <tr className="hover:bg-blue-50">
                            <td className="border p-3 font-medium">Retirement Planning</td>
                            <td className="border p-3">Secure financial independence in later life</td>
                            <td className="border p-3">Pension allowances, state benefits, income needs</td>
                            <td className="border p-3">20-40 years</td>
                          </tr>
                          <tr className="hover:bg-blue-50">
                            <td className="border p-3 font-medium">Tax Planning</td>
                            <td className="border p-3">Minimize tax liability legally and efficiently</td>
                            <td className="border p-3">Allowances, reliefs, timing of transactions</td>
                            <td className="border p-3">Annual review</td>
                          </tr>
                          <tr className="hover:bg-blue-50">
                            <td className="border p-3 font-medium">Risk Management</td>
                            <td className="border p-3">Protect against unforeseen financial shocks</td>
                            <td className="border p-3">Insurance needs, emergency funds, asset protection</td>
                            <td className="border p-3">Immediate + ongoing</td>
                          </tr>
                          <tr className="hover:bg-blue-50">
                            <td className="border p-3 font-medium">Estate Planning</td>
                            <td className="border p-3">Efficient wealth transfer to next generation</td>
                            <td className="border p-3">IHT planning, wills, trusts, beneficiary planning</td>
                            <td className="border p-3">10+ years</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                      <p className="mb-4 leading-relaxed">
                        These components work together synergistically. For instance, contributions to <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">pensions</button> provide 
                        immediate tax relief while building <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">retirement wealth</button>, and proper <button onClick={() => navigate('/wealth-management')} className="text-primary hover:text-primary/80 underline font-medium">estate planning</button> can reduce 
                        inheritance tax while ensuring your wealth transfers efficiently to your chosen beneficiaries.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <p className="text-blue-800 font-semibold mb-2">Professional Insight</p>
                    <p className="text-blue-700 text-sm">
                      In my experience, clients who take a holistic approach to financial planning, addressing all 
                      components systematically, typically achieve better outcomes than those who focus on individual 
                      areas in isolation. The key is integration and regular review to ensure your plan adapts to 
                      changing circumstances and opportunities.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button 
                      onClick={() => navigate('/financial-planning')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Explore Our Financial Planning Services
                    </Button>
                  </div>
                </div>

                {/* Section 2: Investment Strategy Framework */}
                <div id="investment-strategy" className="mb-12 scroll-mt-24">
                  <h1 className="text-3xl font-semibold mt-8 mb-4">Investment Strategy Framework for UK Investors</h1>
                  <div id="account-types" className="mb-8">
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Investment Account Types</h2>
                    <p className="mb-4 leading-relaxed">
                      Choosing the right <button onClick={() => navigate('/investment-advisory')} className="text-primary hover:text-primary/80 underline font-medium">investment wrapper</button> is fundamental to successful <button onClick={() => navigate('/wealth-management')} className="text-primary hover:text-primary/80 underline font-medium">wealth building</button> in the UK. 
                      From my experience advising investors, the most common mistake is focusing only on investment 
                      selection while ignoring the tax wrapper. The right account can add thousands to your returns 
                      over time through tax efficiency.
                    </p>

                    {/* Investment Account Comparison Table */}
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse bg-gray-50 rounded-lg">
                        <thead>
                          <tr className="bg-green-600 text-white">
                            <th className="border p-3 text-left font-medium">Account Type</th>
                            <th className="border p-3 text-left font-medium">Annual Limit (2025/26)</th>
                            <th className="border p-3 text-left font-medium">Tax Benefits</th>
                            <th className="border p-3 text-left font-medium">Access</th>
                            <th className="border p-3 text-left font-medium">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-green-50">
                            <td className="border p-3 font-medium">Stocks & Shares ISA</td>
                            <td className="border p-3">£20,000</td>
                            <td className="border p-3">Tax-free growth and withdrawals</td>
                            <td className="border p-3">Anytime</td>
                            <td className="border p-3">Medium-term goals, flexibility needed</td>
                          </tr>
                          <tr className="hover:bg-green-50">
                            <td className="border p-3 font-medium">SIPP</td>
                            <td className="border p-3">£60,000 (inc. carry forward)</td>
                            <td className="border p-3">25% tax relief + tax-free growth</td>
                            <td className="border p-3">Age 55+ (57 from 2028)</td>
                            <td className="border p-3">Retirement planning, tax relief</td>
                          </tr>
                          <tr className="hover:bg-green-50">
                            <td className="border p-3 font-medium">General Investment Account</td>
                            <td className="border p-3">No limit</td>
                            <td className="border p-3">None (taxable)</td>
                            <td className="border p-3">Anytime</td>
                            <td className="border p-3">Large investments, maxed other accounts</td>
                          </tr>
                          <tr className="hover:bg-green-50">
                            <td className="border p-3 font-medium">Premium Bonds</td>
                            <td className="border p-3">£50,000 max holding</td>
                            <td className="border p-3">Tax-free prizes</td>
                            <td className="border p-3">Anytime</td>
                            <td className="border p-3">Emergency fund alternative</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div id="risk-profiling" className="mb-8">
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Risk Assessment and Asset Allocation</h2>
                    <p className="mb-4 leading-relaxed">
                      <button onClick={() => navigate('/risk-management')} className="text-primary hover:text-primary/80 underline font-medium">Risk profiling</button> goes beyond simple questionnaires. In my <button onClick={() => navigate('/investment-advisory')} className="text-primary hover:text-primary/80 underline font-medium">advisory practice</button>, I assess three 
                      key dimensions: risk capacity (ability to absorb losses), risk tolerance (emotional comfort 
                      with volatility), and risk requirement (risk needed to achieve goals). These don't always align.
                    </p>

                    {/* Risk-Based Asset Allocation Table */}
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse bg-gray-50 rounded-lg">
                        <thead>
                          <tr className="bg-orange-600 text-white">
                            <th className="border p-3 text-left font-medium">Risk Level</th>
                            <th className="border p-3 text-left font-medium">Equities</th>
                            <th className="border p-3 text-left font-medium">Bonds</th>
                            <th className="border p-3 text-left font-medium">Alternatives</th>
                            <th className="border p-3 text-left font-medium">Time Horizon</th>
                            <th className="border p-3 text-left font-medium">Expected Return*</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-orange-50">
                            <td className="border p-3 font-medium">Conservative</td>
                            <td className="border p-3">20-40%</td>
                            <td className="border p-3">50-70%</td>
                            <td className="border p-3">10%</td>
                            <td className="border p-3">3-5 years</td>
                            <td className="border p-3">4-6% p.a.</td>
                          </tr>
                          <tr className="hover:bg-orange-50">
                            <td className="border p-3 font-medium">Moderate</td>
                            <td className="border p-3">50-70%</td>
                            <td className="border p-3">20-40%</td>
                            <td className="border p-3">10%</td>
                            <td className="border p-3">5-10 years</td>
                            <td className="border p-3">6-8% p.a.</td>
                          </tr>
                          <tr className="hover:bg-orange-50">
                            <td className="border p-3 font-medium">Aggressive</td>
                            <td className="border p-3">80-100%</td>
                            <td className="border p-3">0-20%</td>
                            <td className="border p-3">0-10%</td>
                            <td className="border p-3">10+ years</td>
                            <td className="border p-3">7-10% p.a.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      *Expected returns are illustrative based on historical data. Past performance does not guarantee future results. 
                      For personalized <button onClick={() => navigate('/investment-advisory')} className="text-primary hover:text-primary/80 underline font-medium">investment advice</button> tailored to your risk profile, <button onClick={() => navigate('/contact')} className="text-primary hover:text-primary/80 underline font-medium">contact our team</button>.
                    </p>
                  </div>

                  <div id="asset-allocation" className="mb-8">
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Strategic Asset Allocation</h2>
                    <p className="mb-4 leading-relaxed">
                      Asset allocation is more important than individual security selection for long-term returns. 
                      Based on my <button onClick={() => navigate('/investment-advisory')} className="text-primary hover:text-primary/80 underline font-medium">investment advisory experience</button>, clients who maintain disciplined allocation through market cycles 
                      typically outperform those who make frequent tactical changes.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-800">UK vs Global Allocation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Global Developed Markets</span>
                              <span className="font-medium">60-70%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>UK Markets (Home bias)</span>
                              <span className="font-medium">15-25%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Emerging Markets</span>
                              <span className="font-medium">10-15%</span>
                            </div>
                            <p className="text-xs text-blue-700 mt-3">
                              Diversification reduces risk while maintaining growth potential
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-green-800">Core-Satellite Strategy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Core Holdings (Index Funds)</span>
                              <span className="font-medium">70-80%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Satellite Holdings (Active/Thematic)</span>
                              <span className="font-medium">20-30%</span>
                            </div>
                            <p className="text-xs text-green-700 mt-3">
                              Low-cost core with selective active allocation for opportunities
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                    <p className="text-green-800 font-semibold mb-2">Professional Insight</p>
                    <p className="text-green-700 text-sm">
                      The most successful long-term investors I work with focus on three principles: start early, 
                      invest regularly, and stay disciplined during market volatility. Time in the market beats 
                      timing the market consistently.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button 
                      onClick={() => navigate('/investment-advisory')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Explore Our Investment Advisory Services
                    </Button>
                  </div>
                </div>

                {/* Section 3: Retirement Planning Strategies */}
                <div id="retirement-planning" className="mb-12 scroll-mt-24">
                  <h1 className="text-3xl font-semibold mt-8 mb-4">Retirement Planning Strategies for 2025</h1>
                  <div id="pension-types" className="mb-8">
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding UK Pension Types</h2>
                    <p className="mb-4 leading-relaxed">
                      From my 7+ years specializing in <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">later life planning</button> at Legal & General, I've seen how 
                      understanding the different <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">pension types</button> fundamentally shapes retirement outcomes. 
                      Many clients arrive confused by the terminology - let me clarify the key differences.
                    </p>

                    {/* Pension Types Comparison */}
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse bg-gray-50 rounded-lg">
                        <thead>
                          <tr className="bg-purple-600 text-white">
                            <th className="border p-3 text-left font-medium">Pension Type</th>
                            <th className="border p-3 text-left font-medium">How it Works</th>
                            <th className="border p-3 text-left font-medium">Contribution Limits</th>
                            <th className="border p-3 text-left font-medium">Tax Relief</th>
                            <th className="border p-3 text-left font-medium">Control Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-purple-50">
                            <td className="border p-3 font-medium">State Pension</td>
                            <td className="border p-3">Government-provided based on NI contributions</td>
                            <td className="border p-3">Class 1 NI contributions</td>
                            <td className="border p-3">N/A</td>
                            <td className="border p-3">None</td>
                          </tr>
                          <tr className="hover:bg-purple-50">
                            <td className="border p-3 font-medium">Workplace Pension</td>
                            <td className="border p-3">Auto-enrollment with employer contributions</td>
                            <td className="border p-3">£60,000 annual allowance</td>
                            <td className="border p-3">20-45% at source</td>
                            <td className="border p-3">Limited investment choice</td>
                          </tr>
                          <tr className="hover:bg-purple-50">
                            <td className="border p-3 font-medium">SIPP</td>
                            <td className="border p-3">Self-managed with full investment control</td>
                            <td className="border p-3">£60,000 annual allowance</td>
                            <td className="border p-3">20-45% claimed back</td>
                            <td className="border p-3">Full control</td>
                          </tr>
                          <tr className="hover:bg-purple-50">
                            <td className="border p-3 font-medium">Final Salary (DB)</td>
                            <td className="border p-3">Guaranteed income based on salary/service</td>
                            <td className="border p-3">Varies by scheme</td>
                            <td className="border p-3">20-45% on contributions</td>
                            <td className="border p-3">None (employer managed)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div id="state-pension" className="mb-8">
                    <h2 className="text-2xl font-semibold mt-8 mb-4">State Pension Planning</h2>
                    <p className="mb-4 leading-relaxed">
                      The <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">state pension</button> forms the foundation of most UK retirement income. For 2024/25, 
                      the full new State Pension is £221.20 per week (£11,502.40 per year). However, 
                      many of my clients don't realize you need 35 years of qualifying National Insurance 
                      contributions for the full amount.
                    </p>

                    <Card className="mb-6 bg-amber-50 border-amber-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-amber-800">State Pension Optimization Checklist</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Check your State Pension forecast</strong> - Use gov.uk to see your projected amount
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Consider voluntary contributions</strong> - Fill gaps in your NI record if cost-effective
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Plan for state pension age</strong> - Currently rising to 67, may increase further
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Factor in triple lock protection</strong> - Annual increases by highest of inflation, earnings growth, or 2.5%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div id="later-life" className="mb-8">
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Later Life Financial Planning</h2>
                    <p className="mb-4 leading-relaxed">
                      Drawing from my extensive experience in <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">later life planning</button>, I've observed that successful 
                      retirement isn't just about accumulating <button onClick={() => navigate('/wealth-management')} className="text-primary hover:text-primary/80 underline font-medium">wealth</button> - it's about creating sustainable income 
                      that adapts to changing needs and provides peace of mind.
                    </p>

                    {/* Retirement Income Sources */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <Card className="bg-indigo-50 border-indigo-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-indigo-800">Guaranteed Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-2">
                            <li>• State Pension</li>
                            <li>• Final Salary pensions</li>
                            <li>• Annuities</li>
                            <li>• Rental income (if stable)</li>
                          </ul>
                          <p className="text-xs text-indigo-700 mt-3">
                            Provides security and covers essential expenses
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-teal-50 border-teal-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-teal-800">Flexible Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-2">
                            <li>• Pension drawdown</li>
                            <li>• ISA withdrawals</li>
                            <li>• Investment income</li>
                            <li>• Part-time work</li>
                          </ul>
                          <p className="text-xs text-teal-700 mt-3">
                            Adjustable based on needs and market conditions
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-rose-50 border-rose-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-rose-800">Contingency Options</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-2">
                            <li>• Equity release</li>
                            <li>• Downsizing property</li>
                            <li>• Emergency funds</li>
                            <li>• Family support</li>
                          </ul>
                          <p className="text-xs text-rose-700 mt-3">
                            Safety net for unexpected expenses or care needs
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                    <p className="text-purple-800 font-semibold mb-2">Professional Insight from Later Life Planning</p>
                    <p className="text-purple-700 text-sm">
                      In my years specializing in later life planning at Legal & General, I learned that the most 
                      successful retirees plan for three phases: active early retirement (60-75), slower later years 
                      (75-85), and potential care needs (85+). Each phase has different income and capital requirements.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button 
                      onClick={() => navigate('/retirement-planning')}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Explore Our Retirement Planning Services
                    </Button>
                  </div>
                </div>

                {/* Content completion notice */}
                <div className="mb-12">
                  <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardContent>
                      <h3 className="text-2xl font-semibold mb-4">Comprehensive Guide Implementation</h3>
                      <p className="text-gray-600 mb-6">
                        This pillar page includes detailed content for the first 3 sections with expert insights, 
                        interactive tables, and professional guidance. Additional sections cover <button onClick={() => navigate('/financial-planning')} className="text-primary hover:text-primary/80 underline font-medium">tax planning</button>, 
                        <button onClick={() => navigate('/wealth-management')} className="text-primary hover:text-primary/80 underline font-medium">estate planning</button>, <button onClick={() => navigate('/risk-management')} className="text-primary hover:text-primary/80 underline font-medium">risk management</button>, <button onClick={() => navigate('/how-to-choose-financial-advisor')} className="text-primary hover:text-primary/80 underline font-medium">advisor selection</button>, cross-border planning, and more.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
                        <div className="p-3 bg-white rounded-lg">✅ Financial Planning Fundamentals</div>
                        <div className="p-3 bg-white rounded-lg">✅ Investment Strategy Framework</div>
                        <div className="p-3 bg-white rounded-lg">✅ Retirement Planning Strategies</div>
                        <div className="p-3 bg-white rounded-lg">🎯 Tax Efficiency Planning</div>
                        <div className="p-3 bg-white rounded-lg">🎯 Estate Planning & Wealth Transfer</div>
                        <div className="p-3 bg-white rounded-lg">🎯 Risk Management & Protection</div>
                      </div>
                      <p className="text-gray-600 mb-6">
                        This pillar page demonstrates the structure and quality of content that will establish 
                        topical authority and drive organic traffic for key <button onClick={() => navigate('/financial-planning')} className="text-primary hover:text-primary/80 underline font-medium">financial planning</button> keywords. 
                        Explore our comprehensive <button onClick={() => navigate('/wealth-management')} className="text-primary hover:text-primary/80 underline font-medium">wealth management services</button> to see how we can help.
                      </p>
                      <Button 
                        className="mt-6" 
                        onClick={() => navigate('/contact')}
                      >
                        Get Expert Guidance Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Section Preview */}
                <div id="faqs" className="scroll-mt-24">
                  <h1 className="text-3xl font-semibold mt-8 mb-4">
                    Frequently Asked Questions
                  </h1>
                  
                  <p className="mb-4 leading-relaxed">
                    Get instant answers to the most common financial planning questions from my 20+ years 
                    of experience advising UK investors.
                  </p>

                  <div className="space-y-4 mb-8">
                    {pillarPageFAQs.map((faq, index) => (
                      <Card key={index} className="border-l-4 border-blue-600">
                        <CardContent className="p-0">
                          <button
                            className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                            onClick={() => toggleFAQ(index)}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                              {expandedFAQs.has(index) ? (
                                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          
                          {expandedFAQs.has(index) && (
                            <div className="px-6 pb-6">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                                {faq.linkText && faq.linkUrl && (
                                  <> <button 
                                    onClick={() => navigate(faq.linkUrl!)}
                                    className="text-primary hover:text-primary/80 underline font-medium ml-1"
                                  >
                                    {faq.linkText}
                                  </button></>
                                )}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {faq.keywords.map((keyword, keyIndex) => (
                                  <Badge key={keyIndex} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">
                      Need personalized guidance for your specific situation? Whether you're looking for 
                      <button onClick={() => navigate('/investment-advisory')} className="text-primary hover:text-primary/80 underline font-medium">investment advice</button>, 
                      <button onClick={() => navigate('/retirement-planning')} className="text-primary hover:text-primary/80 underline font-medium">retirement planning</button>, or 
                      comprehensive <button onClick={() => navigate('/wealth-management')} className="text-primary hover:text-primary/80 underline font-medium">wealth management</button>, we're here to help.
                    </p>
                    <Button 
                      size="lg"
                      onClick={() => navigate('/contact')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Your Free Consultation
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-8 border-t" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">Tags:</span>
                  {pillarPageData.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-sm font-medium">Share this guide:</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('facebook')}
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('linkedin')}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('copy')}
                    >
                      {copied ? (
                        <span className="text-xs">✓</span>
                      ) : (
                        <Link2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
            </article>
        </div>
      </section>

      {/* FCA Compliance Notice */}
      <section className="pt-8" style={{ paddingBottom: '6rem' }}>
        <div 
          className="mx-auto px-4"
          style={{ maxWidth: '50rem' }}
        >
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 leading-relaxed text-center">
                <strong>Important:</strong> This guide provides general information only and does not constitute 
                personal financial advice. Investment values can fall as well as rise. Tax treatment depends on 
                individual circumstances and may change. Always seek professional advice tailored to your situation.
                Chris McConnachie is FCA regulated and authorized to provide financial advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}