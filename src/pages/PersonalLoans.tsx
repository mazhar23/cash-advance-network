import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, DollarSign, Calendar, Percent, Shield } from "lucide-react";

const PersonalLoans = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Unsecured Personal Loans
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                Borrow up to $35,000 with no collateral required. Fixed rates, predictable payments, 
                and flexible terms to fit your budget.
              </p>
              <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
                Check Your Rate
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Our Personal Loans?</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Up to $35,000</h3>
                    <p className="text-sm text-muted-foreground">Borrow what you need for any purpose</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Percent className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Fixed Rates</h3>
                    <p className="text-sm text-muted-foreground">Know exactly what you'll pay each month</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Flexible Terms</h3>
                    <p className="text-sm text-muted-foreground">Choose repayment terms up to 84 months</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No Collateral</h3>
                    <p className="text-sm text-muted-foreground">Unsecured loans - no assets at risk</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What Are Personal Loans */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">What is a Personal Loan?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A personal loan is an unsecured loan that allows you to borrow a lump sum of money and repay it 
                over time with fixed monthly payments. Unlike secured loans, personal loans don't require collateral 
                like your home or car, making them accessible to more borrowers.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Personal loans can be used for almost any purpose, including home improvements, medical expenses, 
                wedding costs, vacations, major purchases, or consolidating high-interest debt.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-6">Common Uses for Personal Loans</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Home improvements and repairs",
                  "Medical bills and healthcare expenses",
                  "Debt consolidation",
                  "Wedding and event financing",
                  "Major purchases",
                  "Moving expenses",
                  "Emergency expenses",
                  "Vacation financing"
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

        {/* Loan Details */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">Personal Loan Details</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Loan Amounts</h3>
                    <p className="text-3xl font-bold text-primary mb-2">$1,000 - $35,000</p>
                    <p className="text-sm text-muted-foreground">Based on creditworthiness and income</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">APR Range</h3>
                    <p className="text-3xl font-bold text-primary mb-2">6.63% - 35.99%</p>
                    <p className="text-sm text-muted-foreground">Fixed rates based on credit profile</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-t border-border">
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Repayment Terms</h3>
                    <p className="text-3xl font-bold text-primary mb-2">12 - 84 Months</p>
                    <p className="text-sm text-muted-foreground">Choose terms that fit your budget</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Funding Time</h3>
                    <p className="text-3xl font-bold text-primary mb-2">1-3 Business Days</p>
                    <p className="text-sm text-muted-foreground">Fast funding after approval</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Get Your Personalized Rate</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Check your rate in minutes with no impact to your credit score.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Apply for a Personal Loan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PersonalLoans;
