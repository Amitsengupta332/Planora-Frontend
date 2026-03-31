"use client";

const stats = [
  { label: "Events", value: "500+" },
  { label: "Users", value: "2K+" },
  { label: "Registrations", value: "10K+" },
  { label: "Reviews", value: "1K+" },
];

export default function StatsSection() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-3xl font-bold md:text-4xl text-primary">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}