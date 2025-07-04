"use client";

import { setCookie } from "cookies-next";
import { getLocaleFromUrl } from "./utils";
import { toast } from "sonner";

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const fetchApi = async <T>(
  endpoint: string,
  options: ApiOptions = {}
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

export const fetchJobs = async (page = 2): Promise<PaginatedResponse<Job>> => {
  return fetchApi<PaginatedResponse<Job>>(`/api/jobs?page=${page}`);
};
export const fetchCountries = async (): Promise<Country[]> => {
  return fetchApi<Country[]>(`/api/countries`);
};

export const fetchCities = async (id: number): Promise<City[]> => {
  return fetchApi<City[]>(`/api/cities/${id}`);
};

export const login = async (login: string, password: string) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();

    setCookie("token", data.access_token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return data;
  } catch (error) {
    console.error("Login error:", error);

    throw error;
  }
};

export const register = async (formData: FormData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.details
          ? Object.values(errorData.details).join("\n")
          : errorData.error || "Registration failed"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
