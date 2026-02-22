import { CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SuccessStepProps {
  applicationId: string;
}

const SuccessStep = ({ applicationId }: SuccessStepProps) => {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Application Submitted Successfully!
      </h2>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Thank you for your loan application. Our team will review your information and contact you within 24 hours.
      </p>

      <div className="bg-muted/50 rounded-lg p-4 mb-8 max-w-sm mx-auto">
        <p className="text-sm text-muted-foreground mb-1">Application Reference Number</p>
        <p className="font-mono font-bold text-lg text-foreground">
          {applicationId.slice(0, 8).toUpperCase()}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="font-semibold text-foreground">What happens next?</h3>
        <div className="grid gap-4 max-w-md mx-auto text-left">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              1
            </div>
            <p className="text-sm text-muted-foreground">
              Our team reviews your application within 24 hours
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              2
            </div>
            <p className="text-sm text-muted-foreground">
              We'll contact you to discuss loan options and terms
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              3
            </div>
            <p className="text-sm text-muted-foreground">
              Once approved, funds can be deposited within 24-48 hours
            </p>
          </div>
        </div>
      </div>


      <Link to="/">
        <Button variant="outline" size="lg">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default SuccessStep;

