import api from "./api";
import { Activity } from "@/types/activity";

export async function getRecentActivities(): Promise<Activity[]> {
  const res = await api.get<Activity[]>("/activities/");
  return res.data;
}