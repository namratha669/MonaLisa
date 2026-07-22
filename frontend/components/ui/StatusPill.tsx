import { CompanyStatus } from "@/types/company";
import { cn } from "@/lib/utils";

// A single object mapping each backend status value to its display label
// and color classes. This is the ONE place status colors are defined —
// matching your spec's exact color scheme (grey/yellow/blue/green/orange/red).
const statusConfig: Record<CompanyStatus, { label: string; classes: string }> = {
  not_contacted: {
    label: "Not Contacted",
    classes: "bg-white/10 text-ink-secondary border-white/10",
  },
  negotiation: {
    label: "Negotiation",
    classes: "bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20",
  },
  meeting_scheduled: {
    label: "Meeting Scheduled",
    classes: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  },
  confirmed: {
    label: "Confirmed",
    classes: "bg-accent-green/10 text-accent-green border-accent-green/20",
  },
  follow_up_required: {
    label: "Follow-up Required",
    classes: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
  },
  rejected: {
    label: "Rejected",
    classes: "bg-accent-red/10 text-accent-red border-accent-red/20",
  },
};

export function StatusPill({ status }: { status: CompanyStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        config.classes
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}