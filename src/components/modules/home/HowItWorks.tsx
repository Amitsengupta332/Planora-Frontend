"use client";

import { CalendarPlus, UserCheck, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: CalendarPlus,
    title: "Create Event",
    description: "Easily create and manage your own public or private events.",
  },
  {
    icon: UserCheck,
    title: "Join or Request",
    description: "Join events instantly or request access to private ones.",
  },
  {
    icon: Star,
    title: "Enjoy & Review",
    description: "Participate, enjoy the event, and share your experience.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          How It Works
        </h2>
        <p className="mt-3 text-muted-foreground">
          Simple steps to create and join events on Planora
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card key={index} className="rounded-2xl">
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}