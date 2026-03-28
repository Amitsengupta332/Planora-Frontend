"use client";

import { deleteEvent, getAllEvents } from "@/services/events";
import Link from "next/link";
import { useEffect, useState } from "react";
 

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

export default function ManageEventsPage() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("");
  const [feeType, setFeeType] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const query: Record<string, string | number> = {};

      if (searchTerm.trim()) query.searchTerm = searchTerm.trim();
      if (eventType) query.eventType = eventType;
      if (feeType) query.feeType = feeType;

      const result = await getAllEvents(query);

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
    loadEvents();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadEvents();
  };

  const handleResetFilters = async () => {
    setSearchTerm("");
    setEventType("");
    setFeeType("");

    try {
      setLoading(true);
      setError("");

      const result = await getAllEvents();

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

  const handleDelete = async (eventId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

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
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <p className="text-sm text-muted-foreground">
            Monitor, search, filter, edit, and delete platform events.
          </p>
        </div>

        <Link
          href="/dashboard/create-event"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          Create Event
        </Link>
      </div>

      <form
        onSubmit={handleSearch}
        className="grid gap-4 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-4"
      >
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, description, or venue"
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Event Type</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
          >
            <option value="">All</option>
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Fee Type</label>
          <select
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
          >
            <option value="">All</option>
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3 md:col-span-4">
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </form>

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
            No events matched your current filters.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-muted/50">
                <tr className="border-b text-left">
                  <th className="px-4 py-3 text-sm font-semibold">Title</th>
                  <th className="px-4 py-3 text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-sm font-semibold">Venue</th>
                  <th className="px-4 py-3 text-sm font-semibold">Creator</th>
                  <th className="px-4 py-3 text-sm font-semibold">Event Type</th>
                  <th className="px-4 py-3 text-sm font-semibold">Fee</th>
                  <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b last:border-b-0">
                    <td className="px-4 py-4 align-top">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="mt-1 max-w-xs text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm align-top">
                      {new Date(event.date).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 text-sm align-top">{event.venue}</td>

                    <td className="px-4 py-4 text-sm align-top">
                      <div>
                        <p className="font-medium">{event.creator?.name || "N/A"}</p>
                        <p className="text-muted-foreground">
                          {event.creator?.email || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm align-top">
                      {event.eventType}
                    </td>

                    <td className="px-4 py-4 text-sm align-top">
                      {event.feeType === "FREE" ? "Free" : `$${event.fee}`}
                    </td>

                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/events/${event.id}`}
                          className="rounded-lg border px-3 py-2 text-sm font-medium"
                        >
                          View
                        </Link>

                        <Link
                          href={`/dashboard/manage-events/${event.id}/edit`}
                          className="rounded-lg border px-3 py-2 text-sm font-medium"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(event.id)}
                          disabled={deletingId === event.id}
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 disabled:opacity-50"
                        >
                          {deletingId === event.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}