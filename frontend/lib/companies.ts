import api from "./api";
import { Company, CompanyCreate, CompanyUpdate } from "@/types/company";

export async function getCompanies(): Promise<Company[]> {
  const res = await api.get<Company[]>("/companies/");
  return res.data;
}

export async function getCompany(id: number): Promise<Company> {
  const res = await api.get<Company>(`/companies/${id}`);
  return res.data;
}

export async function createCompany(data: CompanyCreate): Promise<Company> {
  const res = await api.post<Company>("/companies/", data);
  return res.data;
}

export async function updateCompany(id: number, data: CompanyUpdate): Promise<Company> {
  const res = await api.put<Company>(`/companies/${id}`, data);
  return res.data;
}

export async function deleteCompany(id: number): Promise<void> {
  await api.delete(`/companies/${id}`);
}