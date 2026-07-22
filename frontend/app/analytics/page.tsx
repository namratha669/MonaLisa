"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Award, Users, IndianRupee } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusDonutChart } from "@/components/analytics/StatusDonutChart";
import { getDashboardStats, getStatusDistribution } from "@/lib/analytics";
import { DashboardStats, StatusDistributionItem } from "@/types/analytics";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statusData, setStatusData] = useState<StatusDistributionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getStatusDistribution()])
      .then(([s, d]) => {
        setStats(s);
        setStatusData(d);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-ink-secondary">Loading analytics...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-primary">Analytics</h1>
        <p className="text-ink-secondary mt-1">Sponsorship performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Sponsorship Value"
          value={`₹${(stats?.total_sponsorship_value ?? 0).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          accent="purple"
        />
        <StatCard
          label="Highest Offer"
          value={`₹${(stats?.highest_offer ?? 0).toLocaleString("en-IN")}`}
          icon={Award}
          accent="green"
        />
        <StatCard
          label="Confirmed Sponsors"
          value={stats?.confirmed_sponsors ?? 0}
          icon={TrendingUp}
          accent="blue"
        />
        <StatCard
          label="Total Companies"
          value={stats?.total_companies ?? 0}
          icon={Users}
          accent="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusDonutChart data={statusData} />
      </div>
    </div>
  );
}