/* eslint-disable @typescript-eslint/no-explicit-any */
// import HeroSection from "@/components/modules/home/hero";
// import HowItWorks from "@/components/modules/home/HowItWorks";
// import StatsSection from "@/components/modules/home/StatsSection";
// import Testimonials from "@/components/modules/home/Testimonials";
// import { getAllEvents } from "@/services/events";

// export default async function Home() {
//   const result = await getAllEvents({ limit: 1 });
//   const event = result?.data?.[0];

//   return (
//     <div>
//       <HeroSection event={event} />
//       <HowItWorks />
//       <StatsSection />
//       <Testimonials />
//     </div>
//   );
// }

import HeroSection from "@/components/modules/home/hero";
import HowItWorks from "@/components/modules/home/HowItWorks";
import StatsSection from "@/components/modules/home/StatsSection";
import Testimonials from "@/components/modules/home/Testimonials";
 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllEvents } from "@/services/events";
import EventCard from "@/components/modules/eventCard/EventCard";

export default async function Home() {
  // 👉 1 event for Hero
  const heroRes = await getAllEvents({ limit: 1 });
  const heroEvent = heroRes?.data?.[0];

  // 👉 3 events for homepage
  const eventsRes = await getAllEvents({ limit: 3 });
  const events = eventsRes?.data || [];

  return (
    <div>
      <HeroSection event={heroEvent} />

      {/* ✅ 3 Events Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover events happening now
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* ✅ Button */}
          <div className="mt-10 flex justify-center">
            <Link href="/events">
              <Button size="lg" className="rounded-full px-8">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <StatsSection />
      <Testimonials />
    </div>
  );
}
