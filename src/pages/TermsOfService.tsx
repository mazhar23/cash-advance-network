import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-primary-foreground/80">
                Last updated: January 1, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8 md:p-12 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing or using Cash Advance Network Online's website and services, you agree to be bound 
                    by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Description of Service</h2>
                  <p className="text-muted-foreground mb-4">
                    Cash Advance Network Online operates as a loan matching service. We are NOT a lender. Our service 
                    connects consumers seeking personal loans, payday loans, or other financial products with a 
                    network of third-party lenders and financial service providers.
                  </p>
                  <p className="text-muted-foreground">
                    We do not make credit decisions, approve or deny loan applications, or determine loan amounts, 
                    interest rates, or repayment terms. These decisions are made solely by the lenders in our network.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility</h2>
                  <p className="text-muted-foreground mb-4">To use our services, you must:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Be at least 18 years of age</li>
                    <li>Be a U.S. citizen or permanent resident</li>
                    <li>Have a valid Social Security Number</li>
                    <li>Have an active checking account</li>
                    <li>Have a regular source of income</li>
                    <li>Provide accurate and truthful information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">User Responsibilities</h2>
                  <p className="text-muted-foreground mb-4">By using our service, you agree to:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Not submit false or misleading information</li>
                    <li>Not use the service for any unlawful purpose</li>
                    <li>Review all loan terms carefully before accepting any offer</li>
                    <li>Repay any loans according to the agreed terms</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">No Guarantee of Loan Approval</h2>
                  <p className="text-muted-foreground">
                    Submitting an application does not guarantee loan approval. Approval decisions are made 
                    by lenders based on their own criteria. We cannot guarantee that you will receive any 
                    loan offers or that offers will meet your specific needs.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Lenders</h2>
                  <p className="text-muted-foreground">
                    If you are matched with a lender, you will be subject to that lender's terms, conditions, 
                    and privacy policy. We are not responsible for the actions, products, or content of any 
                    third-party lender. Any loan agreement is solely between you and the lender.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Fees</h2>
                  <p className="text-muted-foreground">
                    Cash Advance Network Online does not charge any fees to consumers for using our matching service. 
                    However, lenders may charge fees in connection with loans they offer. All fees will be 
                    disclosed by the lender before you accept any loan.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground">
                    OUR SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
                    EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, Cash Advance Network ONLINE SHALL NOT BE LIABLE FOR ANY 
                    INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE 
                    OF OUR SERVICE.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Indemnification</h2>
                  <p className="text-muted-foreground">
                    You agree to indemnify and hold harmless Cash Advance Network Online and its affiliates from any 
                    claims, damages, or expenses arising from your use of our service or violation of these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
                  <p className="text-muted-foreground">
                    These Terms of Service shall be governed by and construed in accordance with the laws of 
                    the State of Delaware, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting. Your continued use of the service after changes are posted 
                    constitutes acceptance of the modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms of Service, contact us at:<br />
                    Email: legal@cashadvancenetwork.com
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
