import EventCard, { Event } from "@/components/EventCard";
import { api } from "@/lib/api";

async function getEvents(): Promise<Event[]> {
  return api.get<Event[]>("/events/");
}

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold mb-4">Upcoming Events</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}


