import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PaydayLoans = lazy(() => import("./pages/PaydayLoans"));
const PersonalLoans = lazy(() => import("./pages/PersonalLoans"));
const DebtConsolidation = lazy(() => import("./pages/DebtConsolidation"));
const InstallmentLoans = lazy(() => import("./pages/InstallmentLoans"));
const BadCreditLoans = lazy(() => import("./pages/BadCreditLoans"));
const EmergencyLoans = lazy(() => import("./pages/EmergencyLoans"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const Blog = lazy(() => import("./pages/Blog"));
const FinancialTips = lazy(() => import("./pages/FinancialTips"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Disclosures = lazy(() => import("./pages/Disclosures"));
const LendingLicenses = lazy(() => import("./pages/LendingLicenses"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Apply = lazy(() => import("./pages/Apply"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const StandaloneApply = lazy(() => import("./pages/StandaloneApply"));
const AdminClients = lazy(() => import("./pages/AdminClients"));
const LendingClubApply = lazy(() => import("./pages/LendingClubApply"));
const AdvanceAmericaApply = lazy(() => import("./pages/AdvanceAmericaApply"));
const ProsperApply = lazy(() => import("./pages/ProsperApply"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/payday-loans" element={<PaydayLoans />} />
            <Route path="/personal-loans" element={<PersonalLoans />} />
            <Route path="/debt-consolidation" element={<DebtConsolidation />} />
            <Route path="/installment-loans" element={<InstallmentLoans />} />
            <Route path="/bad-credit-loans" element={<BadCreditLoans />} />
            <Route path="/emergency-loans" element={<EmergencyLoans />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/financial-tips" element={<FinancialTips />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/disclosures" element={<Disclosures />} />
            <Route path="/lending-licenses" element={<LendingLicenses />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/standalone-apply" element={<StandaloneApply />} />
            <Route path="/admin-clients" element={<AdminClients />} />
            <Route path="/lendingclub-apply" element={<LendingClubApply />} />
            <Route path="/advanceamerica-apply" element={<AdvanceAmericaApply />} />
            <Route path="/prosper-apply" element={<ProsperApply />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;