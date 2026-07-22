"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { StatusDistributionItem } from "@/types/analytics";
import { statusMeta } from "@/lib/statusMeta";
import { CompanyStatus } from "@/types/company";
import { Card } from "@/components/ui/Card";

export function StatusDonutChart({ data }: { data: StatusDistributionItem[] }) {
  // Recharts needs a "name" and "value" per slice, plus we attach the
  // matching color from our shared statusMeta lookup.
  const chartData = data.map((d) => ({
    name: statusMeta[d.status as CompanyStatus]?.label ?? d.status,
    value: d.count,
    color: statusMeta[d.status as CompanyStatus]?.color ?? "#71717A",
  }));

  return (
    <Card>
      <h3 className="text-sm font-medium text-ink-secondary mb-4">Status Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#17181C",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              fontSize: "12px",
            }}
            itemStyle={{ color: "#FFFFFF" }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", color: "#A1A1AA" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}