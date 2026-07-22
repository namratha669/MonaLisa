"use client";

import { useEffect, useState } from "react";
import { Company, CompanyStatus } from "@/types/company";
import { getCompanies } from "@/lib/companies";
import { updateCompany } from "@/lib/companies";
import { EditableCell } from "./EditableCell";
import { EditableStatus } from "./EditableStatus";
import { ItemManager } from "./ItemManager";

const rowTint: Record<CompanyStatus, string> = {
  not_contacted: "",
  negotiation: "bg-accent-yellow/[0.03]",
  meeting_scheduled: "bg-accent-blue/[0.03]",
  confirmed: "bg-accent-green/[0.03]",
  follow_up_required: "bg-accent-orange/[0.03]",
  rejected: "bg-accent-red/[0.03]",
};

export function CompanyTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies().then(setCompanies).finally(() => setLoading(false));
  }, []);

  async function handleFieldSave(companyId: number, field: keyof Company, newValue: string) {
    const parsedValue = field === "offer_amount" ? Number(newValue) : newValue;
    const updated = await updateCompany(companyId, { [field]: parsedValue });
    setCompanies((prev) => prev.map((c) => (c.id === companyId ? updated : c)));
  }

  if (loading) return <p className="text-ink-secondary">Loading companies...</p>;

  return (
    <div className="rounded-card border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-background-surface border-b border-border">
          <tr className="text-left text-ink-secondary">
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Person In Charge</th>
            <th className="px-4 py-3 font-medium w-64">Items</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Offer Amount</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Comments</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className={`border-b border-border last:border-0 hover:bg-white/3 transition-colors align-top ${rowTint[company.status]}`}
            >
              <td className="px-1 py-3 text-ink-primary font-medium">
                <EditableCell value={company.name} onSave={(v) => handleFieldSave(company.id, "name", v)} />
              </td>
              <td className="px-1 py-3 text-ink-secondary">
                <EditableCell value={company.person_in_charge} onSave={(v) => handleFieldSave(company.id, "person_in_charge", v)} />
              </td>
              <td className="px-4 py-3">
                <ItemManager companyId={company.id} />
              </td>
              <td className="px-4 py-3">
                <EditableStatus value={company.status} onSave={(v) => handleFieldSave(company.id, "status", v)} />
              </td>
              <td className="px-1 py-3 text-right text-ink-primary">
                <EditableCell value={company.offer_amount} type="number" align="right" onSave={(v) => handleFieldSave(company.id, "offer_amount", v)} />
              </td>
              <td className="px-1 py-3 text-ink-secondary">
                <EditableCell value={company.priority ?? ""} onSave={(v) => handleFieldSave(company.id, "priority", v)} />
              </td>
              <td className="px-1 py-3 text-ink-secondary">
                <EditableCell value={company.notes ?? ""} onSave={(v) => handleFieldSave(company.id, "notes", v)} />
              </td>
            </tr>
          ))}
          {companies.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-ink-muted">
                No companies yet. Add your first one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}