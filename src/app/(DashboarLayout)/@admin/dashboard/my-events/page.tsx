"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getCurrentUserClient } from "@/services/auth";
import { deleteEvent, getAllEvents } from "@/services/events";

type TEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  eventType: "PUBLIC" | "PRIVATE";
  feeType: "FREE" | "PAID";
  fee?: number;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
  };
};

export default function MyEventsPage() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadMyEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const user = getCurrentUserClient();

      if (!user?.id) {
        throw new Error("User not found");
      }

      const result = await getAllEvents({ creatorId: user.id });

      if (!result?.success) {
        throw new Error(result?.message || "Failed to fetch events");
      }

      setEvents(result?.data || []);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(eventId);
      setError("");

      const result = await deleteEvent(eventId);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to delete event");
      }

      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete event";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Events</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your created events.
          </p>
        </div>

        <Link
          href="/dashboard/create-event"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
          Create Event
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold">No events found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You have not created any events yet.
          </p>
          <Link
            href="/dashboard/create-event"
            className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleString()}
                  </p>
                </div>

                <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                  {event.eventType}
                </span>
              </div>

              <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                {event.description}
              </p>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Venue:</span> {event.venue}
                </p>
                <p>
                  <span className="font-medium">Access:</span> {event.eventType}
                </p>
                <p>
                  <span className="font-medium">Fee Type:</span> {event.feeType}
                </p>
                <p>
                  <span className="font-medium">Registration Fee:</span>{" "}
                  {event.feeType === "FREE" ? "Free" : `$${event.fee}`}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/dashboard/my-events/${event.id}/participants`}
                  className="inline-flex rounded-md border px-3 py-2 text-sm font-medium">
                  Manage Participants
                </Link>
                <Link
                  href={`/events/${event.id}`}
                  className="rounded-lg border px-3 py-2 text-sm font-medium">
                  View
                </Link>

                <Link
                  href={`/dashboard/my-events/${event.id}/edit`}
                  className="rounded-lg border px-3 py-2 text-sm font-medium">
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(event.id)}
                  disabled={deletingId === event.id}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 disabled:opacity-50">
                  {deletingId === event.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
