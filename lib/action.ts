import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const cookiesStore = cookies();
  //@ts-ignore
  const language = cookiesStore.get("preferredLanguage")?.value;
  config.headers["Accept-Language"] = language;

  return config;
});

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.get(url, config);
    return (
      response.data?.data !== undefined ? response.data.data : response.data
    ) as T;
  } catch (error) {
    throw error;
  }
};
const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient.post(url, data, config);
    return (
      response.data?.data !== undefined ? response.data.data : response.data
    ) as T;
  } catch (error) {
    throw error;
  }
};

export const fetchSliders = async (): Promise<Slider[]> => {
  try {
    const sliders = await get<Slider[]>("/sliders");
    console.log(sliders);
    return sliders;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to sliders ";
    throw new Error(errorMessage);
  }
};
export const fetchPartners = async (): Promise<Partner[]> => {
  try {
    return await get<Partner[]>("/partners");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to partners ";
    throw new Error(errorMessage);
  }
};
export const fetchClients = async (): Promise<Client[]> => {
  try {
    return await get<Client[]>("/clients");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to clients ";
    throw new Error(errorMessage);
  }
};

export const fetchOrganization = async (): Promise<Organization> => {
  try {
    return await get<Organization>("/organization");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to organization ";
    throw new Error(errorMessage);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await post<LoginResponse>(
      "/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    setCookie("authToken", response.access_token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
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
      {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      }
    );

    return response;
  } catch (error: any) {
    let errorMessage = "Login failed";

    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        `Server error (${error.response.status})`;
    } else if (error.request) {
      errorMessage = "Network error - please check your connection";
    } else {
      errorMessage = error.message || errorMessage;
    }

    deleteCookie("authToken");
    deleteCookie("userData");

    throw new Error(errorMessage);
  }
};

const fetchJobs = async (): Promise<JobsResponse> => {
  const response = await axios.get("/api/jobs");
  return response.data;
};
