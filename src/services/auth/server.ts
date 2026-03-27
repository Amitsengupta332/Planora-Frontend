
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import type { DecodedUser } from "./index";

export const getCurrentUserServer = async (): Promise<DecodedUser | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    return jwtDecode<DecodedUser>(token);
  } catch (error) {
    console.error("Get current user server error:", error);
    return null;
  }
};