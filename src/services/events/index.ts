// import { getAccessToken } from "@/services/auth";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export type TEventPayload = {
//   title: string;
//   description: string;
//   date: string;
//   venue: string;
//   eventType: "PUBLIC" | "PRIVATE";
//   feeType: "FREE" | "PAID";
//   fee?: number;
// };

// export const createEvent = async (payload: TEventPayload) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/events`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? token : "",
//     },
//     body: JSON.stringify(payload),
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const getAllEvents = async (query?: Record<string, string | number>) => {
//   const searchParams = new URLSearchParams();

//   if (query) {
//     Object.entries(query).forEach(([key, value]) => {
//       searchParams.append(key, String(value));
//     });
//   }

//   const res = await fetch(`${BASE_URL}/events?${searchParams.toString()}`, {
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const getEventById = async (id: string) => {
//   const res = await fetch(`${BASE_URL}/events/${id}`, {
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const updateEvent = async (
//   id: string,
//   payload: Partial<TEventPayload>
// ) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/events/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? token : "",
//     },
//     body: JSON.stringify(payload),
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const deleteEvent = async (id: string) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/events/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: token ? token : "",
//     },
//     cache: "no-store",
//   });

//   return res.json();
// };

// import { getAccessToken } from "@/services/auth";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export type TEventPayload = {
//   title: string;
//   description: string;
//   date: string;
//   venue: string;
//   eventType: "PUBLIC" | "PRIVATE";
//   feeType: "FREE" | "PAID";
//   fee?: number;
// };

// export const createEvent = async (payload: TEventPayload) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/events`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     body: JSON.stringify(payload),
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const getAllEvents = async (query?: Record<string, string | number>) => {
//   const searchParams = new URLSearchParams();

//   if (query) {
//     Object.entries(query).forEach(([key, value]) => {
//       searchParams.append(key, String(value));
//     });
//   }

//   const res = await fetch(`${BASE_URL}/events?${searchParams.toString()}`, {
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const getEventById = async (id: string) => {
//   const res = await fetch(`${BASE_URL}/events/${id}`, {
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const updateEvent = async (
//   id: string,
//   payload: Partial<TEventPayload>
// ) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/events/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     body: JSON.stringify(payload),
//     cache: "no-store",
//   });

//   return res.json();
// };

// export const deleteEvent = async (id: string) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/events/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     cache: "no-store",
//   });

//   return res.json();
// };

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

export type TEvent = {
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
  creator?: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
  };
};

export type TEventMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TGetAllEventsResponse = {
  success: boolean;
  message: string;
  meta: TEventMeta;
  data: TEvent[];
};

export type TSingleEventResponse = {
  success: boolean;
  message: string;
  data: TEvent;
};

export type TDeleteEventResponse = {
  success: boolean;
  message: string;
  data: null;
};

export const createEvent = async (payload: TEventPayload) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json() as Promise<TSingleEventResponse>;
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

  return res.json() as Promise<TGetAllEventsResponse>;
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
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json() as Promise<TSingleEventResponse>;
};

export const deleteEvent = async (id: string) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  return res.json() as Promise<TDeleteEventResponse>;
};