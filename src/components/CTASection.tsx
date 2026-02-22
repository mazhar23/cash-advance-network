import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CTASection = ({ client }: { client?: any }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleStartApplication = () => {
    const token = searchParams.get('token');
    if (token) {
      navigate(`/standalone-apply?token=${token}`);
    } else {
      navigate('/standalone-apply');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/95 to-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Get the Cash You Need?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Apply now in just 5 minutes. Get matched with top lenders and receive funds as fast as the next business day.
          </p>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
            <div className="flex items-center gap-2 text-primary-foreground">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Free to Apply</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">No Obligation</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Bad Credit OK</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Fast Decisions</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleStartApplication}
            variant="hero"
            size="xl"
            className="bg-card text-primary hover:bg-card/90 shadow-2xl"
          >
            Start Your Application
            <ArrowRight className="h-5 w-5" />
          </Button>

          <p className="mt-6 text-sm text-primary-foreground/60">
            By clicking "Start Your Application," you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
