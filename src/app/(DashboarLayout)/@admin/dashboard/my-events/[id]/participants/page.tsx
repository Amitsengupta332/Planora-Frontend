import EventParticipantsClient from "@/components/dashboard/EventParticipantsClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventParticipantsPage({ params }: PageProps) {
  const { id } = await params;

  return <EventParticipantsClient id={id} />;
}