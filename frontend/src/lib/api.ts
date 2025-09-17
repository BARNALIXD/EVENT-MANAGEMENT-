export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.status === 204 ? (undefined as unknown as T) : res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown, token?: string) =>
    request<T>(path, {
      method: "POST" as HttpMethod,
      body: body ? JSON.stringify(body) : undefined,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
  put: <T>(path: string, body?: unknown, token?: string) =>
    request<T>(path, {
      method: "PUT" as HttpMethod,
      body: body ? JSON.stringify(body) : undefined,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
  delete: <T>(path: string, token?: string) =>
    request<T>(path, {
      method: "DELETE" as HttpMethod,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
};

export type TokenPayload = { access_token: string; token_type: string; role: "admin" | "normal" };









