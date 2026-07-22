"use client";

import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Clock, IndianRupee, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import { getDashboardStats } from "@/lib/analytics";
import { getRecentActivities } from "@/lib/activities";
import { DashboardStats } from "@/types/analytics";
import { Activity } from "@/types/activity";

export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both in parallel rather than one-after-another — faster load time.
    Promise.all([getDashboardStats(), getRecentActivities()])
      .then(([statsData, activitiesData]) => {
        setStats(statsData);
        setActivities(activitiesData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-ink-secondary">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-primary">Dashboard</h1>
        <p className="text-ink-secondary mt-1">Overview of sponsorship activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Companies"
          value={stats?.total_companies ?? 0}
          icon={Building2}
          accent="blue"
        />
        <StatCard
          label="Confirmed Sponsors"
          value={stats?.confirmed_sponsors ?? 0}
          icon={CheckCircle2}
          accent="green"
        />
        <StatCard
          label="Pending Sponsors"
          value={stats?.pending_sponsors ?? 0}
          icon={Clock}
          accent="orange"
        />
        <StatCard
          label="Total Sponsorship Value"
          value={`₹${(stats?.total_sponsorship_value ?? 0).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          accent="purple"
        />
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-ink-primary mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activities.length === 0 && (
            <p className="text-ink-muted text-sm">No activity yet.</p>
          )}
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-accent-purple shrink-0" />
              <div>
                <p className="text-sm text-ink-primary">
                  <span className="font-medium">{activity.actor}</span> {activity.description}
                </p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {new Date(activity.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}