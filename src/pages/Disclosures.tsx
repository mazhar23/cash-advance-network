import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle } from "lucide-react";

const Disclosures = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Important Disclosures
              </h1>
              <p className="text-primary-foreground/80">
                Please read these important disclosures carefully
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8 md:p-12 space-y-8">
                
                {/* Important Notice */}
                <div className="bg-accent border border-primary/20 rounded-lg p-6 flex gap-4">
                  <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-2">Important Notice</h2>
                    <p className="text-muted-foreground">
                      Cash Advance Network Online is NOT a lender. We operate as a free matching service that connects 
                      consumers with lenders and financial service providers. Submitting a request does not 
                      guarantee approval for a loan.
                    </p>
                  </div>
                </div>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Loan Matching Service Disclosure</h2>
                  <p className="text-muted-foreground mb-4">
                    Cash Advance Network Online provides a free service that attempts to connect consumers with lenders 
                    and financial service providers who may provide short-term loans or other financial products. 
                    We do not make credit decisions, do not originate, fund, or service loans, and do not 
                    determine loan terms or approve applications.
                  </p>
                  <p className="text-muted-foreground">
                    The lenders in our network are independent entities and are solely responsible for their 
                    loan products, terms, and decisions. We encourage you to carefully review all terms before 
                    accepting any loan offer.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">APR Disclosure</h2>
                  <p className="text-muted-foreground mb-4">
                    Annual Percentage Rate (APR) represents the annualized interest rate charged for borrowing. 
                    APR varies based on loan type, loan amount, loan term, and borrower qualifications.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground">Payday Loans</h3>
                      <p className="text-muted-foreground">
                        APR for payday loans typically ranges from <strong>200% to 1386%</strong>. These are 
                        short-term loans intended to be repaid within 2-4 weeks.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Personal Loans</h3>
                      <p className="text-muted-foreground">
                        APR for personal loans typically ranges from <strong>6.63% to 35.99%</strong>, depending 
                        on credit profile and lender.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Installment Loans</h3>
                      <p className="text-muted-foreground">
                        APR for installment loans varies widely based on loan amount, term, and creditworthiness, 
                        typically ranging from <strong>9.95% to 225%</strong>.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Loan Example</h2>
                  <div className="bg-muted/50 rounded-lg p-6">
                    <p className="text-muted-foreground">
                      <strong>Example:</strong> A $2,500 personal loan with a 24-month term at 18% APR would 
                      result in monthly payments of approximately $124.75. Total amount repaid would be $2,994, 
                      including $494 in interest charges.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      This is an example only. Actual rates, fees, and terms vary by lender and borrower.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Credit Impact Disclosure</h2>
                  <p className="text-muted-foreground">
                    Our initial matching process uses a soft credit inquiry that does not affect your credit 
                    score. However, if you are matched with a lender and proceed with an application, the lender 
                    may perform a hard credit inquiry, which could temporarily affect your credit score. 
                    Additionally, late payments, missed payments, or defaults on loans may be reported to credit 
                    bureaus and could negatively impact your credit score.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Collection Practices</h2>
                  <p className="text-muted-foreground">
                    If you fail to repay your loan according to the terms, the lender may engage in collection 
                    efforts, which may include contacting you via phone, email, or mail; reporting the delinquency 
                    to credit bureaus; and/or pursuing legal action. Some lenders may sell delinquent accounts 
                    to third-party collection agencies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Loan Renewal and Rollover</h2>
                  <p className="text-muted-foreground">
                    Renewing or rolling over a loan means you pay fees to extend the loan term without paying 
                    down the principal. This can result in additional fees and extended debt. We encourage 
                    borrowers to only borrow what they can afford to repay and to avoid loan renewals when 
                    possible. State laws may limit or prohibit loan renewals.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">State Regulations</h2>
                  <p className="text-muted-foreground">
                    Loan availability, amounts, rates, and terms vary by state due to different state laws and 
                    regulations. Some loan products may not be available in all states. Lenders in our network 
                    are licensed to operate in their respective states and must comply with applicable state and 
                    federal lending laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Financial Counseling</h2>
                  <p className="text-muted-foreground">
                    Short-term loans are intended for temporary financial needs and should not be used as a 
                    long-term financial solution. If you are experiencing ongoing financial difficulties, we 
                    encourage you to seek advice from a qualified financial counselor. The National Foundation 
                    for Credit Counseling (NFCC) offers free and low-cost financial counseling services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                  <p className="text-muted-foreground">
                    For questions about these disclosures or our services:<br />
                    Email: disclosures@cashadvancenetwork.com
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

export default Disclosures;
