"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Meeting } from "@/types/meeting";
import { Company } from "@/types/company";
import { getMeetings } from "@/lib/meetings";
import { getCompanies } from "@/lib/companies";
import { MeetingTable } from "@/components/meetings/MeetingTable";
import { ScheduleMeetingModal } from "@/components/meetings/ScheduleMeetingModal";
import { Button } from "@/components/ui/Button";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadMeetings() {
    const data = await getMeetings();
    setMeetings(data);
  }

  useEffect(() => {
    Promise.all([getMeetings(), getCompanies()])
      .then(([meetingsData, companiesData]) => {
        setMeetings(meetingsData);
        setCompanies(companiesData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-primary">Meetings</h1>
          <p className="text-ink-secondary mt-1">Track scheduled sponsor meetings</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          Schedule Meeting
        </Button>
      </div>

      {loading ? (
        <p className="text-ink-secondary">Loading meetings...</p>
      ) : (
        <MeetingTable meetings={meetings} />
      )}

      <ScheduleMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companies={companies}
        onScheduled={loadMeetings}
      />
    </div>
  );
}