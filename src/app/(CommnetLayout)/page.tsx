import HeroSection from "@/components/modules/home/hero";
import { getAllEvents } from "@/services/events";
 

export default async function Home() {
  const result = await getAllEvents({ limit: 1 });
  const event = result?.data?.[0];

  return (
    <div>
      <HeroSection event={event} />
    </div>
  );
}