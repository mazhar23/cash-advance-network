import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, CreditCard, RefreshCw, DollarSign, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Payday Loans",
    subtitle: "Fast Cash When You Need It",
    description: "Get quick payday loans from $100 to $1,500 with same-day approval. Perfect for emergency expenses, unexpected bills, or bridging the gap until your next paycheck.",
    features: ["Same-day funding available", "No credit check required", "Simple online application", "Flexible repayment terms"],
    amount: "$100 - $1,500",
    id: "payday-loans",
  },
  {
    icon: CreditCard,
    title: "Unsecured Personal Loans",
    subtitle: "No Collateral Required",
    description: "Access personal loans up to $35,000 without putting your assets at risk. Ideal for home improvements, medical bills, major purchases, or consolidating debt.",
    features: ["Loans up to $35,000", "Fixed monthly payments", "Competitive interest rates", "Bad credit considered"],
    amount: "$1,000 - $35,000",
    id: "personal-loans",
  },
  {
    icon: RefreshCw,
    title: "Debt Consolidation",
    subtitle: "Simplify Your Finances",
    description: "Combine multiple debts into one manageable monthly payment. Lower your interest rates and pay off debt faster with our debt consolidation solutions.",
    features: ["One simple payment", "Lower interest rates", "Reduce monthly payments", "Improve credit score"],
    amount: "Up to $50,000",
    id: "debt-consolidation",
  },
  {
    icon: DollarSign,
    title: "Installment Loans",
    subtitle: "Predictable Monthly Payments",
    description: "Spread your loan over fixed monthly installments that fit your budget. Know exactly what you'll pay each month with no surprises or hidden fees.",
    features: ["Fixed monthly payments", "Terms up to 84 months", "No prepayment penalties", "Quick funding"],
    amount: "$500 - $25,000",
    id: "installment-loans",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loan Solutions for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you need a quick cash advance or want to consolidate your debt, we have flexible loan options 
            designed to help you achieve your financial goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              id={service.id}
              className="group bg-card hover:shadow-xl transition-all duration-300 border-border overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-foreground mb-1">{service.title}</CardTitle>
                    <CardDescription className="text-primary font-medium">{service.subtitle}</CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <p className="text-lg font-bold text-primary">{service.amount}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;