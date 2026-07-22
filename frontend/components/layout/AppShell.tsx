"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    // No sidebar, no padding offset — login gets the full screen to itself.
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <main className="pl-72 p-8 min-h-screen">{children}</main>
    </>
  );
}