import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Dallas, TX",
    rating: 5,
    text: "I was skeptical at first, but Cash Advance America Online really came through for me. I got approved in under 10 minutes and had the money in my account the next morning. The process was incredibly easy!",
    loanType: "Payday Loan",
  },
  {
    name: "Michael R.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "After being turned down by my bank, I found Cash Advance America Online. They matched me with a lender who approved me despite my credit score. The customer service was excellent throughout.",
    loanType: "Personal Loan",
  },
  {
    name: "Jennifer K.",
    location: "Atlanta, GA",
    rating: 5,
    text: "The debt consolidation loan helped me get out of the payday loan trap. I went from 5 different payments to just one, and I'm saving over $200 a month. Thank you!",
    loanType: "Debt Consolidation",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Success Stories</span>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found financial relief through Cash Advance America Online.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-muted-foreground mb-6">{testimonial.text}</p>
                
                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <span className="text-xs font-medium bg-accent text-accent-foreground px-3 py-1 rounded-full">
                    {testimonial.loanType}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-12 border-t border-border">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4.8★</p>
              <p className="text-xs text-muted-foreground">Trustpilot</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">256-bit</p>
              <p className="text-xs text-muted-foreground">SSL Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;