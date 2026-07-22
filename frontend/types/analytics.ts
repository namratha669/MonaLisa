export interface DashboardStats {
  total_companies: number;
  confirmed_sponsors: number;
  pending_sponsors: number;
  total_sponsorship_value: number;
  highest_offer: number;
}

export interface StatusDistributionItem {
  status: string;
  count: number;
}