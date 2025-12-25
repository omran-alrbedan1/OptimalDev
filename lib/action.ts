//@ts-nocheck
import { cookies } from "next/headers";

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit & { lang?: string; returnFullResponse?: boolean }
): Promise<T> => {
  const url = `http://147.79.118.212:7099/api${endpoint}`;

  const cookieStore = await  cookies();
  const preferredLanguage = cookieStore.get("preferredLanguage")?.value;

  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": preferredLanguage,
        ...options?.headers,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.error ||
          responseData.message ||
          `Failed to fetch ${endpoint} (Status: ${response.status})`
      );
    }

    // If returnFullResponse is true, return the entire response
    if (options?.returnFullResponse) {
      return responseData as T;
    }

    // Otherwise, return only the data property if it exists
    return responseData.data !== undefined
      ? responseData.data
      : (responseData as T);
  } catch (error: any) {
    console.log(`API Error (${endpoint}):`, error);
    throw new Error(error.message || `Failed to fetch ${endpoint}`);
  }
};

// الدوال الأخرى تبقى كما هي
export const fetchSliders = async (lang?: string): Promise<Slider[]> => {
  return fetchApi("/sliders", { next: { revalidate: 3600 }, lang });
};

export const fetchPartners = async (
  lang?: string
): Promise<PartnerResponse> => {
  return fetchApi<PartnerResponse>("/partners", {
    cache: "no-store",
    next: { revalidate: 3600 },
    lang,
    returnFullResponse: true,
  });
};

export const fetchClients = async (lang?: string): Promise<ClientsResponse> => {
  return fetchApi("/clients", {
    cache: "no-store",
    next: { revalidate: 3600 },
    lang,
    returnFullResponse: true,
  });
};

export const fetchOrganization = async (
  lang?: string
): Promise<Organization> => {
  return fetchApi("/organization", { next: { revalidate: 3600 }, lang });
};

export const fetchContactInfo = async (lang?: string): Promise<Contact> => {
  return fetchApi("/contact", { next: { revalidate: 3600 }, lang });
};
