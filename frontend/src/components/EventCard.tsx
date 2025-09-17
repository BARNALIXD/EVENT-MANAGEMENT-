import { format } from "date-fns";

export type Event = {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  time: string;
  image_url?: string | null;
};

export default function EventCard({ event }: { event: Event }) {
  const when = (() => {
    try {
      return `${format(new Date(event.date), "PPPP")} at ${event.time.substring(0,5)}`;
    } catch {
      return `${event.date} ${event.time}`;
    }
  })();

  return (
    <article className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      {event.image_url && (
        <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{event.title}</h3>
        {event.description && <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>}
        <p className="text-xs text-gray-500">{when}</p>
      </div>
    </article>
  );
}








