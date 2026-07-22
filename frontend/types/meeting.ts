export type MeetingStatus = "upcoming" | "completed" | "cancelled";

export interface Meeting {
  id: number;
  company_id: number;
  meeting_date: string;
  location: string | null;
  notes: string | null;
  status: MeetingStatus;
  created_at: string;
}

export interface MeetingCreate {
  company_id: number;
  meeting_date: string;
  location?: string;
  notes?: string;
  status?: MeetingStatus;
}

export interface Meeting {
  id: number;
  company_id: number;
  company_name: string;   // added
  meeting_date: string;
  location: string | null;
  notes: string | null;
  status: MeetingStatus;
  created_at: string;
}