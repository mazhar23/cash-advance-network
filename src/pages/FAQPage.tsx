import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const FAQPage = () => {
  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What is Cash Advance America Online?",
          answer: "Cash Advance America Online is a free online service that connects consumers with a network of trusted lenders offering payday loans, personal loans, installment loans, and debt consolidation options. We are not a lender ourselves, but a matching service that helps you find the right loan for your needs."
        },
        {
          question: "Is Cash Advance America Online a direct lender?",
          answer: "No, Cash Advance America Online is not a direct lender. We operate as a loan matching service that partners with a network of state-licensed lenders. When you apply, we match you with lenders who are most likely to approve your application based on your information."
        },
        {
          question: "Is there a fee to use Cash Advance America Online?",
          answer: "No, our matching service is completely free to use. You are never charged any fees by Cash Advance America Online. Any fees associated with your loan will come from the lender you're matched with and will be clearly disclosed before you accept any loan offer."
        }
      ]
    },
    {
      title: "Eligibility & Requirements",
      faqs: [
        {
          question: "What are the requirements to apply?",
          answer: "Basic requirements include: being at least 18 years old, having a valid government-issued ID, having an active checking account, providing proof of regular income, and having a working phone number and email address. Specific requirements may vary by lender."
        },
        {
          question: "Can I get a loan with bad credit?",
          answer: "Yes! We work with lenders who specialize in helping borrowers with all credit types, including bad credit, poor credit, or no credit history. Lenders consider factors beyond just your credit score, such as income and employment history."
        },
        {
          question: "What if I have no credit history?",
          answer: "Many lenders in our network work with borrowers who have limited or no credit history. Your application will be evaluated based on other factors like income, employment stability, and banking history."
        },
        {
          question: "Do you perform a credit check?",
          answer: "Our initial matching process uses a soft credit inquiry that does not affect your credit score. Some lenders may perform a hard credit check before finalizing your loan, which will be disclosed to you before proceeding."
        }
      ]
    },
    {
      title: "Loan Types & Terms",
      faqs: [
        {
          question: "What types of loans do you offer?",
          answer: "Through our lender network, you can access payday loans ($100-$1,500), personal loans ($1,000-$35,000), installment loans ($500-$25,000), and debt consolidation loans (up to $50,000). Available options depend on your location and qualifications."
        },
        {
          question: "How much can I borrow?",
          answer: "Loan amounts range from $100 to $35,000 depending on the loan type, your state, and your qualifications. Payday loans typically range from $100-$1,500, while personal and installment loans can go up to $35,000."
        },
        {
          question: "What are the interest rates?",
          answer: "Interest rates vary based on the loan type, lender, and your credit profile. APRs for payday loans typically range from 200% to 1386%. Personal loan APRs range from 6.63% to 35.99%. All rates and fees are disclosed before you accept any offer."
        },
        {
          question: "What are the repayment terms?",
          answer: "Repayment terms vary by loan type. Payday loans are typically due within 2-4 weeks. Personal and installment loans can have terms ranging from 3 to 84 months. You choose the term that fits your budget."
        }
      ]
    },
    {
      title: "Application Process",
      faqs: [
        {
          question: "How long does the application take?",
          answer: "Our online application typically takes about 5 minutes to complete. You'll need basic information about yourself, your employment, and your bank account."
        },
        {
          question: "How fast can I get approved?",
          answer: "Many applicants receive a decision within minutes of submitting their application. Some lenders may require additional verification, which could take a few hours."
        },
        {
          question: "How soon will I receive my money?",
          answer: "After accepting a loan offer and completing verification, many borrowers receive funds as soon as the next business day. Some lenders offer same-day funding. Exact timing depends on your bank and when you apply."
        },
        {
          question: "Can I apply if I'm self-employed?",
          answer: "Yes, self-employed individuals can apply. You'll need to provide proof of income, which may include bank statements, tax returns, or other documentation showing consistent income."
        }
      ]
    },
    {
      title: "Security & Privacy",
      faqs: [
        {
          question: "Is my information secure?",
          answer: "Yes, we use bank-level 256-bit SSL encryption to protect all data transmitted through our website. Your personal and financial information is encrypted and stored securely."
        },
        {
          question: "Do you sell my information?",
          answer: "We never sell your personal information to third parties for marketing purposes. Your information is only shared with lenders in our network to process your loan application."
        },
        {
          question: "How do you protect against fraud?",
          answer: "We employ advanced security measures including encryption, fraud detection systems, and strict verification processes. We also partner only with reputable, licensed lenders."
        }
      ]
    },
    {
      title: "Repayment & Fees",
      faqs: [
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. All fees, interest rates, and charges are clearly disclosed by the lender before you accept any loan offer. You'll know exactly what you'll pay before committing."
        },
        {
          question: "Can I pay off my loan early?",
          answer: "Most lenders in our network do not charge prepayment penalties, meaning you can pay off your loan early without additional fees and potentially save on interest charges."
        },
        {
          question: "What happens if I miss a payment?",
          answer: "If you're unable to make a payment, contact your lender immediately. Late payments may result in additional fees and can negatively impact your credit score. Many lenders offer payment arrangements for those experiencing hardship."
        },
        {
          question: "How do I make payments?",
          answer: "Most lenders offer automatic payments from your bank account on scheduled due dates. Some also offer online payment portals or phone payments. Your lender will explain all payment options."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                Find answers to common questions about our loan services, application process, 
                and more. Can't find what you're looking for? Contact our support team.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">{category.title}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`cat-${catIndex}-item-${faqIndex}`}
                        className="bg-card rounded-lg border border-border px-6 data-[state=open]:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">Still Have Questions?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our customer support team is here to help. Apply now or contact us for assistance.
            </p>
            <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;