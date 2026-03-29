"use client";

import { useState } from "react";
import CreateReviewForm from "@/components/reviews/CreateReviewForm";
import ReviewList from "@/components/reviews/ReviewList";

type Props = {
  eventId: string;
};

export default function EventReviewSection({ eventId }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <CreateReviewForm
        eventId={eventId}
        onSuccess={() => setRefreshKey((prev) => prev + 1)}
      />

      <div key={refreshKey}>
        <ReviewList eventId={eventId} />
      </div>
    </div>
  );
}