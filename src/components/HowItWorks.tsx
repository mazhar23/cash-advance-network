import { FileText, Search, CheckCircle, Banknote } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Complete our streamlined online application",
    description: "with your personal, employment, and financial information for a quick and easy process.",
  },
  {
    icon: Search,
    number: "02",
    title: "Meet Your Loan Specialist",
    description: "Upon approval, our loan specialist will contact you to verify your identity, income, employment, and any applicable collateral.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Sign and Receive Funds",
    description: "After reviewing and accepting your loan terms, simply sign your contract and receive your funds quickly and easily.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/30" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Simple Process</span>
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How to Get Your Loan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting a cash advance or personal loan has never been easier. Follow these four simple steps 
            and get the money you need fast.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4 mt-2">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;