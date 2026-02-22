import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, RefreshCw, TrendingDown, CreditCard, Calculator } from "lucide-react";

const DebtConsolidation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Debt Consolidation Loans
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                Combine multiple debts into one simple monthly payment. Lower your interest rates 
                and get out of debt faster.
              </p>
              <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
                Start Consolidating Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Benefits of Debt Consolidation</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <RefreshCw className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">One Payment</h3>
                    <p className="text-sm text-muted-foreground">Simplify your finances with a single monthly payment</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <TrendingDown className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Lower Rates</h3>
                    <p className="text-sm text-muted-foreground">Potentially reduce your overall interest rate</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <CreditCard className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Pay Off Faster</h3>
                    <p className="text-sm text-muted-foreground">Clear your debt with a structured repayment plan</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Calculator className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Fixed Payments</h3>
                    <p className="text-sm text-muted-foreground">Know exactly what you owe each month</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What is Debt Consolidation */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">What is Debt Consolidation?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Debt consolidation is the process of combining multiple debts—such as credit cards, payday loans, 
                medical bills, and other unsecured debts—into a single loan with one monthly payment. This strategy 
                can help simplify your finances and potentially save you money on interest.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Instead of juggling multiple due dates and varying interest rates, you make one payment to one 
                lender each month. Many borrowers find this easier to manage and are able to pay off their debt 
                faster with a structured repayment plan.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-6">Types of Debt You Can Consolidate</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Credit card balances",
                  "Payday loans",
                  "Medical bills",
                  "Personal loans",
                  "Store credit cards",
                  "Utility bills",
                  "Collection accounts",
                  "Other unsecured debts"
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

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How Debt Consolidation Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Add Up Your Debts</h3>
                    <p className="text-muted-foreground">Calculate the total amount you owe across all your debts, including credit cards, loans, and other bills.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Apply for a Consolidation Loan</h3>
                    <p className="text-muted-foreground">We match you with lenders offering competitive rates for your debt consolidation needs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Pay Off Your Existing Debts</h3>
                    <p className="text-muted-foreground">Use the loan funds to pay off your creditors, eliminating multiple payment obligations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Make One Monthly Payment</h3>
                    <p className="text-muted-foreground">Enjoy the simplicity of a single monthly payment with a fixed rate and predictable payoff date.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Break Free from Debt</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Take the first step toward financial freedom. Get matched with debt consolidation options today.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Get Your Consolidation Quote
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DebtConsolidation;
