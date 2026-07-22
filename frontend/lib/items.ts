import api from "./api";
import { Item } from "@/types/item";
import { Conflict } from "@/types/conflict";

export async function getItemsForCompany(companyId: number): Promise<Item[]> {
  const res = await api.get<Item[]>(`/items/company/${companyId}`);
  return res.data;
}

export async function addItem(name: string, companyId: number): Promise<Item> {
  const res = await api.post<Item>("/items/", { name, company_id: companyId });
  return res.data;
}

export async function removeItem(itemId: number): Promise<void> {
  await api.delete(`/items/${itemId}`);
}

export async function getConflicts(): Promise<Conflict[]> {
  const res = await api.get<Conflict[]>("/items/conflicts");
  return res.data;
}