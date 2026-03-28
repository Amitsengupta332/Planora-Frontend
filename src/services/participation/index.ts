import { getAccessToken } from "@/services/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type TParticipationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "BANNED";

export type TPayment = {
  id: string;
  amount?: number;
  status?: string;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TParticipation = {
  id: string;
  status: TParticipationStatus;
  createdAt: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role?: "ADMIN" | "USER";
  };
  event?: {
    id: string;
    title: string;
    eventType?: "PUBLIC" | "PRIVATE";
    feeType?: "FREE" | "PAID";
    fee?: number;
    creatorId?: string;
  };
  payment?: TPayment | null;
};

export type TParticipationListResponse = {
  success: boolean;
  message: string;
  data: TParticipation[];
};

export type TParticipationSingleResponse = {
  success: boolean;
  message: string;
  data: TParticipation;
};

const getAuthHeaders = () => {
  const token = getAccessToken();

  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const joinEvent = async (eventId: string) => {
  const res = await fetch(`${BASE_URL}/participations/join/${eventId}`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return res.json() as Promise<TParticipationSingleResponse>;
};

export const getMyParticipations = async () => {
  const res = await fetch(`${BASE_URL}/participations/my-participations`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
    cache: "no-store",
  });

  return res.json() as Promise<TParticipationListResponse>;
};

export const getParticipantsByEvent = async (eventId: string) => {
  const res = await fetch(`${BASE_URL}/participations/event/${eventId}`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
    cache: "no-store",
  });

  return res.json() as Promise<TParticipationListResponse>;
};

export const approveParticipation = async (participationId: string) => {
  const res = await fetch(
    `${BASE_URL}/participations/${participationId}/approve`,
    {
      method: "PATCH",
      headers: {
        ...getAuthHeaders(),
      },
      cache: "no-store",
    }
  );

  return res.json() as Promise<TParticipationSingleResponse>;
};

export const rejectParticipation = async (participationId: string) => {
  const res = await fetch(
    `${BASE_URL}/participations/${participationId}/reject`,
    {
      method: "PATCH",
      headers: {
        ...getAuthHeaders(),
      },
      cache: "no-store",
    }
  );

  return res.json() as Promise<TParticipationSingleResponse>;
};

export const banParticipant = async (participationId: string) => {
  const res = await fetch(`${BASE_URL}/participations/${participationId}/ban`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
    },
    cache: "no-store",
  });

  return res.json() as Promise<TParticipationSingleResponse>;
};