import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type AccentColor = "purple" | "blue" | "green" | "orange" | "cyan" | "pink";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: AccentColor;
}

// Explicit, full class names for every accent option — Tailwind can see
// these literal strings at build time and will correctly include them
// in the final CSS bundle. This is the safe pattern for dynamic colors.
const accentStyles: Record<AccentColor, { bar: string; iconBg: string; iconText: string }> = {
  purple: { bar: "bg-accent-purple", iconBg: "bg-accent-purple/10", iconText: "text-accent-purple" },
  blue: { bar: "bg-accent-blue", iconBg: "bg-accent-blue/10", iconText: "text-accent-blue" },
  green: { bar: "bg-accent-green", iconBg: "bg-accent-green/10", iconText: "text-accent-green" },
  orange: { bar: "bg-accent-orange", iconBg: "bg-accent-orange/10", iconText: "text-accent-orange" },
  cyan: { bar: "bg-accent-cyan", iconBg: "bg-accent-cyan/10", iconText: "text-accent-cyan" },
  pink: { bar: "bg-accent-pink", iconBg: "bg-accent-pink/10", iconText: "text-accent-pink" },
};

export function StatCard({ label, value, icon: Icon, accent = "purple" }: StatCardProps) {
  const styles = accentStyles[accent];

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${styles.bar}`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-secondary">{label}</p>
          <p className="text-2xl font-semibold text-ink-primary mt-2">{value}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${styles.iconBg}`}>
          <Icon size={20} className={styles.iconText} />
        </div>
      </div>
    </Card>
  );
}