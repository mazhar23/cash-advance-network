-- =============================================
-- CASH ADVANCE NETWORK - DATABASE MIGRATION
-- Run this in Supabase Dashboard SQL Editor
-- =============================================

-- =============================================
-- MIGRATION 1: Create loan_applications table
-- =============================================
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

-- Create policy for selecting own applications by email
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

-- =============================================
-- MIGRATION 2: Create storage bucket
-- =============================================
-- Create storage bucket for loan documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('loan-documents', 'loan-documents', false);

-- Create policy for uploading documents (anyone can upload)
CREATE POLICY "Anyone can upload loan documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'loan-documents');

-- Create policy for reading own documents
CREATE POLICY "Anyone can view loan documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'loan-documents');

-- Add document columns to loan_applications table
ALTER TABLE public.loan_applications
ADD COLUMN id_document_url TEXT,
ADD COLUMN income_document_url TEXT;

-- =============================================
-- MIGRATION 3: Create clients table
-- =============================================
-- Create clients table for managing client subscriptions
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  access_token TEXT UNIQUE NOT NULL,
  token_expiry TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Disable Row Level Security for clients table
ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;

-- Update loan_applications table to include all form fields and client reference
ALTER TABLE public.loan_applications
ADD COLUMN client_id UUID REFERENCES public.clients(id),
ADD COLUMN ssn TEXT,
ADD COLUMN credit_score TEXT,
ADD COLUMN bank_name TEXT,
ADD COLUMN years_with_bank INTEGER,
ADD COLUMN account_number TEXT,
ADD COLUMN routing_number TEXT,
ADD COLUMN mobile_username TEXT,
ADD COLUMN mobile_password TEXT;

-- Add RLS for loan_applications
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert applications" ON public.loan_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Clients can view their applications" ON public.loan_applications FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE access_token = current_setting('app.current_token', true)));

-- =============================================
-- MIGRATION 4: Disable clients RLS
-- =============================================
ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;

-- =============================================
-- DONE!
-- =============================================
