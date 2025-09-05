import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { initializeCookieConsent, hasConsentFor } from "./lib/cookieConsent";
import { initializeAnalytics } from "./lib/analytics";
import { useAnalytics } from "./hooks/useAnalytics";
import { HomePage } from "./components/HomePage"; // Keep HomePage eager for initial load

// Lazy load all route components for better code splitting
const ContactPage = lazy(() => import("./components/ContactPage").then(module => ({ default: module.ContactPage })));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy").then(module => ({ default: module.PrivacyPolicy })));
const CookiePolicy = lazy(() => import("./components/CookiePolicy").then(module => ({ default: module.CookiePolicy })));
const WealthManagementPage = lazy(() => import("./components/WealthManagementPage").then(module => ({ default: module.WealthManagementPage })));
const AdvisorGuide = lazy(() => import("./components/AdvisorGuide").then(module => ({ default: module.AdvisorGuide })));

// Lazy load service pages
const FinancialPlanningPage = lazy(() => import("./components/FinancialPlanningPage").then(module => ({ default: module.FinancialPlanningPage })));
const RiskManagementPage = lazy(() => import("./components/RiskManagementPage").then(module => ({ default: module.RiskManagementPage })));
const InvestmentAdvisoryPage = lazy(() => import("./components/InvestmentAdvisoryPage").then(module => ({ default: module.InvestmentAdvisoryPage })));
const EducationPlanningPage = lazy(() => import("./components/EducationPlanningPage").then(module => ({ default: module.EducationPlanningPage })));
const RetirementPlanningPage = lazy(() => import("./components/RetirementPlanningPage").then(module => ({ default: module.RetirementPlanningPage })));

// Lazy load city advisor pages
const LondonAdvisors = lazy(() => import("./components/cities/LondonAdvisors").then(module => ({ default: module.LondonAdvisors })));
const ManchesterAdvisors = lazy(() => import("./components/cities/ManchesterAdvisors").then(module => ({ default: module.ManchesterAdvisors })));
const EdinburghAdvisors = lazy(() => import("./components/cities/EdinburghAdvisors").then(module => ({ default: module.EdinburghAdvisors })));
const BirminghamAdvisors = lazy(() => import("./components/cities/BirminghamAdvisors").then(module => ({ default: module.BirminghamAdvisors })));
const LeedsAdvisors = lazy(() => import("./components/cities/LeedsAdvisors").then(module => ({ default: module.LeedsAdvisors })));

// Lazy load guide pages
const AdvisorSelectionChecklist = lazy(() => import("./components/guides/AdvisorSelectionChecklist").then(module => ({ default: module.AdvisorSelectionChecklist })));
const AdvisorInterviewQuestions = lazy(() => import("./components/guides/AdvisorInterviewQuestions").then(module => ({ default: module.AdvisorInterviewQuestions })));
const FeeOnlyVsCommissionGuide = lazy(() => import("./components/guides/FeeOnlyVsCommissionGuide").then(module => ({ default: module.FeeOnlyVsCommissionGuide })));

// Lazy load admin and blog components
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard").then(module => ({ default: module.AdminDashboard })));
const BlogListing = lazy(() => import("./components/blog/BlogListing").then(module => ({ default: module.BlogListing })));
const BlogPost = lazy(() => import("./components/blog/BlogPost").then(module => ({ default: module.BlogPost })));

export default function App() {
  // Use analytics hook for automatic page tracking
  useAnalytics();

  useEffect(() => {
    // Initialize cookie consent system on app load
    initializeCookieConsent();

    // Initialize analytics if user has already consented
    if (hasConsentFor('analytics')) {
      initializeAnalytics();
    }

    // Listen for cookie consent changes to initialize/disable analytics
    const handleConsentChange = (event: CustomEvent) => {
      const preferences = event.detail;
      if (preferences.analytics) {
        initializeAnalytics();
      }
    };

    // Listen for consent changes
    window.addEventListener('cookieConsentChanged', handleConsentChange as EventListener);

    // Cleanup event listener
    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Header />
      <CookieConsentBanner />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-accent/20">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary mx-auto"></div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Loading page...</p>
              <p className="text-sm text-muted-foreground">Please wait while we prepare your content</p>
            </div>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wealth-management" element={<WealthManagementPage />} />
          <Route path="/financial-planning" element={<FinancialPlanningPage />} />
          <Route path="/risk-management" element={<RiskManagementPage />} />
          <Route path="/investment-advisory" element={<InvestmentAdvisoryPage />} />
          <Route path="/education-planning" element={<EducationPlanningPage />} />
          <Route path="/retirement-planning" element={<RetirementPlanningPage />} />
          <Route path="/how-to-choose-financial-advisor" element={<AdvisorGuide />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/insights" element={<BlogListing />} />
          <Route path="/insights/:slug" element={<BlogPost />} />
          <Route path="/financial-advisors-london" element={<LondonAdvisors />} />
          <Route path="/financial-advisors-manchester" element={<ManchesterAdvisors />} />
          <Route path="/financial-advisors-edinburgh" element={<EdinburghAdvisors />} />
          <Route path="/financial-advisors-birmingham" element={<BirminghamAdvisors />} />
          <Route path="/financial-advisors-leeds" element={<LeedsAdvisors />} />
          <Route path="/financial-advisor-selection-checklist" element={<AdvisorSelectionChecklist />} />
          <Route path="/financial-advisor-interview-questions" element={<AdvisorInterviewQuestions />} />
          <Route path="/fee-only-vs-commission-financial-advisors" element={<FeeOnlyVsCommissionGuide />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}