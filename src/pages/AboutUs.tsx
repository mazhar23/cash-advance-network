import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Users, Target, CheckCircle } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Cash Advance Network Online</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Your trusted independent loan matching service, connecting you with the right financial solutions.
          </p>
        </div>
      </section>

      {/* Independence Statement */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-lg p-8 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Our Independence</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Cash Advance Network (cashadvancenetwork.com)</strong> is an independent 
              loan matching service operating under our own brand. We want to be completely transparent with our customers:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>We are <strong className="text-foreground">not affiliated with, endorsed by, or connected to</strong> any other company using similar names.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>We operate independently as a loan matching service, not as a direct lender.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Any similarities in name to other businesses are purely coincidental.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>We are not associated with any registered trademark holders using similar names.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Who We Are</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We are a free online service dedicated to helping consumers find the financial assistance they need. 
              Our platform connects borrowers with a network of reputable lenders who offer various loan products 
              including payday loans, personal loans, installment loans, and more.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded with the mission of simplifying the loan application process, we understand that financial 
              emergencies can happen to anyone. Whether you're facing unexpected medical bills, car repairs, or 
              simply need help making ends meet until your next paycheck, we're here to help you explore your options.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our service is completely free for consumers. We earn our revenue from lender partnerships, meaning 
              you never pay us a dime for using our matching service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Simplify Access</h3>
                <p className="text-muted-foreground">
                  Make it easy for consumers to compare and find loan options that fit their unique financial situations.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Promote Transparency</h3>
                <p className="text-muted-foreground">
                  Provide clear information about loan terms, rates, and requirements so you can make informed decisions.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Protect Privacy</h3>
                <p className="text-muted-foreground">
                  Safeguard your personal information with industry-standard security measures and responsible data practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How We Work</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">You Submit a Request</h3>
                  <p className="text-muted-foreground">
                    Fill out our simple online form with basic information about yourself and the loan you need.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">We Match You</h3>
                  <p className="text-muted-foreground">
                    Our system analyzes your information and connects you with lenders most likely to approve your request.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Review Your Options</h3>
                  <p className="text-muted-foreground">
                    Matched lenders will present their offers directly to you. Compare terms and choose the best option.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Get Your Funds</h3>
                  <p className="text-muted-foreground">
                    Once approved by a lender, funds can be deposited directly into your bank account, often within one business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

