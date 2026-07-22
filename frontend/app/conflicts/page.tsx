"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Conflict } from "@/types/conflict";
import { getConflicts } from "@/lib/items";
import { ConflictCard } from "@/components/conflict/ConflictCard";

export default function ConflictsPage() {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConflicts()
      .then(setConflicts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-primary">Monopoly Conflicts</h1>
        <p className="text-ink-secondary mt-1">
          Items being sold by more than one company — compare offers to decide who gets exclusivity
        </p>
      </div>

      {loading && <p className="text-ink-secondary">Loading conflicts...</p>}

      {!loading && conflicts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertTriangle className="text-ink-muted mb-3" size={32} />
          <p className="text-ink-secondary">No conflicts right now</p>
          <p className="text-ink-muted text-sm mt-1">
            When two companies sell the same item, it'll show up here.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {conflicts.map((conflict) => (
          <ConflictCard key={conflict.item_name} conflict={conflict} />
        ))}
      </div>
    </div>
  );
}