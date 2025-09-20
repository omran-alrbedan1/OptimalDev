import { cookies } from "next/headers";

const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit & { lang?: string }
): Promise<T> => {
  // Get base URL - use different approaches for client vs server
  let baseUrl = "";

  if (typeof window === "undefined") {
    // Server-side: Use absolute URL with proper environment variable
    // Use NEXT_PUBLIC_BASE_URL if available, otherwise fallback
    baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";
  } else {
    // Client-side: Use relative URL
    baseUrl = "";
  }

  const url = `${baseUrl}/api${endpoint}`;
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

// Your export functions remain the same...
export const fetchSliders = async (lang?: string): Promise<Slider[]> => {
  return fetchApi("/sliders", { next: { revalidate: 3600 }, lang });
};

export const fetchPartners = async (lang?: string): Promise<Partner[]> => {
  return fetchApi("/partners", { next: { revalidate: 3600 }, lang });
};

// ... other functions
