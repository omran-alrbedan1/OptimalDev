import { cookies } from "next/headers";

const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit & { lang?: string }
): Promise<T> => {
  // Use the API base URL for server-side, empty string for client-side
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

  const url = `${baseUrl}${endpoint}`;
  const language = options?.lang || "en";

  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch ${endpoint}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`API Error (${endpoint}):`, error);
    throw new Error(error.message || `Failed to fetch ${endpoint}`);
  }
};

export const fetchSliders = async (lang?: string): Promise<Slider[]> => {
  return fetchApi("/sliders", { next: { revalidate: 3600 }, lang });
};

export const fetchPartners = async (lang?: string): Promise<Partner[]> => {
  return fetchApi("/partners", { next: { revalidate: 3600 }, lang });
};

export const fetchClients = async (lang?: string): Promise<Client[]> => {
  return fetchApi("/clients", { next: { revalidate: 3600 }, lang });
};

export const fetchOrganization = async (
  lang?: string
): Promise<Organization> => {
  return fetchApi("/organization", { next: { revalidate: 3600 }, lang });
};

export const fetchContactInfo = async (lang?: string): Promise<Contact> => {
  return fetchApi("/contact", { next: { revalidate: 3600 }, lang });
};
