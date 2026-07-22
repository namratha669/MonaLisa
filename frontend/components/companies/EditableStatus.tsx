"use client";

import { CompanyStatus } from "@/types/company";
import { StatusPill } from "@/components/ui/StatusPill";

const statusOptions: { value: CompanyStatus; label: string }[] = [
  { value: "not_contacted", label: "Not Contacted" },
  { value: "negotiation", label: "Negotiation" },
  { value: "meeting_scheduled", label: "Meeting Scheduled" },
  { value: "confirmed", label: "Confirmed" },
  { value: "follow_up_required", label: "Follow-up Required" },
  { value: "rejected", label: "Rejected" },
];

interface EditableStatusProps {
  value: CompanyStatus;
  onSave: (newStatus: CompanyStatus) => Promise<void>;
}

export function EditableStatus({
  value,
  onSave,
}: EditableStatusProps) {
  return (
    // A real <select> layered under the visible StatusPill. The select is
    // invisible (opacity-0) but still fully functional and clickable,
    // giving us native dropdown behavior with a custom visual.
    <div className="relative inline-block">
      <StatusPill status={value} />

      <select
        value={value}
        onChange={(e) => onSave(e.target.value as CompanyStatus)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        {statusOptions.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="text-black bg-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}