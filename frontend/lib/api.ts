import axios from "axios";

// This creates a pre-configured axios instance. Instead of writing the full
// URL every time (http://127.0.0.1:8000/companies), we just write "/companies"
// and axios prepends the baseURL automatically.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// An interceptor runs before every request goes out. Here, we check if a
// login token exists in localStorage, and if so, attach it to the
// Authorization header automatically — so we never have to remember to
// do this manually in every single API call throughout the app.
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;