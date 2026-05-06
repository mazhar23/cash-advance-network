import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import HowItWorks from "@/components/HowItWorks";
import LoanCalculatorSection from "@/components/LoanCalculatorSection";
import DownloadAppSection from "@/components/DownloadAppSection";
import DisclosuresSection from "@/components/DisclosuresSection";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = "Cash Advance America"; }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const validateToken = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('access_token', token)
          .gt('token_expiry', new Date().toISOString())
          .eq('is_active', true)
          .single();

        if (!error && data) {
          setClient(data);
        }
        setLoading(false);
      };

      validateToken();
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection client={client} />
        <WelcomeSection />
        <HowItWorks />
        <LoanCalculatorSection />
        <DownloadAppSection />
        <DisclosuresSection />
      </main>

      {/* Client-specific footer message */}
      {client && (
        <div className="bg-blue-50 border-t border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center">
              <p className="text-blue-800 font-medium">
                Welcome, {client.name}! Your application access is active.
              </p>
              <p className="text-blue-600 text-sm mt-1">
                Click "Apply Now" to submit your loan application.
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;