import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PiggyBank, CreditCard, TrendingUp, Shield, Target, DollarSign } from "lucide-react";

const tips = [
  {
    icon: PiggyBank,
    title: "Build an Emergency Fund",
    description: "Aim to save 3-6 months of living expenses in an easily accessible account. Start small—even $500 can help cover unexpected car repairs or medical bills without needing a loan."
  },
  {
    icon: CreditCard,
    title: "Pay More Than the Minimum",
    description: "When possible, pay more than the minimum payment on credit cards and loans. This reduces interest charges and helps you pay off debt faster, saving you money in the long run."
  },
  {
    icon: TrendingUp,
    title: "Check Your Credit Report Regularly",
    description: "Review your credit report at least once a year for errors. You're entitled to free reports from each bureau annually. Disputing errors can improve your credit score."
  },
  {
    icon: Shield,
    title: "Avoid Borrowing More Than You Need",
    description: "Only borrow what you absolutely need and can afford to repay. Larger loan amounts mean more interest charges and longer repayment periods."
  },
  {
    icon: Target,
    title: "Create a Monthly Budget",
    description: "Track your income and expenses to understand where your money goes. Use the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment."
  },
  {
    icon: DollarSign,
    title: "Compare Loan Options",
    description: "Don't accept the first loan offer you receive. Compare rates, terms, and fees from multiple lenders to find the best deal for your situation."
  }
];

const strategies = [
  {
    title: "The Debt Avalanche Method",
    description: "Pay off debts starting with the highest interest rate first while making minimum payments on others. This method saves the most money on interest over time.",
    pros: ["Saves the most money", "Mathematically optimal", "Reduces total interest paid"],
    cons: ["May take longer to see progress", "Can feel discouraging initially"]
  },
  {
    title: "The Debt Snowball Method",
    description: "Pay off debts starting with the smallest balance first, regardless of interest rate. This builds momentum and motivation as you see debts disappear quickly.",
    pros: ["Quick wins boost motivation", "Simplifies finances faster", "Psychological benefits"],
    cons: ["May pay more interest", "Not mathematically optimal"]
  }
];

const FinancialTips = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Financial Tips & Advice
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                Smart money management strategies to help you build a stronger financial future 
                and make the most of your income.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Essential Money Tips</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tips.map((tip, index) => (
                  <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <tip.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-bold text-foreground">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Debt Repayment Strategies */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Debt Repayment Strategies</h2>
              <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
                Choose a debt repayment strategy that works for your personality and financial situation.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {strategies.map((strategy, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-foreground">{strategy.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{strategy.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Pros</h4>
                          <ul className="space-y-1">
                            {strategy.pros.map((pro, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary">✓</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-destructive mb-2">Cons</h4>
                          <ul className="space-y-1">
                            {strategy.cons.map((con, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-destructive">✗</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 50/30/20 Rule */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">The 50/30/20 Budget Rule</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold mb-2">50%</p>
                    <h3 className="text-xl font-semibold mb-2">Needs</h3>
                    <p className="text-sm opacity-80">Housing, utilities, groceries, insurance, minimum loan payments, transportation</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold mb-2">30%</p>
                    <h3 className="text-xl font-semibold mb-2">Wants</h3>
                    <p className="text-sm opacity-80">Dining out, entertainment, hobbies, subscriptions, shopping, travel</p>
                  </CardContent>
                </Card>
                <Card className="bg-accent">
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold text-primary mb-2">20%</p>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Savings & Debt</h3>
                    <p className="text-sm text-muted-foreground">Emergency fund, retirement, extra debt payments, investments</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Need Financial Help Now?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              If you're facing an unexpected expense, we can help you find a loan that fits your budget.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Check Loan Options
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FinancialTips;
