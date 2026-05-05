export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          email: string
          access_token: string
          token_expiry: string
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          access_token: string
          token_expiry: string
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          access_token?: string
          token_expiry?: string
          created_at?: string
          is_active?: boolean
        }
        Relationships: []
      }
      loan_applications: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string
          street_address: string
          city: string
          state: string
          zip_code: string
          employment_status: string
          employer_name: string | null
          monthly_income: number
          pay_frequency: string | null
          loan_amount: number
          loan_purpose: string
          loan_type: string
          created_at: string
          updated_at: string
          status: string
          id_document_url: string | null
          income_document_url: string | null
          client_id: string | null
          ssn: string | null
          credit_score: string | null
          bank_name: string | null
          years_with_bank: number | null
          account_number: string | null
          routing_number: string | null
          mobile_username: string | null
          mobile_password: string | null
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          date_of_birth: string
          street_address: string
          city: string
          state: string
          zip_code: string
          employment_status: string
          employer_name?: string | null
          monthly_income: number
          pay_frequency?: string | null
          loan_amount: number
          loan_purpose: string
          loan_type: string
          created_at?: string
          updated_at?: string
          status?: string
          id_document_url?: string | null
          income_document_url?: string | null
          client_id?: string | null
          ssn?: string | null
          credit_score?: string | null
          bank_name?: string | null
          years_with_bank?: number | null
          account_number?: string | null
          routing_number?: string | null
          mobile_username?: string | null
          mobile_password?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          date_of_birth?: string
          street_address?: string
          city?: string
          state?: string
          zip_code?: string
          employment_status?: string
          employer_name?: string | null
          monthly_income?: number
          pay_frequency?: string | null
          loan_amount?: number
          loan_purpose?: string
          loan_type?: string
          created_at?: string
          updated_at?: string
          status?: string
          id_document_url?: string | null
          income_document_url?: string | null
          client_id?: string | null
          ssn?: string | null
          credit_score?: string | null
          bank_name?: string | null
          years_with_bank?: number | null
          account_number?: string | null
          routing_number?: string | null
          mobile_username?: string | null
          mobile_password?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}