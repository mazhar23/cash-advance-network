import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressIndicator from "./ProgressIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import AddressStep from "./AddressStep";
import EmploymentStep from "./EmploymentStep";
import LoanDetailsStep from "./LoanDetailsStep";
import DocumentsStep from "./DocumentsStep";
import SuccessStep from "./SuccessStep";
import {
  PersonalInfoData,
  AddressData,
  EmploymentData,
  LoanDetailsData,
  DocumentsData,
  FullApplicationData,
} from "./types";

const STEPS = ["Personal Info", "Address", "Employment", "Loan Details", "Documents"];

const LoanApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FullApplicationData>>({});
  const { toast } = useToast();

  const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleAddressSubmit = (data: AddressData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleEmploymentSubmit = (data: EmploymentData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
  };

  const handleLoanDetailsSubmit = (data: LoanDetailsData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(5);
  };

  const uploadFile = async (file: File, applicationId: string, type: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}/${type}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('loan-documents')
      .upload(fileName, file);
    
    if (error) {
      console.error(`Error uploading ${type}:`, error);
      return null;
    }
    
    return fileName;
  };

  const handleDocumentsSubmit = async (data: DocumentsData) => {
    setIsSubmitting(true);
    const fullData = { ...formData, ...data } as FullApplicationData;

    try {
      // First create the application record
      const { data: result, error } = await supabase
        .from("loan_applications")
        .insert({
          first_name: fullData.first_name,
          last_name: fullData.last_name,
          email: fullData.email,
          phone: fullData.phone,
          date_of_birth: format(fullData.date_of_birth, "yyyy-MM-dd"),
          street_address: fullData.street_address,
          city: fullData.city,
          state: fullData.state,
          zip_code: fullData.zip_code,
          monthly_income: fullData.monthly_income,
          pay_frequency: fullData.pay_frequency,
          loan_amount: fullData.loan_amount,
          loan_purpose: fullData.loan_purpose,
          loan_type: fullData.loan_type,
        })
        .select("id")
        .single();

      if (error) throw error;

      // Upload documents
      const [idDocUrl, incomeDocUrl] = await Promise.all([
        uploadFile(fullData.id_document, result.id, 'id-document'),
        uploadFile(fullData.income_document, result.id, 'income-document'),
      ]);

      // Update application with document URLs
      if (idDocUrl || incomeDocUrl) {
        await supabase
          .from("loan_applications")
          .update({
            id_document_url: idDocUrl,
            income_document_url: incomeDocUrl,
          })
          .eq("id", result.id);
      }

      setApplicationId(result.id);
      setCurrentStep(6);
      toast({
        title: "Application Submitted!",
        description: "We'll be in touch within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  if (currentStep === 6 && applicationId) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <SuccessStep applicationId={applicationId} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Loan Application</CardTitle>
        <CardDescription>
          Complete the form below to apply for a loan. It only takes a few minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={5}
          steps={STEPS}
        />

        {currentStep === 1 && (
          <PersonalInfoStep data={formData} onNext={handlePersonalInfoSubmit} />
        )}
        {currentStep === 2 && (
          <AddressStep data={formData} onNext={handleAddressSubmit} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <EmploymentStep data={formData} onNext={handleEmploymentSubmit} onBack={handleBack} />
        )}
        {currentStep === 4 && (
          <LoanDetailsStep
            data={formData}
            onNext={handleLoanDetailsSubmit}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <DocumentsStep
            data={formData}
            onSubmit={handleDocumentsSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LoanApplicationForm;

