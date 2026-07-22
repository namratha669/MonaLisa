import { MeetingStatus } from "@/types/meeting";

const config: Record<MeetingStatus, { label: string; classes: string }> = {
  upcoming: { label: "Upcoming", classes: "bg-accent-blue/10 text-accent-blue border-accent-blue/20" },
  completed: { label: "Completed", classes: "bg-accent-green/10 text-accent-green border-accent-green/20" },
  cancelled: { label: "Cancelled", classes: "bg-accent-red/10 text-accent-red border-accent-red/20" },
};

export function MeetingStatusBadge({ status }: { status: MeetingStatus }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${c.classes}`}>
      {c.label}
    </span>
  );
}