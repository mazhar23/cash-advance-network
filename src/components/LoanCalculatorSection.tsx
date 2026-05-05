import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Calculator, DollarSign, Calendar, Percent } from "lucide-react";

const LoanCalculatorSection = () => {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loan Payment Calculator
            </h2>
            <p className="text-lg text-gray-600">
              Estimate your monthly payments and total loan cost. Adjust the sliders to see
              how different loan amounts, terms, and rates affect your payments.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <Card className="bg-white border-gray-200">
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
                    <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
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
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>$500</span>
                    <span>$50,000</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
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
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>6 months</span>
                    <span>84 months</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
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
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>5%</span>
                    <span>36%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-8 text-center">
                  <p className="text-sm opacity-80 mb-2">Estimated Monthly Payment</p>
                  <p className="text-4xl md:text-5xl font-bold">{formatCurrency(calculations.monthlyPayment)}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-500 mb-2">Total Payment</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(calculations.totalPayment)}</p>
                  </CardContent>
                </Card>
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-gray-500 mb-2">Total Interest</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(calculations.totalInterest)}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal Amount</span>
                      <span className="font-medium text-gray-900">{formatCurrency(loanAmount[0])}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-medium text-gray-900">{formatCurrency(calculations.totalInterest)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 flex justify-between">
                      <span className="font-semibold text-gray-900">Total Cost of Loan</span>
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

          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 max-w-3xl mx-auto">
              This calculator provides estimates only and does not constitute a loan offer. Actual rates, terms,
              and payments may vary based on your credit profile, loan type, and lender. Use this tool for
              informational purposes to help plan your finances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculatorSection;