import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { Shield, Clock, CheckCircle } from "lucide-react";

const Apply = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Apply for Your Loan Today
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started with our simple, secure application process. Most applications are reviewed within 24 hours.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">5-Minute Application</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm">No Hidden Fees</span>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <LoanApplicationForm />

            {/* Disclaimer */}
            <div className="max-w-2xl mx-auto mt-8">
              <p className="text-xs text-muted-foreground text-center">
                By submitting this application, you agree to our{" "}
                <a href="/terms-of-service" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                . We may use your information to contact you regarding your loan application. Your personal information is encrypted and secure.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
