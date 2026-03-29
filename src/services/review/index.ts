import { getAccessToken } from "@/services/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type TReview = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  eventId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  event: {
    id: string;
    title: string;
    date: string;
    venue: string;
    eventType: "PUBLIC" | "PRIVATE";
    feeType: "FREE" | "PAID";
  };
};

export type TReviewPayload = {
  eventId: string;
  rating: number;
  comment: string;
};

export type TUpdateReviewPayload = {
  rating?: number;
  comment?: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TGetReviewsResponse = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: TReview[];
};

export type TSingleReviewResponse = {
  success: boolean;
  message: string;
  data: TReview;
};

export type TDeleteReviewResponse = {
  success: boolean;
  message: string;
  data: null;
};

const getAuthHeaders = () => {
  const token = getAccessToken();

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const createReview = async (payload: TReviewPayload) => {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json() as Promise<TSingleReviewResponse>;
};

export const getAllReviews = async (query?: Record<string, string | number>) => {
  const searchParams = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
  }

  const res = await fetch(`${BASE_URL}/reviews?${searchParams.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  return res.json() as Promise<TGetReviewsResponse>;
};

export const getReviewById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  return res.json() as Promise<TSingleReviewResponse>;
};

export const getMyReviews = async () => {
  const res = await fetch(`${BASE_URL}/reviews/my-reviews`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  return res.json() as Promise<TGetReviewsResponse>;
};

export const updateReview = async (
  id: string,
  payload: TUpdateReviewPayload
) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json() as Promise<TSingleReviewResponse>;
};

export const deleteReview = async (id: string) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  return res.json() as Promise<TDeleteReviewResponse>;
};