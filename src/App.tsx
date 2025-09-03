import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ContactPage } from "./components/ContactPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { WealthManagementPage } from "./components/WealthManagementPage";
import { AdvisorGuide } from "./components/AdvisorGuide";
import { LondonAdvisors } from "./components/cities/LondonAdvisors";
import { ManchesterAdvisors } from "./components/cities/ManchesterAdvisors";
import { EdinburghAdvisors } from "./components/cities/EdinburghAdvisors";
import { BirminghamAdvisors } from "./components/cities/BirminghamAdvisors";
import { LeedsAdvisors } from "./components/cities/LeedsAdvisors";

// Lazy load blog components for code splitting
const BlogListing = lazy(() => import("./components/blog/BlogListing").then(module => ({ default: module.BlogListing })));
const BlogPost = lazy(() => import("./components/blog/BlogPost").then(module => ({ default: module.BlogPost })));

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
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
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/financial-advisors-london" element={<LondonAdvisors />} />
          <Route path="/financial-advisors-manchester" element={<ManchesterAdvisors />} />
          <Route path="/financial-advisors-edinburgh" element={<EdinburghAdvisors />} />
          <Route path="/financial-advisors-birmingham" element={<BirminghamAdvisors />} />
          <Route path="/financial-advisors-leeds" element={<LeedsAdvisors />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}