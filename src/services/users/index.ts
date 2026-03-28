import { getAccessToken } from "@/services/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TGetUsersResponse = {
  success: boolean;
  message: string;
  meta: TMeta;
  data: TUser[];
};

export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: "ADMIN" | "USER";
}) => {
  const token = getAccessToken();

  const query = new URLSearchParams();

  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
  if (params?.role) query.append("role", params.role);

  const res = await fetch(`${BASE_URL}/users?${query.toString()}`, {
    method: "GET",
    headers: {
      Authorization: token as string,
    },
  });

  return res.json() as Promise<TGetUsersResponse>;
};

export const getSingleUser = async (id: string) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: token as string,
    },
  });

  return res.json();
};

export const deleteUser = async (id: string) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token as string,
    },
  });

  return res.json();
};

export const updateUser = async (
  id: string,
  payload: {
    name?: string;
    email?: string;
    password?: string;
    role?: "ADMIN" | "USER";
  }
) => {
  const token = getAccessToken();

  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token as string,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};