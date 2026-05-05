import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Search, CheckCircle, Banknote, ArrowRight, Shield, Clock, Users } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: FileText,
      number: "01",
      title: "Complete Our Simple Application",
      description: "Fill out our secure online form in just 5 minutes. We only ask for essential information like your name, address, employment details, and banking information. No lengthy paperwork or in-person visits required.",
      details: [
        "Basic personal information",
        "Employment and income details",
        "Bank account information",
        "Loan amount and purpose"
      ]
    },
    {
      icon: Search,
      number: "02",
      title: "Get Matched with Lenders",
      description: "Once you submit your application, our advanced matching system connects you with lenders from our trusted network who are most likely to approve your loan based on your specific situation.",
      details: [
        "Multiple lender options",
        "Competitive rate matching",
        "No obligation to accept",
        "Soft credit check only"
      ]
    },
    {
      icon: CheckCircle,
      number: "03",
      title: "Review and Accept Your Offer",
      description: "Receive loan offers from matched lenders within minutes. Review all terms including interest rate, fees, payment schedule, and total cost. Only accept an offer if it works for you.",
      details: [
        "Clear terms and conditions",
        "No hidden fees",
        "APR and payment details",
        "Repayment schedule"
      ]
    },
    {
      icon: Banknote,
      number: "04",
      title: "Get Your Money Fast",
      description: "After accepting a loan offer and completing any final verification, funds are deposited directly into your bank account. Many borrowers receive money as soon as the next business day.",
      details: [
        "Direct deposit to your account",
        "As fast as next business day",
        "Secure transfer",
        "Confirmation notification"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                How It Works
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                Getting a loan through Cash Advance America Online is simple, fast, and secure. 
                Follow these four easy steps to get the funds you need.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                      <step.icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-bold text-primary bg-accent px-3 py-1 rounded-full">Step {step.number}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{step.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                    <ul className="grid grid-cols-2 gap-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Trust Cash Advance America Online?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Bank-Level Security</h3>
                  <p className="text-sm text-muted-foreground">256-bit SSL encryption protects all your personal and financial information.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Fast Process</h3>
                  <p className="text-sm text-muted-foreground">Apply in 5 minutes, get a decision in minutes, and receive funds quickly.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">500K+ Customers</h3>
                  <p className="text-sm text-muted-foreground">Join over half a million Americans who have trusted us for their loan needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Apply now and experience our simple, fast, and secure loan process.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Start Your Application
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;