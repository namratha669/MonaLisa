import { CompanyStatus } from "@/types/company";

// Centralizing this means charts, pills, and badges all reference the SAME
// colors — if you ever tweak a status color, you change it once here instead
// of hunting through StatusPill, ItemPill, and every chart separately.
export const statusMeta: Record<CompanyStatus, { label: string; color: string }> = {
  not_contacted: { label: "Not Contacted", color: "#71717A" },
  negotiation: { label: "Negotiation", color: "#EAB308" },
  meeting_scheduled: { label: "Meeting Scheduled", color: "#3B82F6" },
  confirmed: { label: "Confirmed", color: "#22C55E" },
  follow_up_required: { label: "Follow-up Required", color: "#F97316" },
  rejected: { label: "Rejected", color: "#EF4444" },
};