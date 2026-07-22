"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_ROUTES = ["/login", "/register"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (loading) return;   // wait until we know whether a user exists
    if (!user && !isPublicRoute) {
      router.push("/login");
    }
  }, [user, loading, isPublicRoute, router]);

  // While checking auth status, or while redirecting, show nothing (or a
  // spinner) instead of flashing protected content before redirect completes.
  if (loading) {
    return <p className="text-ink-secondary p-8">Loading...</p>;
  }
  if (!user && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}