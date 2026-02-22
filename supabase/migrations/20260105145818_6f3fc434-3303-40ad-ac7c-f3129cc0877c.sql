-- Create loan_applications table for collecting leads
CREATE TABLE public.loan_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Step 1: Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  -- Step 2: Address Information
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  -- Step 3: Employment Information
  employment_status TEXT NOT NULL,
  employer_name TEXT,
  monthly_income NUMERIC NOT NULL,
  pay_frequency TEXT NOT NULL,
  -- Step 4: Loan Details
  loan_amount NUMERIC NOT NULL,
  loan_purpose TEXT NOT NULL,
  loan_type TEXT NOT NULL,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting applications (anyone can submit)
CREATE POLICY "Anyone can submit loan applications" 
ON public.loan_applications 
FOR INSERT 
WITH CHECK (true);

-- Create policy for selecting own applications by email (optional for confirmation)
CREATE POLICY "Anyone can read applications" 
ON public.loan_applications 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_loan_applications_updated_at
BEFORE UPDATE ON public.loan_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();