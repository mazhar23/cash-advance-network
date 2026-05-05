import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a payday loan and how does it work?",
    answer: "A payday loan is a short-term, small-dollar loan typically due on your next payday. You borrow a set amount (usually $100-$1,500), and repay it plus fees when you receive your next paycheck. These loans are designed for emergency expenses and short-term financial gaps. At Cash Advance America Online, we connect you with lenders offering competitive rates and flexible terms.",
  },
  {
    question: "Can I get a loan with bad credit or no credit?",
    answer: "Yes! We work with borrowers of all credit types, including those with bad credit, poor credit, or no credit history. Our network of lenders looks beyond just your credit score, considering factors like income, employment history, and banking activity. Many of our customers with less-than-perfect credit are approved every day.",
  },
  {
    question: "How fast can I get my money after approval?",
    answer: "Most approved borrowers receive their funds as soon as the next business day. Some lenders in our network even offer same-day funding options. The exact timing depends on your bank, the time of approval, and the lender you're matched with. Applying early in the day on a business day typically results in faster funding.",
  },
  {
    question: "What documents do I need to apply for a loan?",
    answer: "Our online application is simple and requires minimal documentation. You'll need: a valid government-issued ID, proof of regular income (pay stubs or bank statements), an active checking account, and a working phone number and email. Most applications can be completed in under 5 minutes.",
  },
  {
    question: "What's the difference between a payday loan and a personal loan?",
    answer: "Payday loans are short-term (typically 2-4 weeks) for smaller amounts ($100-$1,500), while personal loans offer larger amounts ($1,000-$35,000) with longer repayment terms (months to years). Personal loans usually have lower interest rates but may have stricter credit requirements. We can help you find the right option based on your needs and qualifications.",
  },
  {
    question: "How does debt consolidation work?",
    answer: "Debt consolidation combines multiple debts (credit cards, payday loans, medical bills) into a single loan with one monthly payment, often at a lower interest rate. This simplifies your finances, can reduce your monthly payments, and helps you pay off debt faster. Our debt consolidation solutions are designed to help you break the debt cycle and regain financial freedom.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. We use bank-level 256-bit SSL encryption to protect all data transmitted through our website. Your personal and financial information is never sold to third parties. We only share necessary information with potential lenders to process your application, and all our lending partners must meet strict privacy and security standards.",
  },
  {
    question: "Are there any hidden fees or prepayment penalties?",
    answer: "No hidden fees, ever. All loan terms, including interest rates, fees, and repayment schedules, are clearly disclosed before you accept any loan offer. Most of our lending partners do not charge prepayment penalties, meaning you can pay off your loan early and save on interest without any additional fees.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Got Questions?</span>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about payday loans, personal loans, and debt consolidation. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
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
      </div>
    </section>
  );
};

export default FAQSection;