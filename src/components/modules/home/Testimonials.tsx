"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit Das",
    comment: "Amazing platform! I hosted my first event easily.",
    rating: 5,
  },
  {
    name: "Sara Ahmed",
    comment: "Joining events is super smooth and simple.",
    rating: 4,
  },
  {
    name: "Rahim Uddin",
    comment: "Loved the experience, especially the private events!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          What Users Say
        </h2>
        <p className="mt-3 text-muted-foreground">
          Real experiences from our community
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Card key={index} className="rounded-2xl">
              <CardContent className="p-6 text-left space-y-4">
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  &ldquo;{item.comment}&ldquo;
                </p>

                <h4 className="font-semibold">{item.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}