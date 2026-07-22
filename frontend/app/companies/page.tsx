"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CompanyTable } from "@/components/companies/CompanyTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { createCompany } from "@/lib/companies";
import { CompanyCreate } from "@/types/company";

const emptyForm: CompanyCreate = {
  name: "",
  person_in_charge: "",
  offer_amount: 0,
  notes: "",
};

export default function CompaniesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<CompanyCreate>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  // Forces CompanyTable to reload after a new company is added.
  const [refreshKey, setRefreshKey] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createCompany(form);

      setForm(emptyForm);
      setIsModalOpen(false);
      setRefreshKey((k) => k + 1);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-primary">
            Sponsorship Tracker
          </h1>
          <p className="text-ink-secondary mt-1">
            Manage companies, offers, and outreach status
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          Add Company
        </Button>
      </div>

      <CompanyTable key={refreshKey} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Company"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Company Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <Input
            label="Person in charge"
            required
            value={form.person_in_charge}
            onChange={(e) =>
              setForm({ ...form, person_in_charge: e.target.value })
            }
          />


          <Input
            label="Offer Amount (₹)"
            type="number"
            value={form.offer_amount}
            onChange={(e) =>
              setForm({
                ...form,
                offer_amount: Number(e.target.value),
              })
            }
          />
          <Input
            label="Comments"
            value={form.notes ?? ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Company"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}