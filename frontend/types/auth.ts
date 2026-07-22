export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "team_lead" | "member";
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}