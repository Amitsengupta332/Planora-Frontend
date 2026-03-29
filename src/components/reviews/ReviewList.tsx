"use client";

import { useEffect, useState } from "react";
import { getAllReviews, TReview } from "@/services/review";
import ReviewCard from "@/components/reviews/ReviewCard";

type Props = {
  eventId: string;
};

export default function ReviewList({ eventId }: Props) {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllReviews({ eventId });

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

    fetchReviews();
  }, [eventId]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!reviews.length) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          name={review.user.name}
          rating={review.rating}
          comment={review.comment}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
}