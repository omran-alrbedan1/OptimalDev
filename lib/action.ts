import { cookies } from "next/headers";

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit & { lang?: string }
): Promise<T> => {
  const url = `http://147.79.118.212:7099/api${endpoint}`;
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

    const responseData: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.error ||
          responseData.message ||
          `Failed to fetch ${endpoint} (Status: ${response.status})`
      );
    }

    // إرجاع data مباشرة إذا كانت موجودة، وإلا إرجاع الرد كاملاً
    return responseData.data !== undefined
      ? responseData.data
      : (responseData as T);
  } catch (error: any) {
    console.error(`API Error (${endpoint}):`, error);
    throw new Error(error.message || `Failed to fetch ${endpoint}`);
  }
};

// الدوال الأخرى تبقى كما هي
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
