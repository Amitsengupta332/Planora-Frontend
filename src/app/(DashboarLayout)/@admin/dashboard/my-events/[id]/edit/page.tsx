import EditEventForm from "@/components/modules/eventCard/EditEventForm";

 

type EditEventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  return <EditEventForm eventId={id} />;
}