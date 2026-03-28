"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEventById, TEventPayload, updateEvent } from "@/services/events";
import { toast } from "sonner";

const editEventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date & time is required"),
    venue: z.string().min(1, "Venue is required"),
    eventType: z.enum(["PUBLIC", "PRIVATE"]),
    feeType: z.enum(["FREE", "PAID"]),
    fee: z.coerce.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.feeType === "FREE" && data.fee && data.fee > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fee"],
        message: "Free event cannot have fee",
      });
    }

    if (data.feeType === "PAID" && (!data.fee || data.fee <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fee"],
        message: "Paid event must have a valid fee",
      });
    }
  });

type TEditEventFormInput = z.input<typeof editEventSchema>;
type TEditEventFormValues = z.output<typeof editEventSchema>;

type TEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  eventType: "PUBLIC" | "PRIVATE";
  feeType: "FREE" | "PAID";
  fee?: number;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
};

type EditEventFormProps = {
  eventId: string;
};

const defaultValues: TEditEventFormInput = {
  title: "",
  description: "",
  date: "",
  venue: "",
  eventType: "PUBLIC",
  feeType: "FREE",
  fee: 0,
};

export default function EditEventForm({ eventId }: EditEventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TEditEventFormInput, unknown, TEditEventFormValues>({
    resolver: zodResolver(editEventSchema),
    defaultValues,
  });

  const feeType = watch("feeType");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);

        const result = await getEventById(eventId);

        if (!result?.success) {
          throw new Error(result?.message || "Failed to load event");
        }

        const event: TEvent = result.data;

        reset({
          title: event.title,
          description: event.description,
          date: formatForDatetimeLocal(event.date),
          venue: event.venue,
          eventType: event.eventType,
          feeType: event.feeType,
          fee: event.feeType === "FREE" ? 0 : event.fee || 0,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        toast.error("Failed to load event", {
          description: message,
        });
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadEvent();
    }
  }, [eventId, reset]);

  const onSubmit: SubmitHandler<TEditEventFormValues> = async (values) => {
    try {
      const payload: Partial<TEventPayload> = {
        title: values.title,
        description: values.description,
        date: new Date(values.date).toISOString(),
        venue: values.venue,
        eventType: values.eventType,
        feeType: values.feeType,
        fee: values.feeType === "FREE" ? 0 : Number(values.fee),
      };

      const result = await updateEvent(eventId, payload);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to update event");
      }

      toast.success("Event updated successfully", {
        description: "Your event has been updated.",
      });

      router.push("/dashboard/my-events");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("Update failed", {
        description: message,
      });
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Loading event...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-sm text-muted-foreground">
          Update your event information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter event title"
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            rows={5}
            {...register("description")}
            placeholder="Write event description"
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Date & Time</label>
            <input
              type="datetime-local"
              {...register("date")}
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Venue</label>
            <input
              type="text"
              {...register("venue")}
              placeholder="Enter venue or meeting link"
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
            />
            {errors.venue && (
              <p className="mt-1 text-sm text-red-500">{errors.venue.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Event Type</label>
            <select
              {...register("eventType")}
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
            {errors.eventType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.eventType.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Fee Type</label>
            <select
              {...register("feeType")}
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2"
            >
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
            {errors.feeType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.feeType.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Registration Fee</label>
          <input
            type="number"
            min="0"
            step="0.01"
            {...register("fee")}
            disabled={feeType === "FREE"}
            placeholder={feeType === "FREE" ? "0" : "Enter fee amount"}
            className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
          {errors.fee && (
            <p className="mt-1 text-sm text-red-500">{errors.fee.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/my-events")}
            className="rounded-lg border px-5 py-2.5 text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

function formatForDatetimeLocal(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}