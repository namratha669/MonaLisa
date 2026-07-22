export interface ConflictCompany {
  company_id: number;
  company_name: string;
  offer_amount: number;
  other_items: string[];
}

export interface Conflict {
  item_name: string;
  companies: ConflictCompany[];
}