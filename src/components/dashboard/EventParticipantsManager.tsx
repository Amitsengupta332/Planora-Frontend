"use client";

import { useEffect, useMemo, useState } from "react";
import type { DecodedUser } from "@/services/auth";
import {
  approveParticipation,
  banParticipant,
  getParticipantsByEvent,
  rejectParticipation,
  TParticipation,
} from "@/services/participation";

type Props = {
  id: string;
  creatorId: string;
  currentUser: DecodedUser;
};

export default function EventParticipantsManager({
  id,
  creatorId,
  currentUser,
}: Props) {
  const [participants, setParticipants] = useState<TParticipation[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const canManage = useMemo(() => {
    return currentUser.role === "ADMIN" || currentUser.id === creatorId;
  }, [currentUser, creatorId]);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getParticipantsByEvent(id);

      if (!res.success) {
        throw new Error(res.message || "Failed to fetch participants");
      }

      setParticipants(res.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch participants",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canManage) {
      fetchParticipants();
    } else {
      setLoading(false);
    }
  }, [canManage, id]);

  const handleApprove = async (participationId: string) => {
    try {
      setActionLoadingId(participationId);
      const res = await approveParticipation(participationId);
      if (!res.success) {
        throw new Error(res.message || "Failed to approve participation");
      }
      await fetchParticipants();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Approval failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (participationId: string) => {
    try {
      setActionLoadingId(participationId);
      const res = await rejectParticipation(participationId);
      if (!res.success) {
        throw new Error(res.message || "Failed to reject participation");
      }
      await fetchParticipants();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rejection failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleBan = async (participationId: string) => {
    try {
      setActionLoadingId(participationId);
      const res = await banParticipant(participationId);
      if (!res.success) {
        throw new Error(res.message || "Failed to ban participant");
      }
      await fetchParticipants();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ban failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!canManage) {
    return (
      <div className="rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">
          You are not allowed to manage participants for this event.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading participants...</p>
    );
  }

  if (error && !participants.length) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!participants.length) {
    return (
      <p className="text-sm text-muted-foreground">No participants found.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">Participant</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Payment</th>
            <th className="px-4 py-3 font-medium">Requested At</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id} className="border-t">
              <td className="px-4 py-3">
                {participant.user?.name || "Unknown"}
              </td>
              <td className="px-4 py-3">{participant.user?.email || "N/A"}</td>
              <td className="px-4 py-3">{participant.status}</td>
              <td className="px-4 py-3">
                {participant.payment
                  ? `৳ ${participant.payment.amount ?? 0}`
                  : "No payment"}
              </td>
              <td className="px-4 py-3">
                {new Date(participant.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {participant.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(participant.id)}
                        disabled={actionLoadingId === participant.id}
                        className="rounded-md bg-green-600 px-3 py-1 text-xs text-white">
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(participant.id)}
                        disabled={actionLoadingId === participant.id}
                        className="rounded-md bg-red-500 px-3 py-1 text-xs text-white">
                        Reject
                      </button>
                    </>
                  )}

                  {participant.status !== "BANNED" && (
                    <button
                      onClick={() => handleBan(participant.id)}
                      disabled={actionLoadingId === participant.id}
                      className="rounded-md bg-black px-3 py-1 text-xs text-white">
                      Ban
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
