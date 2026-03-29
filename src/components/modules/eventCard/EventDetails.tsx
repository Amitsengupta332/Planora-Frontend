// import { CalendarDays, MapPin, User, Wallet, ShieldCheck } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// export type TEventDetails = {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   venue: string;
//   eventType: "PUBLIC" | "PRIVATE";
//   feeType: "FREE" | "PAID";
//   fee: number;
//   creator?: {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//   };
// };

// function formatEventDate(dateString: string) {
//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//     timeZone: "UTC",
//   }).format(new Date(dateString));
// }

// function getActionLabel(event: TEventDetails) {
//   if (event.eventType === "PUBLIC" && event.feeType === "FREE") {
//     return "Join";
//   }

//   if (event.eventType === "PUBLIC" && event.feeType === "PAID") {
//     return "Pay & Join";
//   }

//   if (event.eventType === "PRIVATE" && event.feeType === "FREE") {
//     return "Request to Join";
//   }

//   return "Pay & Request";
// }

// export default function EventDetails({ event }: { event: TEventDetails }) {
//   return (
//     <section className="py-10">
//       <div className="container mx-auto px-4">
//         <div className="grid gap-8 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
//               <div className="h-72 w-full bg-muted">
//                 <img
//                   src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
//                   alt={event.title}
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               <div className="space-y-6 p-6 md:p-8">
//                 <div className="flex flex-wrap gap-2">
//                   <Badge variant="secondary">{event.eventType}</Badge>
//                   <Badge
//                     className={
//                       event.feeType === "FREE"
//                         ? "bg-green-600 text-white hover:bg-green-600"
//                         : "bg-primary text-primary-foreground"
//                     }
//                   >
//                     {event.feeType === "FREE" ? "Free" : `Paid ৳${event.fee}`}
//                   </Badge>
//                 </div>

//                 <div>
//                   <h1 className="text-3xl font-bold md:text-4xl">{event.title}</h1>
//                   <p className="mt-4 leading-7 text-muted-foreground">
//                     {event.description}
//                   </p>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div className="rounded-2xl border p-4">
//                     <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
//                       <CalendarDays className="h-4 w-4 text-primary" />
//                       Date & Time
//                     </div>
//                     <p className="font-medium">{formatEventDate(event.date)}</p>
//                   </div>

//                   <div className="rounded-2xl border p-4">
//                     <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
//                       <MapPin className="h-4 w-4 text-primary" />
//                       Venue
//                     </div>
//                     <p className="font-medium">{event.venue}</p>
//                   </div>

//                   <div className="rounded-2xl border p-4">
//                     <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
//                       <User className="h-4 w-4 text-primary" />
//                       Organizer
//                     </div>
//                     <p className="font-medium">
//                       {event.creator?.name || "Unknown organizer"}
//                     </p>
//                   </div>

//                   <div className="rounded-2xl border p-4">
//                     <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
//                       <Wallet className="h-4 w-4 text-primary" />
//                       Registration Fee
//                     </div>
//                     <p className="font-medium">
//                       {event.feeType === "FREE" ? "Free" : `৳${event.fee}`}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <div className="sticky top-24 rounded-3xl border bg-background p-6 shadow-sm">
//               <h2 className="text-xl font-semibold">Join this event</h2>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 Complete your participation based on event type and fee.
//               </p>

//               <div className="mt-6 space-y-4">
//                 <div className="rounded-2xl bg-muted p-4">
//                   <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
//                     <ShieldCheck className="h-4 w-4 text-primary" />
//                     Access Type
//                   </div>
//                   <p className="font-medium">
//                     {event.eventType === "PUBLIC" ? "Public Event" : "Private Event"}
//                   </p>
//                 </div>

//                 <Button className="w-full">{getActionLabel(event)}</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  User,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
 
import { toast } from "sonner";
import { joinEvent } from "@/services/participation";

export type TEventDetails = {
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
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(dateString));
}

function getActionLabel(event: TEventDetails) {
  if (event.eventType === "PUBLIC" && event.feeType === "FREE") {
    return "Join";
  }

  if (event.eventType === "PUBLIC" && event.feeType === "PAID") {
    return "Pay & Join";
  }

  if (event.eventType === "PRIVATE" && event.feeType === "FREE") {
    return "Request to Join";
  }

  return "Pay & Request";
}

export default function EventDetails({
  event,
  currentUserId,
}: {
  event: TEventDetails;
  currentUserId?: string;
}) {
  const [loading, setLoading] = useState(false);
  const isOwner = currentUserId && event.creator?.id === currentUserId;

  const handleParticipation = async () => {
    try {
      setLoading(true);

      if (event.feeType === "PAID") {
        toast.info("Payment flow will be added here.");
        return;
      }

      const res = await joinEvent(event.id);

      if (res.success) {
        toast.success(res.message || "Participation successful");
      } else {
        toast.error(res.message || "Failed to join event");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
              <div className="h-72 w-full bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
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
                  <h1 className="text-3xl font-bold md:text-4xl">{event.title}</h1>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    {event.description}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      Date & Time
                    </div>
                    <p className="font-medium">{formatEventDate(event.date)}</p>
                  </div>

                  <div className="rounded-2xl border p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      Venue
                    </div>
                    <p className="font-medium">{event.venue}</p>
                  </div>

                  <div className="rounded-2xl border p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4 text-primary" />
                      Organizer
                    </div>
                    <p className="font-medium">
                      {event.creator?.name || "Unknown organizer"}
                    </p>
                  </div>

                  <div className="rounded-2xl border p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Wallet className="h-4 w-4 text-primary" />
                      Registration Fee
                    </div>
                    <p className="font-medium">
                      {event.feeType === "FREE" ? "Free" : `৳${event.fee}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-3xl border bg-background p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Join this event</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete your participation based on event type and fee.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-muted p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Access Type
                  </div>
                  <p className="font-medium">
                    {event.eventType === "PUBLIC" ? "Public Event" : "Private Event"}
                  </p>
                </div>

                {isOwner ? (
                  <Button className="w-full" disabled>
                    You are the event owner
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleParticipation}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : getActionLabel(event)}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}