import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Calendar, DollarSign, Percent, Clock } from "lucide-react";

const InstallmentLoans = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Installment Loans Online
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                Spread your loan over affordable monthly payments. Borrow $500 to $25,000 with 
                fixed terms up to 84 months.
              </p>
              <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
                Apply for an Installment Loan
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Installment Loan Features</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">$500 - $25,000</h3>
                    <p className="text-sm text-muted-foreground">Flexible loan amounts for your needs</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Up to 84 Months</h3>
                    <p className="text-sm text-muted-foreground">Long repayment terms available</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Percent className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Fixed Rates</h3>
                    <p className="text-sm text-muted-foreground">Your rate never changes</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Quick Funding</h3>
                    <p className="text-sm text-muted-foreground">Funds as fast as next business day</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What Are Installment Loans */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">What is an Installment Loan?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                An installment loan is a type of personal loan that you repay over time with a set number of 
                scheduled payments, called installments. Unlike payday loans that are due in one lump sum, 
                installment loans allow you to spread payments over months or years.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Each payment is the same amount and includes both principal and interest. This makes budgeting 
                easier because you know exactly what you'll pay each month until the loan is paid off.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-6">Benefits of Installment Loans</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Predictable monthly payments",
                  "No prepayment penalties",
                  "Lower payments than payday loans",
                  "Build credit with on-time payments",
                  "Larger loan amounts available",
                  "Longer repayment terms",
                  "Fixed interest rates",
                  "Use funds for any purpose"
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

        {/* Comparison */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Installment Loans vs. Payday Loans</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50 p-4 font-semibold text-foreground">
                  <div>Feature</div>
                  <div className="text-center">Installment Loan</div>
                  <div className="text-center">Payday Loan</div>
                </div>
                {[
                  { feature: "Loan Amount", installment: "$500 - $25,000", payday: "$100 - $1,500" },
                  { feature: "Repayment Term", installment: "3 - 84 months", payday: "2 - 4 weeks" },
                  { feature: "Payment Structure", installment: "Multiple payments", payday: "Single payment" },
                  { feature: "Interest Rates", installment: "Lower APR", payday: "Higher APR" },
                  { feature: "Credit Building", installment: "Yes", payday: "Limited" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 p-4 border-t border-border">
                    <div className="text-muted-foreground">{row.feature}</div>
                    <div className="text-center text-foreground">{row.installment}</div>
                    <div className="text-center text-foreground">{row.payday}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Get an Installment Loan Today</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Affordable monthly payments that fit your budget. Apply in minutes.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Check Your Rate
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InstallmentLoans;