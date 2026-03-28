import EventDetails from "@/components/modules/eventCard/EventDetails";
import { getEventById } from "@/services/events";

 

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getEventById(id);
  const event = result?.data;

  return <EventDetails event={event} />;
}