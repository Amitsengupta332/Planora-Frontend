"use client";

import { useState } from "react";
import { createReview } from "@/services/review";

type Props = {
  eventId: string;
  onSuccess?: () => void;
};

export default function CreateReviewForm({ eventId, onSuccess }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const res = await createReview({
        eventId,
        rating,
        comment,
      });

      if (!res.success) {
        throw new Error(res.message || "Failed to create review");
      }

      setSuccessMessage("Review submitted successfully");
      setRating(5);
      setComment("");
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Write a Review</h2>
        <p className="text-sm text-muted-foreground">
          Share your experience about this event.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="min-h-[120px] w-full rounded-lg border px-3 py-2 text-sm"
          required
        />
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {successMessage ? (
        <p className="text-sm text-green-600">{successMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}