import { getAccessToken } from "@/services/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type TCreatePaymentIntentPayload = {
  participationId: string;
};

export type TCreatePaymentIntentResponse = {
  success: boolean;
  message: string;
  data: {
    clientSecret: string;
    amount: number;
    transactionId?: string;
  };
};

export type TConfirmPaymentPayload = {
  participationId: string;
  transactionId: string;
};

export type TConfirmPaymentResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    participationId: string;
    transactionId: string;
    amount: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

export const createPaymentIntent = async (
  payload: TCreatePaymentIntentPayload
) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/payments/create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json() as Promise<TCreatePaymentIntentResponse>;
};

export const confirmPayment = async (
  payload: TConfirmPaymentPayload
) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/payments/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json() as Promise<TConfirmPaymentResponse>;
};