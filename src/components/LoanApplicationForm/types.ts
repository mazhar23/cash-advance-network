import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$|^\d{10}$/, "Please enter a valid phone number"),
  date_of_birth: z.date({
    required_error: "Date of birth is required",
  }).refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18;
  }, "You must be at least 18 years old"),
});

export const addressSchema = z.object({
  street_address: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip_code: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
});

export const employmentSchema = z.object({
  monthly_income: z.number().min(500, "Monthly income must be at least $500"),
  pay_frequency: z.string().min(1, "Pay frequency is required"),
});

export const loanDetailsSchema = z.object({
  loan_amount: z.number().min(100, "Loan amount must be at least $100").max(50000, "Loan amount cannot exceed $50,000"),
  loan_purpose: z.string().min(1, "Loan purpose is required"),
  loan_type: z.string().min(1, "Loan type is required"),
});

export const documentsSchema = z.object({
  id_document: z.instanceof(File, { message: "ID document is required" }).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    "File size must be less than 10MB"
  ).refine(
    (file) => ["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(file.type),
    "File must be PDF, JPG, PNG, or WebP"
  ),
  income_document: z.instanceof(File, { message: "Income verification document is required" }).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    "File size must be less than 10MB"
  ).refine(
    (file) => ["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(file.type),
    "File must be PDF, JPG, PNG, or WebP"
  ),
});

export const fullApplicationSchema = personalInfoSchema
  .merge(addressSchema)
  .merge(employmentSchema)
  .merge(loanDetailsSchema)
  .merge(documentsSchema);

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type EmploymentData = z.infer<typeof employmentSchema>;
export type LoanDetailsData = z.infer<typeof loanDetailsSchema>;
export type DocumentsData = z.infer<typeof documentsSchema>;
export type FullApplicationData = z.infer<typeof fullApplicationSchema>;

