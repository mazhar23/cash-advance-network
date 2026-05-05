import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaydayLoans from "./pages/PaydayLoans";
import PersonalLoans from "./pages/PersonalLoans";
import DebtConsolidation from "./pages/DebtConsolidation";
import InstallmentLoans from "./pages/InstallmentLoans";
import BadCreditLoans from "./pages/BadCreditLoans";
import EmergencyLoans from "./pages/EmergencyLoans";
import HowItWorksPage from "./pages/HowItWorksPage";
import FAQPage from "./pages/FAQPage";
import LoanCalculator from "./pages/LoanCalculator";
import Blog from "./pages/Blog";
import FinancialTips from "./pages/FinancialTips";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclosures from "./pages/Disclosures";
import LendingLicenses from "./pages/LendingLicenses";
import Accessibility from "./pages/Accessibility";
import Apply from "./pages/Apply";
import AboutUs from "./pages/AboutUs";
import StandaloneApply from "./pages/StandaloneApply";
import AdminClients from "./pages/AdminClients";
import LendingClubApply from "./pages/LendingClubApply";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;