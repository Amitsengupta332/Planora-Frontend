import { getAccessToken } from "@/services/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type TEventPayload = {
  title: string;
  description: string;
  date: string;
  venue: string;
  eventType: "PUBLIC" | "PRIVATE";
  feeType: "FREE" | "PAID";
  fee?: number;
};

export const createEvent = async (payload: TEventPayload) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json();
};

export const getAllEvents = async (query?: Record<string, string | number>) => {
  const searchParams = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
  }

  const res = await fetch(`${BASE_URL}/events?${searchParams.toString()}`, {
    cache: "no-store",
  });

  return res.json();
};

export const getEventById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    cache: "no-store",
  });

  return res.json();
};

export const updateEvent = async (
  id: string,
  payload: Partial<TEventPayload>
) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json();
};

export const deleteEvent = async (id: string) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? token : "",
    },
    cache: "no-store",
  });

  return res.json();
};