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