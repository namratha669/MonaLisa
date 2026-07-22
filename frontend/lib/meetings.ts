import api from "./api";
import { Meeting, MeetingCreate } from "@/types/meeting";

export async function getMeetings(): Promise<Meeting[]> {
  const res = await api.get<Meeting[]>("/meetings/");
  return res.data;
}

export async function createMeeting(data: MeetingCreate): Promise<Meeting> {
  const res = await api.post<Meeting>("/meetings/", data);
  return res.data;
}