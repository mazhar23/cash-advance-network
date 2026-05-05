import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, Shield, Zap, AlertCircle } from "lucide-react";

const PaydayLoans = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Fast Payday Loans Online
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                Get quick cash advances from $100 to $1,500 with same-day approval. 
                Perfect for emergency expenses when you need money fast.
              </p>
              <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
                Apply Now - Get Cash Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* What is a Payday Loan */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">What is a Payday Loan?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A payday loan is a short-term, small-dollar loan designed to help you cover unexpected expenses 
                until your next paycheck. These loans typically range from $100 to $1,500 and are repaid on your 
                next pay date, usually within 2-4 weeks.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Payday loans are popular because they offer fast approval, minimal documentation requirements, 
                and don't always require a perfect credit score. They're ideal for emergencies like car repairs, 
                medical bills, utility payments, or other unexpected expenses.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Fast Funding</h3>
                    <p className="text-sm text-muted-foreground">Get money as fast as the same business day</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Bad Credit OK</h3>
                    <p className="text-sm text-muted-foreground">No perfect credit score required</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Quick Process</h3>
                    <p className="text-sm text-muted-foreground">Apply online in just 5 minutes</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How Payday Loans Work */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How Payday Loans Work</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Apply Online</h3>
                    <p className="text-muted-foreground">Complete our simple online form with your personal and employment information. The process takes about 5 minutes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Get Approved</h3>
                    <p className="text-muted-foreground">Receive a decision within minutes. Our lender network reviews your application quickly to get you an answer fast.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Receive Your Funds</h3>
                    <p className="text-muted-foreground">Once approved, funds are deposited directly into your bank account, often as fast as the same or next business day.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Repay on Your Next Payday</h3>
                    <p className="text-muted-foreground">The loan plus fees are automatically debited from your bank account on your next pay date.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">Payday Loan Requirements</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Basic Requirements</h3>
                  <ul className="space-y-3">
                    {[
                      "Be at least 18 years old",
                      "Have a valid government-issued ID",
                      "Have an active checking account",
                      "Provide proof of regular income",
                      "Have a working phone number and email"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-4">What We Don't Require</h3>
                  <ul className="space-y-3">
                    {[
                      "Perfect credit score",
                      "Collateral or security",
                      "Long employment history",
                      "Extensive paperwork",
                      "In-person visits"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Considerations */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-8 w-8 text-secondary flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Important Considerations</h2>
                    <p className="text-muted-foreground mb-4">
                      Payday loans are designed for short-term financial needs only. They carry higher interest rates 
                      than traditional loans and should be repaid on time to avoid additional fees and charges.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• APRs for payday loans typically range from 200% to 1386%</li>
                      <li>• Only borrow what you can afford to repay</li>
                      <li>• Consider alternatives if you need long-term financing</li>
                      <li>• Late payments may result in additional fees</li>
                    </ul>
                  </div>
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
              Apply now and get matched with lenders offering competitive payday loan rates.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Apply for a Payday Loan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PaydayLoans;