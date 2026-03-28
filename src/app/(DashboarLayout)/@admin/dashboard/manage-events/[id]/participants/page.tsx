"use client";

import {
  approveParticipation,
  banParticipant,
  getParticipantsByEvent,
  rejectParticipation,
  TParticipation,
} from "@/services/participation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  params: {
    eventId: string;
  };
};

export default function EventParticipantsPage({ params }: Props) {
  const eventId = params.eventId;

  const [participants, setParticipants] = useState<TParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "" | "PENDING" | "APPROVED" | "REJECTED" | "BANNED"
  >("");

  const loadParticipants = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getParticipantsByEvent(eventId);

      if (!res?.success) {
        throw new Error(res?.message || "Failed to load participants");
      }

      setParticipants(res.data || []);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!eventId) return;
    loadParticipants();
  }, [eventId]);

  const filteredParticipants = useMemo(() => {
    if (!statusFilter) return participants;
    return participants.filter((item) => item.status === statusFilter);
  }, [participants, statusFilter]);

  const handleApprove = async (id: string) => {
    try {
      setActionLoadingId(id);
      setError("");

      const res = await approveParticipation(id);

      if (!res?.success) {
        throw new Error(res?.message || "Failed to approve participation");
      }

      setParticipants((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "APPROVED", payment: res.data.payment }
            : item
        )
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to approve participation";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionLoadingId(id);
      setError("");

      const res = await rejectParticipation(id);

      if (!res?.success) {
        throw new Error(res?.message || "Failed to reject participation");
      }

      setParticipants((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "REJECTED" } : item
        )
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to reject participation";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleBan = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to ban this participant?"
    );

    if (!confirmed) return;

    try {
      setActionLoadingId(id);
      setError("");

      const res = await banParticipant(id);

      if (!res?.success) {
        throw new Error(res?.message || "Failed to ban participant");
      }

      setParticipants((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "BANNED" } : item
        )
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to ban participant";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status: TParticipation["status"]) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-700";
      case "PENDING":
        return "bg-amber-100 text-amber-700";
      case "REJECTED":
        return "bg-gray-200 text-gray-700";
      case "BANNED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-muted text-foreground";
    }
  };

  const getPaymentText = (participant: TParticipation) => {
    const paymentStatus = participant.payment?.status;

    if (!participant.payment) return "No payment";
    if (paymentStatus === "success") return "Paid";
    if (paymentStatus) return paymentStatus;
    return "Payment record";
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Participants & Join Requests</h1>
          <p className="text-sm text-muted-foreground">
            Approve, reject, or ban participants for this event.
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as
                | ""
                | "PENDING"
                | "APPROVED"
                | "REJECTED"
                | "BANNED"
            )
          }
          className="h-10 rounded-md border px-3 outline-none"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="BANNED">Banned</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-xl border bg-background">
        <div className="border-b px-4 py-3 text-sm text-muted-foreground">
          Total participants: {filteredParticipants.length}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Requested At</th>
                <th className="px-4 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    Loading participants...
                  </td>
                </tr>
              ) : filteredParticipants.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No participants found
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="border-t">
                    <td className="px-4 py-3 font-medium">
                      {participant.user?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {participant.user?.email || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {participant.user?.role || "USER"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(
                          participant.status
                        )}`}
                      >
                        {participant.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{getPaymentText(participant)}</td>
                    <td className="px-4 py-3">
                      {new Date(participant.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          disabled={
                            actionLoadingId === participant.id ||
                            participant.status === "APPROVED"
                          }
                          onClick={() => handleApprove(participant.id)}
                          className="rounded-md border px-3 py-2 text-xs font-medium disabled:opacity-50"
                        >
                          {actionLoadingId === participant.id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          disabled={
                            actionLoadingId === participant.id ||
                            participant.status === "REJECTED"
                          }
                          onClick={() => handleReject(participant.id)}
                          className="rounded-md border px-3 py-2 text-xs font-medium disabled:opacity-50"
                        >
                          {actionLoadingId === participant.id
                            ? "Processing..."
                            : "Reject"}
                        </button>

                        <button
                          disabled={
                            actionLoadingId === participant.id ||
                            participant.status === "BANNED"
                          }
                          onClick={() => handleBan(participant.id)}
                          className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-600 disabled:opacity-50"
                        >
                          {actionLoadingId === participant.id
                            ? "Processing..."
                            : "Ban"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}