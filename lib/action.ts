import { cookies } from "next/headers";

const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit & { lang?: string }
): Promise<T> => {
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : "";
  const url = `${baseUrl}/api${endpoint}`;
  const language =
    //@ts-ignore
    options?.lang || cookies().get("preferredLanguage")?.value || "en";

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
        ...options?.headers,
      },
      next: {
        revalidate: 3600,
        ...options?.next,
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
  return fetchApi("/organization", { lang });
};

// export const login = async (
//   email: string,
//   password: string
// ): Promise<LoginResponse> => {
//   try {
//     const response = await fetchApi<LoginResponse>("/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//     });

//     setCookie("authToken", response.access_token, {
//       maxAge: 30 * 24 * 60 * 60,
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       httpOnly: false,
//     });

//     setCookie(
//       "userData",
//       JSON.stringify({
//         id: response.user.id,
//         email: response.user.email,
//         name: `${response.user.first_name} ${response.user.last_name}`,
//       }),
//       { maxAge: 30 * 24 * 60 * 60, path: "/" }
//     );

//     return response;
//   } catch (error: any) {
//     deleteCookie("authToken");
//     deleteCookie("userData");
//     throw error;
//   }
// };
