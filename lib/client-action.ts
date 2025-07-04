"use client";

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
  page = 1
): Promise<{ data: Job[]; meta: any }> => {
  return fetchApi<{ data: Job[]; meta: any }>(`/api/jobs?page=${page}`);
};
