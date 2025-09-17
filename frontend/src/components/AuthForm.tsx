"use client";
import { api, TokenPayload } from "@/lib/api";
import { useState } from "react";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const path = mode === "login" ? "/auth/login" : "/auth/signup";
      const body = mode === "login" ? { email, password } : { name, email, password };
      const data = await api.post<TokenPayload>(path, body);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      window.location.href = "/events";
    } catch (err: any) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold text-center">{mode === "login" ? "Login" : "Create account"}</h1>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {mode === "signup" && (
        <div className="grid gap-2">
          <label className="text-sm">Name</label>
          <input className="border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      )}
      <div className="grid gap-2">
        <label className="text-sm">Email</label>
        <input type="email" className="border rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Password</label>
        <input type="password" className="border rounded px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button disabled={loading} className="w-full px-4 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-60">{mode === "login" ? "Login" : "Sign up"}</button>
    </form>
  );
}









