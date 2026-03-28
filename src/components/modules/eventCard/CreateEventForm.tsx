"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEvent, TEventPayload } from "@/services/events";
import { toast } from "sonner";

const createEventSchema = z
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

type TCreateEventFormInput = z.input<typeof createEventSchema>;
type TCreateEventFormValues = z.output<typeof createEventSchema>;

const defaultValues: TCreateEventFormInput = {
  title: "",
  description: "",
  date: "",
  venue: "",
  eventType: "PUBLIC",
  feeType: "FREE",
  fee: 0,
};

export default function CreateEventForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCreateEventFormInput, unknown, TCreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues,
  });

  const feeType = watch("feeType");

  const onSubmit: SubmitHandler<TCreateEventFormValues> = async (values) => {
    try {
      const payload: TEventPayload = {
        title: values.title,
        description: values.description,
        date: new Date(values.date).toISOString(),
        venue: values.venue,
        eventType: values.eventType,
        feeType: values.feeType,
        fee: values.feeType === "FREE" ? 0 : Number(values.fee),
      };

      const result = await createEvent(payload);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to create event");
      }

      toast.success("Event created successfully");

      reset(defaultValues);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("Failed to create event", {
        description: message,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Event</h1>
        <p className="text-sm text-muted-foreground">
          Fill up the details to create a new event.
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
            onClick={() => reset(defaultValues)}
            className="rounded-lg border px-5 py-2.5 text-sm font-medium"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}