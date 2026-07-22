import api from "./api";
import { DashboardStats, StatusDistributionItem } from "@/types/analytics";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await api.get<DashboardStats>("/analytics/dashboard");
  return res.data;
}

export async function getStatusDistribution(): Promise<StatusDistributionItem[]> {
  const res = await api.get<StatusDistributionItem[]>("/analytics/status-distribution");
  return res.data;
}