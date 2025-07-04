"use client";

import { setCookie } from "cookies-next";
import { getLocaleFromUrl } from "./utils";

const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const locale = getLocaleFromUrl();

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const fetchJobs = async (
  page = 2
): Promise<{ data: Job[]; meta: any }> => {
  return fetchApi<{ data: Job[]; meta: any }>(`/api/jobs?page=${page}`);
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetchApi<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setCookie("authToken", response.access_token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: false,
    });

    setCookie(
      "userData",
      JSON.stringify({
        id: response.user.id,
        email: response.user.email,
        name: `${response.user.first_name} ${response.user.last_name}`,
      }),
      { maxAge: 30 * 24 * 60 * 60, path: "/" }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};
