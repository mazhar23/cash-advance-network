import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin } from "lucide-react";

const LendingLicenses = () => {
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Lending Licenses & Compliance
              </h1>
              <p className="text-primary-foreground/80">
                Information about our lender network and regulatory compliance
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to Compliance</h2>
                  <p className="text-muted-foreground mb-4">
                    Cash Advance America Online is committed to connecting consumers only with licensed, compliant 
                    lenders. All lenders in our network are required to maintain appropriate state licenses 
                    and comply with all applicable federal and state lending laws.
                  </p>
                  <p className="text-muted-foreground">
                    As a matching service, we do not directly lend money or make credit decisions. However, 
                    we carefully vet our lending partners to ensure they operate in accordance with the law 
                    and treat consumers fairly.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Lender Licensing Requirements</h2>
                  <p className="text-muted-foreground mb-6">
                    Lenders in our network are required to:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Maintain all required state lending licenses",
                      "Comply with state interest rate caps and fee limits",
                      "Provide clear and accurate disclosures to borrowers",
                      "Follow fair lending practices",
                      "Adhere to federal regulations including TILA and ECOA",
                      "Maintain proper data security measures",
                      "Respond to consumer complaints promptly"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Federal Compliance</h2>
                  <p className="text-muted-foreground mb-4">
                    Our lending partners comply with key federal regulations including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Truth in Lending Act (TILA)</h3>
                      <p className="text-sm text-muted-foreground">
                        Requires clear disclosure of loan terms, APR, and total costs before you commit.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Equal Credit Opportunity Act (ECOA)</h3>
                      <p className="text-sm text-muted-foreground">
                        Prohibits discrimination in lending based on race, color, religion, national origin, sex, marital status, or age.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Fair Debt Collection Practices Act</h3>
                      <p className="text-sm text-muted-foreground">
                        Protects consumers from abusive, unfair, or deceptive debt collection practices.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Gramm-Leach-Bliley Act</h3>
                      <p className="text-sm text-muted-foreground">
                        Requires financial institutions to protect consumer financial information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    States Served
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Our lender network serves consumers across the United States. Loan availability, amounts, 
                    and terms vary by state due to differing regulations:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {states.map((state) => (
                      <div key={state} className="text-sm text-muted-foreground py-1 px-2 bg-muted/30 rounded">
                        {state}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Some loan products may not be available in all states. State-specific terms and restrictions apply.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Report a Concern</h2>
                  <p className="text-muted-foreground mb-4">
                    If you believe a lender in our network has violated lending laws or treated you unfairly, 
                    please contact us immediately. You may also file complaints with:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Consumer Financial Protection Bureau (CFPB): consumerfinance.gov</li>
                    <li>• Your state's Attorney General office</li>
                    <li>• Your state's banking or financial services regulator</li>
                    <li>• Federal Trade Commission (FTC): ftc.gov</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Contact us: compliance@cashadvanceamerica.online
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LendingLicenses;