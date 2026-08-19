export interface Student {
  id: number;
  name: string;
  email: string;
}

export const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const TOKEN_KEY = "token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

export const authFetch = (token: string | null, url: string, options: RequestInit = {}): Promise<Response> => {
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return fetch(API_BASE + url, { ...options, headers });
};
