import { Shield, Clock, Users, ThumbsUp, Lock } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Fast Approval",
    description: "Get approved in minutes, not days. Our streamlined process ensures quick decisions so you can access funds when you need them most.",
  },
  {
    icon: Shield,
    title: "Bad Credit OK",
    description: "We work with all credit types. Don't let past financial challenges stop you from getting the help you need today.",
  },
  {
    icon: Users,
    title: "Trusted Lenders",
    description: "Access our network of state-licensed, reputable lenders. All partners are vetted for fair practices and transparent terms.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your information is protected with bank-level 256-bit SSL encryption. We never sell your data to third parties.",
  },
  {
    icon: ThumbsUp,
    title: "No Hidden Fees",
    description: "Know exactly what you're paying. All fees and interest rates are disclosed upfront before you commit to any loan.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="benefits-heading">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Why Choose Us</span>
            <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              America's Trusted Source for <span className="text-primary">Fast Cash Loans</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Since 2010, Cash Advance America Online has helped over 500,000 Americans access the emergency funds they need. 
              We're committed to responsible lending, transparent pricing, and exceptional customer service.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-accent rounded-lg">
                <p className="text-2xl md:text-3xl font-bold text-primary">35K+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Loans Funded</p>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <p className="text-2xl md:text-3xl font-bold text-primary">500K+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <p className="text-2xl md:text-3xl font-bold text-primary">4.8/5</p>
                <p className="text-xs md:text-sm text-muted-foreground">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;