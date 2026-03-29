"use client";

import { useEffect, useState } from "react";
import {
  deleteReview,
  getMyReviews,
  TReview,
  updateReview,
} from "@/services/review";

export default function MyReviewsClient() {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getMyReviews();

      if (!res.success) {
        throw new Error(res.message || "Failed to fetch reviews");
      }

      setReviews(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleEditStart = (review: TReview) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleUpdate = async (id: string) => {
    try {
      setActionLoadingId(id);

      const res = await updateReview(id, {
        rating: editRating,
        comment: editComment,
      });

      if (!res.success) {
        throw new Error(res.message || "Failed to update review");
      }

      setEditingId(null);
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update review");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    try {
      setActionLoadingId(id);

      const res = await deleteReview(id);

      if (!res.success) {
        throw new Error(res.message || "Failed to delete review");
      }

      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete review");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading reviews...</p>;
  }

  if (error && !reviews.length) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!reviews.length) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">You have not reviewed any events yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      {reviews.map((review) => (
        <div key={review.id} className="rounded-xl border p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">{review.event.title}</h2>
              <p className="text-sm text-muted-foreground">
                {review.event.venue} •{" "}
                {new Date(review.event.date).toLocaleDateString()}
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          {editingId === review.id ? (
            <div className="space-y-3">
              <select
                value={editRating}
                onChange={(e) => setEditRating(Number(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>

              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="min-h-[110px] w-full rounded-lg border px-3 py-2 text-sm"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(review.id)}
                  disabled={actionLoadingId === review.id}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm font-medium text-yellow-600">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p className="text-sm text-muted-foreground">{review.comment}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditStart(review)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(review.id)}
                  disabled={actionLoadingId === review.id}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}