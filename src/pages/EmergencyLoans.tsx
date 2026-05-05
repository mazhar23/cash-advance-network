import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Zap, Car, Stethoscope, Home, Wrench, CreditCard } from "lucide-react";

const EmergencyLoans = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Emergency Loans
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
                When unexpected expenses arise, get fast emergency cash. Apply in minutes and 
                get funds as soon as the next business day.
              </p>
              <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
                Get Emergency Cash Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Common Emergencies */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Common Emergency Expenses We Help With</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Car className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Car Repairs</h3>
                    <p className="text-sm text-muted-foreground">Unexpected breakdowns, accidents, or maintenance</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Stethoscope className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Medical Bills</h3>
                    <p className="text-sm text-muted-foreground">Hospital visits, prescriptions, dental work</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Home className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Home Repairs</h3>
                    <p className="text-sm text-muted-foreground">Plumbing, HVAC, appliance failures</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Utility Bills</h3>
                    <p className="text-sm text-muted-foreground">Avoid shutoffs and late fees</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Wrench className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Emergency Travel</h3>
                    <p className="text-sm text-muted-foreground">Family emergencies, unexpected trips</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <CreditCard className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Bill Payments</h3>
                    <p className="text-sm text-muted-foreground">Cover expenses between paychecks</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* About Emergency Loans */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">Fast Cash When You Need It Most</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Emergency loans are designed for urgent situations when you need money quickly. Whether it's a 
                car repair that can't wait, a medical bill that needs to be paid, or any unexpected expense, 
                emergency loans provide fast access to cash without the lengthy approval process of traditional loans.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                At Cash Advance America, we understand that emergencies don't wait. That's why our application 
                process takes just minutes, and many of our customers receive funds as soon as the next business day.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose Emergency Loans from Cash Advance America?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Apply 24/7 from anywhere",
                  "Decisions in minutes",
                  "Funds as fast as next business day",
                  "All credit types considered",
                  "No collateral required",
                  "Simple online application",
                  "Secure and confidential",
                  "Trusted lender network"
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

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Don't Let an Emergency Wait</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Apply now and get the emergency funds you need fast.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Apply for Emergency Loan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmergencyLoans;