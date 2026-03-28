import EditEventForm from "@/components/modules/eventCard/EditEventForm";

 

type EditAdminEventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdminEventPage({
  params,
}: EditAdminEventPageProps) {
  const { id } = await params;

  return <EditEventForm eventId={id} />;
}