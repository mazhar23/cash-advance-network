import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Clock, Star } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const HeroSection = ({ client }: { client?: any }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleApplyNow = () => {
    const token = searchParams.get('token');
    if (token) {
      navigate(`/standalone-apply?token=${token}`);
    } else {
      // For public visitors without token, redirect to standalone page
      navigate('/standalone-apply');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-16 md:py-24 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-background.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/30 to-secondary/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Trusted by 500,000+ Americans</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Get up to $10,000 with a low, fixed rate loan
          </h1>

          {/* Subheadline */}
          <div className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            <p>
              <span style={{ fontSize: '24px', color: '#0000ff', borderRadius: '6px', padding: '5px 5px' }}>✔</span>
              Affordable monthly payments
              <br />
              <span style={{ fontSize: '24px', color: '#0000ff', borderRadius: '6px', padding: '5px 5px' }}>✔</span>
              No prepayments fees with affiliated banks
              <br />
              <span style={{ fontSize: '24px', color: '#0000ff', borderRadius: '6px', padding: '5px 5px' }}>✔</span>
              Fast Funding
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              onClick={handleApplyNow}
              variant="hero"
              size="xl"
              className="bg-card text-primary hover:bg-card/90"
            >
              Apply Now - It's Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleApplyNow}
              variant="heroOutline"
              size="xl"
            >
              Check Your Rate
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-medium">No Credit Impact</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <Clock className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-medium">Same-Day Approval</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
              <Shield className="h-5 w-5 text-primary-foreground" />
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-primary-foreground text-sm">21,532 Reviews</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/consumer-affairs-logo.jpg"
                alt="Consumer Affairs"
                className="h-16 w-auto mb-2"
              />
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-primary-foreground text-sm">21,532 Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;