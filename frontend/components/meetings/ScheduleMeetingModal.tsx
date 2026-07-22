"use client";

import { useState } from "react";
import { Company } from "@/types/company";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createMeeting } from "@/lib/meetings";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  onScheduled: () => void;
}

export function ScheduleMeetingModal({ isOpen, onClose, companies, onScheduled }: ScheduleMeetingModalProps) {
  const [companyId, setCompanyId] = useState<number | "">("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyId || !dateTime) return;

    setSubmitting(true);
    try {
      await createMeeting({
        company_id: Number(companyId),
        meeting_date: new Date(dateTime).toISOString(),
        location,
      });
      setCompanyId("");
      setDateTime("");
      setLocation("");
      onScheduled();
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Meeting">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm text-ink-secondary">Company</label>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(Number(e.target.value))}
            required
            className="w-full bg-white/5 border border-border rounded-xl px-3 py-2 text-ink-primary text-sm outline-none focus:border-accent-purple/50"
          >
            <option value="" className="bg-white text-black">Select a company</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id} className="bg-white text-black">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Date & Time"
          type="datetime-local"
          required
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <Input
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Scheduling..." : "Schedule"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}