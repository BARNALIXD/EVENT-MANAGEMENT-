"use client";
import EventCard, { Event } from "@/components/EventCard";
import EventForm from "@/components/EventForm";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    if (role !== "admin") {
      window.location.href = "/login";
      return;
    }
    (async () => {
      try {
        const data = await api.get<Event[]>("/events/");
        setEvents(data);
      } catch (e: any) {
        setError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [role]);

  async function create(values: any) {
    if (!token) return;
    const e = await api.post<Event>("/admin/events/", values, token);
    setEvents((prev) => [e, ...prev]);
  }

  async function remove(id: number) {
    if (!token) return;
    await api.delete(`/admin/events/${id}`, token);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  if (loading) return <div className="py-10">Loading...</div>;
  if (error) return <div className="py-10 text-red-600">{error}</div>;

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Events</h1>
      <div className="border rounded p-4 bg-white">
        <h2 className="font-medium mb-3">Create Event</h2>
        <EventForm onSubmit={create} submitLabel="Create" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <div key={e.id} className="relative group">
            <EventCard event={e} />
            <button onClick={() => remove(e.id)} className="absolute top-2 right-2 text-xs px-2 py-1 bg-white/90 border rounded hover:bg-white">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}








