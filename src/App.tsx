import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { initializeCookieConsent, hasConsentFor } from "./lib/cookieConsent";
import { initializeAnalytics } from "./lib/analytics";
import { useAnalytics } from "./hooks/useAnalytics";
import { HomePage } from "./components/HomePage";
import { ContactPage } from "./components/ContactPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { CookiePolicy } from "./components/CookiePolicy";
import { WealthManagementPage } from "./components/WealthManagementPage";
import { AdvisorGuide } from "./components/AdvisorGuide";
import { LondonAdvisors } from "./components/cities/LondonAdvisors";
import { ManchesterAdvisors } from "./components/cities/ManchesterAdvisors";
import { EdinburghAdvisors } from "./components/cities/EdinburghAdvisors";
import { BirminghamAdvisors } from "./components/cities/BirminghamAdvisors";
import { LeedsAdvisors } from "./components/cities/LeedsAdvisors";
import { AdvisorSelectionChecklist } from "./components/guides/AdvisorSelectionChecklist";
import { AdvisorInterviewQuestions } from "./components/guides/AdvisorInterviewQuestions";
import { FeeOnlyVsCommissionGuide } from "./components/guides/FeeOnlyVsCommissionGuide";
import { AdminDashboard } from "./components/admin/AdminDashboard";

// Lazy load blog components for code splitting
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wealth-management" element={<WealthManagementPage />} />
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