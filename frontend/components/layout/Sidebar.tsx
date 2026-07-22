"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Table2,
  AlertTriangle,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Sponsorship Tracker", href: "/companies", icon: Table2 },
  { label: "Monopoly Conflicts", href: "/conflicts", icon: AlertTriangle },
  { label: "Meetings", href: "/meetings", icon: CalendarDays },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  // usePathname gives us the current URL path, so we can highlight
  // whichever nav item matches where the user currently is.
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-64 rounded-card border border-border bg-background-surface/60 backdrop-blur-md p-4 flex flex-col">
      <div className="px-2 py-3 mb-4">
        <h1 className="text-lg font-semibold text-ink-primary">MonaLisa</h1>
        <p className="text-xs text-ink-muted">Sponsorship Manager</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-linear-to-r from-accent-purple/20 to-accent-purple/5 text-ink-primary border border-accent-purple/20"
                  : "text-ink-secondary hover:text-ink-primary hover:bg-white/5"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="border-t border-border pt-3 mt-3">
          <div className="px-3 py-2">
            <p className="text-sm text-ink-primary font-medium">{user.name}</p>
            <p className="text-xs text-ink-muted">{user.role.replace("_", " ")}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-secondary hover:text-accent-red hover:bg-accent-red/5 transition-all w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}