import JoinedEventsList from "@/components/dashboard/JoinedEventsList";

export default function JoinedEventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Joined Events</h1>
        <p className="text-sm text-muted-foreground">
          View all events you joined or requested to join.
        </p>
      </div>

      <JoinedEventsList />
    </div>
  );
}