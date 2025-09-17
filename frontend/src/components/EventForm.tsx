"use client";
import { useState } from "react";

type EventFormValues = {
  title: string;
  description?: string;
  date: string;
  time: string;
  image_url?: string;
};

export default function EventForm({
  initial,
  onSubmit,
  submitLabel = "Save",
}: {
  initial?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => Promise<void> | void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<EventFormValues>({
    title: initial?.title || "",
    description: initial?.description || "",
    date: initial?.date || "",
    time: initial?.time || "",
    image_url: initial?.image_url || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title || !values.date || !values.time) {
      setError("Title, date and time are required");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err: any) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="grid gap-2">
        <label className="text-sm">Title</label>
        <input className="border rounded px-3 py-2" value={values.title} onChange={(e) => setValues(v => ({...v, title: e.target.value}))} />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Description</label>
        <textarea className="border rounded px-3 py-2" value={values.description} onChange={(e) => setValues(v => ({...v, description: e.target.value}))} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label className="text-sm">Date</label>
          <input type="date" className="border rounded px-3 py-2" value={values.date} onChange={(e) => setValues(v => ({...v, date: e.target.value}))} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Time</label>
          <input type="time" className="border rounded px-3 py-2" value={values.time} onChange={(e) => setValues(v => ({...v, time: e.target.value}))} />
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Image URL</label>
        <input className="border rounded px-3 py-2" value={values.image_url} onChange={(e) => setValues(v => ({...v, image_url: e.target.value}))} />
      </div>
      <button disabled={loading} className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-60">{submitLabel}</button>
    </form>
  );
}








