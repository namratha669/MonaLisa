"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";
import { login as loginApi, getCurrentUser } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// createContext gives us a "container" that any component in the tree can
// read from, without manually passing props down through every layer
// (avoiding what's called "prop drilling").
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // On first load, check if a token already exists (user refreshed the page
  // or came back later) and try to restore their session automatically.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        // Token exists but is invalid/expired — clear it out.
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const { access_token } = await loginApi(email, password);
    localStorage.setItem("token", access_token);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    router.push("/");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A small custom hook so components use `useAuth()` instead of importing
// useContext + AuthContext everywhere — cleaner call sites, and this hook
// also throws a clear error if it's ever used outside the provider by mistake.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}