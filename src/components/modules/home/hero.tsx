import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HeroEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  feeType: "FREE" | "PAID";
  fee?: number;
  creator?: {
    name: string;
  };
};

interface HeroSectionProps {
  event?: HeroEvent;
}

function formatEventDate(dateString?: string) {
  if (!dateString) return "Date not available";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
}

export default function HeroSection({ event }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge className="rounded-full px-4 py-1 text-sm">
              Discover • Create • Join Events
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Plan and join memorable events with{" "}
                <span className="text-primary">Planora</span>
              </h1>

              <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                Planora is a modern event platform where users can create,
                manage, and participate in public or private events with smooth
                registration, approvals, and payment support.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/events">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Events
                </Button>
              </Link>

              <Link href="/dashboard/my-events">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Create Event
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>Public & Private Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Host & Join Easily</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border bg-background p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="secondary">Featured Event</Badge>
                <Badge className="bg-green-600 text-white hover:bg-green-600">
                  {event?.feeType === "PAID" ? `Paid ৳${event.fee}` : "Free"}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
                    alt="Featured event"
                    className="h-64 w-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {event?.title || "No featured event available"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {event?.description ||
                      "Please check back later for upcoming featured events."}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{formatEventDate(event?.date)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event?.venue || "Venue not available"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>
                      Hosted by {event?.creator?.name || "Unknown organizer"}
                    </span>
                  </div>
                </div>

                <Link href={event ? `/events/${event.id}` : "/events"}>
                  <Button className="mt-2 w-full">Join Now</Button>
                </Link>
              </div>
            </div>

            <div className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}