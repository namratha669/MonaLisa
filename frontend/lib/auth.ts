import api from "./api";
import { User, LoginResponse } from "@/types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  // Your backend's /auth/login expects OAuth2 form data (username + password
  // fields), not JSON — remember Step 16e's OAuth2PasswordRequestForm.
  // So we build a URLSearchParams body instead of a plain JSON object.
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const res = await api.post<LoginResponse>("/auth/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get<User>("/auth/me");
  return res.data;
}

export async function register(name: string, email: string, password: string): Promise<void> {
  await api.post("/auth/register", {
    name,
    email,
    password,
    role: "admin",   // see note below on why this default matters right now
  });
}