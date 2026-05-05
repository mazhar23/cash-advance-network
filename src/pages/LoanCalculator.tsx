import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Calculator, DollarSign, Calendar, Percent } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState([5000]);
  const [loanTerm, setLoanTerm] = useState([36]);
  const [interestRate, setInterestRate] = useState([15]);

  const calculations = useMemo(() => {
    const principal = loanAmount[0];
    const months = loanTerm[0];
    const annualRate = interestRate[0];
    const monthlyRate = annualRate / 100 / 12;

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest
    };
  }, [loanAmount, loanTerm, interestRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Loan Payment Calculator
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                Estimate your monthly payments and total loan cost. Adjust the sliders to see 
                how different loan amounts, terms, and rates affect your payments.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Controls */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Adjust Your Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Loan Amount */}
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          Loan Amount
                        </label>
                        <span className="text-lg font-bold text-primary">{formatCurrency(loanAmount[0])}</span>
                      </div>
                      <Slider
                        value={loanAmount}
                        onValueChange={setLoanAmount}
                        min={500}
                        max={50000}
                        step={500}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>$500</span>
                        <span>$50,000</span>
                      </div>
                    </div>

                    {/* Loan Term */}
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          Loan Term
                        </label>
                        <span className="text-lg font-bold text-primary">{loanTerm[0]} months</span>
                      </div>
                      <Slider
                        value={loanTerm}
                        onValueChange={setLoanTerm}
                        min={6}
                        max={84}
                        step={6}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>6 months</span>
                        <span>84 months</span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between mb-4">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Percent className="h-4 w-4 text-primary" />
                          Interest Rate (APR)
                        </label>
                        <span className="text-lg font-bold text-primary">{interestRate[0]}%</span>
                      </div>
                      <Slider
                        value={interestRate}
                        onValueChange={setInterestRate}
                        min={5}
                        max={36}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>5%</span>
                        <span>36%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <div className="space-y-6">
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-8 text-center">
                      <p className="text-sm opacity-80 mb-2">Estimated Monthly Payment</p>
                      <p className="text-4xl md:text-5xl font-bold">{formatCurrency(calculations.monthlyPayment)}</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-card border-border">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Total Payment</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(calculations.totalPayment)}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Total Interest</p>
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(calculations.totalInterest)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-muted/50 border-border">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4">Payment Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Principal Amount</span>
                          <span className="font-medium text-foreground">{formatCurrency(loanAmount[0])}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Interest</span>
                          <span className="font-medium text-foreground">{formatCurrency(calculations.totalInterest)}</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between">
                          <span className="font-semibold text-foreground">Total Cost of Loan</span>
                          <span className="font-bold text-primary">{formatCurrency(calculations.totalPayment)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button variant="default" size="lg" className="w-full">
                    Apply for This Loan Amount
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              This calculator provides estimates only and does not constitute a loan offer. Actual rates, terms, 
              and payments may vary based on your credit profile, loan type, and lender. Use this tool for 
              informational purposes to help plan your finances.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LoanCalculator;