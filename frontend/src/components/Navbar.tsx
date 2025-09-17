"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [role, setRole] = useState<"admin" | "normal" | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("role") : null;
    setRole((stored as any) || null);
  }, []);

  const isAuthed = typeof window !== "undefined" && !!localStorage.getItem("token");

  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-lg">EventManager</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/events" className="hover:underline">Events</Link>
          {role === "admin" && <Link href="/admin/events" className="hover:underline">Admin</Link>}
          {isAuthed ? (
            <button
              onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("role"); location.href = "/"; }}
              className="px-3 py-1 rounded border hover:bg-gray-50"
            >Logout</button>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1 rounded border hover:bg-gray-50">Login</Link>
              <Link href="/signup" className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}









