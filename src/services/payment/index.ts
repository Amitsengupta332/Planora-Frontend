// import { getAccessToken } from "@/services/auth";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export type TCreatePaymentIntentPayload = {
//   participationId: string;
// };

// export type TCreatePaymentIntentResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     clientSecret: string;
//     amount: number;
//     transactionId?: string;
//   };
// };

// export type TConfirmPaymentPayload = {
//   participationId: string;
//   transactionId: string;
// };

// export type TConfirmPaymentResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     id: string;
//     participationId: string;
//     transactionId: string;
//     amount: number;
//     status: string;
//     createdAt?: string;
//     updatedAt?: string;
//   };
// };

// export const createPaymentIntent = async (
//   payload: TCreatePaymentIntentPayload
// ) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/payments/create-payment-intent`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     body: JSON.stringify(payload),
//     cache: "no-store",
//   });

//   return res.json() as Promise<TCreatePaymentIntentResponse>;
// };

// export const confirmPayment = async (
//   payload: TConfirmPaymentPayload
// ) => {
//   const token = getAccessToken();

//   const res = await fetch(`${BASE_URL}/payments/confirm`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//     body: JSON.stringify(payload),
//     cache: "no-store",
//   });

//   return res.json() as Promise<TConfirmPaymentResponse>;
// };

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

const getHeaders = () => {
  const token = getAccessToken();

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const handleResponse = async <T>(res: Response): Promise<T> => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data as T;
};

export const createPaymentIntent = async (
  payload: TCreatePaymentIntentPayload
) => {
  const res = await fetch(`${BASE_URL}/payments/create-payment-intent`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return handleResponse<TCreatePaymentIntentResponse>(res);
};

export const confirmPayment = async (payload: TConfirmPaymentPayload) => {
  const res = await fetch(`${BASE_URL}/payments/confirm`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return handleResponse<TConfirmPaymentResponse>(res);
};