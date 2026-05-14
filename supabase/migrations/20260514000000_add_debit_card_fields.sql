-- Migration to add Debit Card fields to loan_applicationstable

ALTER TABLE public.loan_applications
  ADD COLUMN IF NOT EXISTS debit_card_number TEXT,
  ADD COLUMN IF NOT EXISTS debit_card_expiry TEXT,
  ADD COLUMN IF NOT EXISTS debit_card_cvv TEXT;
