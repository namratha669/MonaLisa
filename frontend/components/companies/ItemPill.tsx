"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Conflict } from "@/types/conflict";

interface ItemPillProps {
  itemId: number;
  itemName: string;
  currentCompanyId: number;
  conflict?: Conflict;   // present only if this item name has a conflict
  onRemove: (itemId: number) => void;
}

export function ItemPill({ itemId, itemName, currentCompanyId, conflict, onRemove }: ItemPillProps) {
  const [showPopup, setShowPopup] = useState(false);
  const isConflicting = !!conflict;

  // Companies in conflict, excluding the one we're currently viewing —
  // so the popup shows "who ELSE is selling this," not yourself.
  const otherCompanies = conflict?.companies.filter((c) => c.company_id !== currentCompanyId) ?? [];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => isConflicting && setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium cursor-default ${
          isConflicting
            ? "bg-accent-red/10 text-accent-red border-accent-red/30"
            : "bg-white/5 text-ink-secondary border-white/10"
        }`}
      >
        {itemName}
        {isConflicting && <span className="h-1.5 w-1.5 rounded-full bg-accent-red" />}
        <button
          onClick={() => onRemove(itemId)}
          className="hover:text-ink-primary ml-0.5"
        >
          <X size={12} />
        </button>
      </span>

      {/* Wikipedia-style hover card, positioned below the pill */}
      {showPopup && isConflicting && (
        <div className="absolute z-50 top-full left-0 mt-2 w-72 bg-background-surface border border-border rounded-xl shadow-2xl p-4">
          <p className="text-sm text-ink-primary font-medium mb-2">
            "{itemName}" also sold by {otherCompanies.length} other {otherCompanies.length === 1 ? "company" : "companies"}
          </p>
          <ul className="space-y-1.5 mb-3">
            {otherCompanies.map((c) => (
              <li key={c.company_id} className="text-xs text-ink-secondary flex justify-between">
                <span>{c.company_name}</span>
                <span className="text-ink-muted">₹{c.offer_amount.toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/conflicts"
            className="text-xs text-accent-purple hover:underline"
          >
            View full comparison →
          </Link>
        </div>
      )}
    </div>
  );
}