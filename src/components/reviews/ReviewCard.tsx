type Props = {
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function ReviewCard({
  name,
  rating,
  comment,
  createdAt,
}: Props) {
  return (
    <div className="rounded-xl border p-4 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{name}</h3>
        <span className="text-sm text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="text-sm font-medium text-yellow-600">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      <p className="text-sm text-muted-foreground">{comment}</p>
    </div>
  );
}