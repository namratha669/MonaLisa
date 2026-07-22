// This mirrors CompanyStatus enum from your backend models/company.py exactly.
// Keeping the string values identical is critical — these are compared
// directly against what the API returns.
export type CompanyStatus =
  | "not_contacted"
  | "negotiation"
  | "meeting_scheduled"
  | "confirmed"
  | "follow_up_required"
  | "rejected";

// Mirrors your CompanyOut Pydantic schema field-for-field.
export interface Company {
  id: number;
  name: string;
  person_in_charge: string;
  category: string | null;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  status: CompanyStatus;
  offer_amount: number;
  priority: string | null;
  notes: string | null;
  meeting_date: string | null;   // dates come from JSON as ISO strings, not Date objects
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
}

// Mirrors CompanyCreate — what we send when adding a new company.
export interface CompanyCreate {
  name: string;
  person_in_charge: string;
  category?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  status?: CompanyStatus;
  offer_amount?: number;
  priority?: string;
  notes?: string;
  meeting_date?: string;
  follow_up_date?: string;
}

// Mirrors CompanyUpdate — every field optional, for partial edits.
export type CompanyUpdate = Partial<CompanyCreate>;