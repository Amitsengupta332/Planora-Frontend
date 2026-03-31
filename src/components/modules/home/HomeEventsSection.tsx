import Link from "next/link";
import { Button } from "@/components/ui/button";
import EventCard, { TEvent } from "../eventCard/EventCard";
 

export default function HomeEventsSection({
  events,
}: {
  events: TEvent[];
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore some of our latest events
          </p>
        </div>

        {/* 3 Event Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <Link href="/events">
            <Button size="lg" className="rounded-full px-8">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}