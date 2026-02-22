import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Shield, ThumbsUp, AlertCircle, TrendingUp } from "lucide-react";

const BadCreditLoans = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Bad Credit Loans
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                Don't let your credit score hold you back. We work with lenders who specialize in 
                helping borrowers with less-than-perfect credit.
              </p>
              <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
                Apply Now - All Credit Welcome
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">We Consider All Credit Types</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Bad Credit</h3>
                    <p className="text-sm text-muted-foreground">Scores below 580 considered</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No Credit</h3>
                    <p className="text-sm text-muted-foreground">Limited credit history OK</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <ThumbsUp className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Fair Credit</h3>
                    <p className="text-sm text-muted-foreground">Rebuilding credit welcome</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Improving Credit</h3>
                    <p className="text-sm text-muted-foreground">Build credit with payments</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* About Bad Credit Loans */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">Getting a Loan with Bad Credit</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Having bad credit doesn't mean you can't get a loan. While traditional banks may turn you away, 
                many alternative lenders specialize in working with borrowers who have credit challenges. These 
                lenders look at the bigger picture—including your income, employment, and ability to repay.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                At Cash Advance Network Online, we connect you with lenders who understand that life happens. 
                Medical emergencies, job loss, divorce, or other circumstances can impact your credit, 
                but they shouldn't prevent you from accessing the funds you need.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-6">What Lenders Consider Beyond Credit Score</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Steady income and employment",
                  "Bank account history",
                  "Debt-to-income ratio",
                  "Repayment ability",
                  "Recent payment history",
                  "Time at current job",
                  "Monthly expenses",
                  "Loan purpose"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">Tips for Getting Approved with Bad Credit</h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Apply with Accurate Information</h3>
                    <p className="text-muted-foreground">Provide correct details about your income and employment. Inaccurate information can result in denial.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Only Borrow What You Need</h3>
                    <p className="text-muted-foreground">Requesting a smaller loan amount can improve your chances of approval and keep payments manageable.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Show Stable Income</h3>
                    <p className="text-muted-foreground">Lenders want to see that you have reliable income to repay the loan. Steady employment helps.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Pay On Time to Rebuild Credit</h3>
                    <p className="text-muted-foreground">Making on-time payments on your loan can help improve your credit score over time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Your Credit Score Doesn't Define You</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Apply now and get matched with lenders who work with all credit types.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Apply for a Bad Credit Loan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BadCreditLoans;
