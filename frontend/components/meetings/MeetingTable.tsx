"use client";

import { Meeting } from "@/types/meeting";
import { MeetingStatusBadge } from "./MeetingStatusBadge";

export function MeetingTable({ meetings }: { meetings: Meeting[] }) {
  return (
    <div className="rounded-card border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-background-surface border-b border-border">
          <tr className="text-left text-ink-secondary">
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Date & Time</th>
            <th className="px-4 py-3 font-medium">Location</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m.id} className="border-b border-border last:border-0 hover:bg-white/3">
              <td className="px-4 py-3 text-ink-primary font-medium">{m.company_name}</td>
              <td className="px-4 py-3 text-ink-secondary">
                {new Date(m.meeting_date).toLocaleString("en-IN", {
                  day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                })}
              </td>
              <td className="px-4 py-3 text-ink-secondary">{m.location ?? "—"}</td>
              <td className="px-4 py-3"><MeetingStatusBadge status={m.status} /></td>
              <td className="px-4 py-3 text-ink-secondary">{m.notes ?? "—"}</td>
            </tr>
          ))}
          {meetings.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                No meetings scheduled.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}