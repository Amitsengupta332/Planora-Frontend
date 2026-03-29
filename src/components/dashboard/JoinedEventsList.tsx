"use client";

import { getMyParticipations, TParticipation } from "@/services/participation";
import Link from "next/link";
import { useEffect, useState } from "react";
 

export default function JoinedEventsList() {
  const [participations, setParticipations] = useState<TParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getMyParticipations();

        if (res.success) {
          setParticipations(res.data);
        } else {
          setError(res.message || "Failed to fetch joined events");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch joined events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchParticipations();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">Loading joined events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border p-6">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!participations.length) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">
          You have not joined any events yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {participations.map((participation) => {
        const event = participation.event;

        return (
          <div
            key={participation.id}
            className="rounded-2xl border bg-background p-5 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{event?.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {event?.eventType} · {event?.feeType}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  participation.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : participation.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : participation.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {participation.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Venue:</span>{" "}
                {event?.venue || "N/A"}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {event?.date
                  ? new Date(event.date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <span className="font-medium">Fee:</span>{" "}
                {event?.feeType === "PAID" ? `৳ ${event?.fee ?? 0}` : "Free"}
              </p>
              <p>
                <span className="font-medium">Organizer:</span>{" "}
                {event?.creator?.name || "N/A"}
              </p>
            </div>

            {participation.payment && (
              <div className="mt-4 rounded-lg bg-muted p-3 text-sm">
                <p>
                  <span className="font-medium">Payment Amount:</span> ৳{" "}
                  {participation.payment.amount ?? 0}
                </p>
                <p>
                  <span className="font-medium">Payment Status:</span>{" "}
                  {participation.payment.status || "N/A"}
                </p>
                {participation.payment.transactionId && (
                  <p>
                    <span className="font-medium">Transaction ID:</span>{" "}
                    {participation.payment.transactionId}
                  </p>
                )}
              </div>
            )}

            <div className="mt-4">
              <Link
                href={`/events/${event?.id}`}
                className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}