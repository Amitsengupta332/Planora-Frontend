/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCard from "@/components/modules/eventCard/EventCard";
import { getAllEvents } from "@/services/events";

 

export default async function EventPage() {
  const result = await getAllEvents(); 
  const events = result?.data || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Events</h1>
        <p className="mt-2 text-muted-foreground">
          Discover public and private events on Planora.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}