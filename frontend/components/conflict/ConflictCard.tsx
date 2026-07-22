import { Conflict } from "@/types/conflict";
import { Card } from "@/components/ui/Card";
import { Crown } from "lucide-react";

interface ConflictCardProps {
  conflict: Conflict;
}

export function ConflictCard({ conflict }: ConflictCardProps) {
  // Find the highest offer among all companies in this conflict —
  // this becomes the recommended winner, matching your spec's example.
  const sorted = [...conflict.companies].sort((a, b) => b.offer_amount - a.offer_amount);
  const winner = sorted[0];
  const runnerUp = sorted[1];
  const difference = runnerUp ? winner.offer_amount - runnerUp.offer_amount : 0;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Conflicting Item</p>
          <h3 className="text-lg font-semibold text-ink-primary">{conflict.item_name}</h3>
        </div>
        <span className="text-xs bg-accent-red/10 text-accent-red border border-accent-red/20 rounded-full px-2.5 py-1">
          {conflict.companies.length} companies
        </span>
      </div>

      <div className="space-y-2">
        {sorted.map((company, index) => (
          <div
            key={company.company_id}
            className={`flex items-start justify-between rounded-xl border px-3 py-2.5 ${
              index === 0
                ? "border-accent-green/30 bg-accent-green/5"
                : "border-border bg-white/2"
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5">
                {index === 0 && <Crown size={14} className="text-accent-green" />}
                <p className="text-sm font-medium text-ink-primary">{company.company_name}</p>
              </div>
              {company.other_items.length > 0 && (
                <p className="text-xs text-ink-muted mt-1">
                  Also selling: {company.other_items.join(", ")}
                </p>
              )}
            </div>
            <p className={`text-sm font-medium ${index === 0 ? "text-accent-green" : "text-ink-secondary"}`}>
              ₹{company.offer_amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      {runnerUp && (
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-xs text-ink-secondary">
            Recommendation: <span className="text-ink-primary font-medium">{winner.company_name}</span>
          </p>
          <p className="text-xs text-accent-green font-medium">
            +₹{difference.toLocaleString("en-IN")} difference
          </p>
        </div>
      )}
    </Card>
  );
}