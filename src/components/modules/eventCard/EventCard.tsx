import Link from "next/link";
import { CalendarDays, MapPin, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type TEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  eventType: "PUBLIC" | "PRIVATE";
  feeType: "FREE" | "PAID";
  fee: number;
  creator?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

function formatEventDate(dateString: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(dateString));
}

export default function EventCard({ event }: { event: TEvent }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{event.eventType}</Badge>
          <Badge
            className={
              event.feeType === "FREE"
                ? "bg-green-600 text-white hover:bg-green-600"
                : "bg-primary text-primary-foreground"
            }
          >
            {event.feeType === "FREE" ? "Free" : `Paid ৳${event.fee}`}
          </Badge>
        </div>

        <div>
          <h3 className="line-clamp-1 text-xl font-semibold">{event.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span>{formatEventDate(event.date)}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <span>{event.creator?.name || "Unknown organizer"}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/events/${event.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}