// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// type LoginPayload = {
//   email: string;
//   password: string;
// };

// type RegisterPayload = {
//   name: string;
//   email: string;
//   password: string;
// };

// type DecodedUser = {
//   id: string;
//   email: string;
//   role: string;
//   exp?: number;
//   iat?: number;
// };

// export const loginUser = async (userData: LoginPayload) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//       credentials: "include",
//       cache: "no-store",
//     });

//     const result = await res.json();

//     if (result?.success && result?.data?.accessToken) {
//       Cookies.set("accessToken", result.data.accessToken, {
//         expires: 7,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });
//     }

//     return result;
//   } catch (error) {
//     console.error("Login error:", error);
//     return {
//       success: false,
//       message: "Something went wrong during login",
//     };
//   }
// };

// export const registerUser = async (userData: RegisterPayload) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//       credentials: "include",
//       cache: "no-store",
//     });

//     const result = await res.json();
//     return result;
//   } catch (error) {
//     console.error("Register error:", error);
//     return {
//       success: false,
//       message: "Something went wrong during registration",
//     };
//   }
// };

// export const getCurrentUser = (): DecodedUser | null => {
//   try {
//     const token = Cookies.get("accessToken");
//     if (!token) return null;

//     const decoded = jwtDecode<DecodedUser>(token);
//     return decoded;
//   } catch (error) {
//     console.error("Get current user error:", error);
//     return null;
//   }
// };

// export const getAccessToken = () => {
//   return Cookies.get("accessToken") || null;
// };

// export const logoutUser = () => {
//   Cookies.remove("accessToken");
// };

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type DecodedUser = {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  exp?: number;
  iat?: number;
};

export const loginUser = async (userData: LoginPayload) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
      cache: "no-store",
    });

    const result = await res.json();

    if (result?.success && result?.data?.accessToken) {
      Cookies.set("accessToken", result.data.accessToken, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return result;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Something went wrong during login",
    };
  }
};

export const registerUser = async (userData: RegisterPayload) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      message: "Something went wrong during registration",
    };
  }
};

export const getCurrentUserClient = (): DecodedUser | null => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) return null;

    return jwtDecode<DecodedUser>(token);
  } catch (error) {
    console.error("Get current user client error:", error);
    return null;
  }
};

export const getAccessToken = () => Cookies.get("accessToken") || null;

export const logoutUser = () => {
  Cookies.remove("accessToken");
};