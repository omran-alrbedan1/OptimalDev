"use client";

import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { getLocaleFromUrl } from "./utils";

import { Job } from "@/app";

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

// Base GET function
const get = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const locale = getLocaleFromUrl();
  const token = getCookie("token");

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      cache: "no-cache",
      ...options,
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Base POST function
const post = async <T>(
  endpoint: string,
  body: any,
  options: ApiOptions = {},
  isFormData: boolean = false
): Promise<T> => {
  const locale = getLocaleFromUrl();
  const token = getCookie("token");

  try {
    const headers: Record<string, string> = {
      "Accept-Language": locale,
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      ...options,
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to post to ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
};

// Base PUT function
const put = async <T>(
  endpoint: string,
  body: any,
  options: ApiOptions = {},
  isFormData: boolean = false
): Promise<T> => {
  const locale = getLocaleFromUrl();
  const token = getCookie("token");

  try {
    const headers: Record<string, string> = {
      "Accept-Language": locale,
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(endpoint, {
      method: "PUT",

      ...options,
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    throw error;
  }
};

export const fetchCountries = async (): Promise<Country[]> => {
  return get<Country[]>(`/api/countries`);
};

export const fetchProfileInfo = async (): Promise<User> => {
  return get<User>(`/api/profile`);
};

export const fetchCities = async (id: number): Promise<City[]> => {
  return get<City[]>(`/api/cities/${id}`);
};

export const updateProfile = async (profileData: {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  country_id?: number | string;
  city_id?: number | string;
  profile_image?: File | string;
  cv?: File;
}): Promise<User> => {
  const formData = new FormData();

  // Append all fields
  formData.append("first_name", profileData.first_name);
  formData.append("last_name", profileData.last_name);
  formData.append("phone", profileData.phone);
  formData.append("email", profileData.email);

  if (profileData.country_id) {
    formData.append("country_id", String(profileData.country_id));
  }
  if (profileData.city_id) {
    formData.append("city_id", String(profileData.city_id));
  }

  if (profileData.profile_image instanceof File) {
    formData.append("profile_image", profileData.profile_image);
  } else if (typeof profileData.profile_image === "string") {
    formData.append("profile_image_url", profileData.profile_image);
  }

  if (profileData.cv instanceof File) {
    formData.append("cv", profileData.cv);
  }

  return post<User>("/api/profile", formData, {}, true);
};

export const changePassword = async (data: {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}): Promise<void> => {
  return post<void>("/api/change-password", data);
};

export const login = async (login: string, password: string): Promise<any> => {
  const response = await post<any>("/api/login", { login, password });

  setCookie("token", response.access_token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
};

export const logout = async (): Promise<void> => {
  const token = getCookie("token");

  try {
    await post<void>(
      "/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error during logout:", error);
  }

  deleteCookie("token");
  deleteCookie("authData");

  window.dispatchEvent(new Event("authChange"));
};

export const register = async (formData: FormData): Promise<any> => {
  return post<any>("/api/register", formData, {}, true);
};

export const fetchMyApplications = async (
  page: number = 1
): Promise<PaginatedResponse<Application[]>> => {
  const response = await get<PaginatedResponse<Application[]>>(
    `/api/my-applications?page=${page}`
  );
  return response;
};

export const fetchApplicationDetails = async (
  id: number
): Promise<Application> => {
  const response = get<Application>(`/api/applications/${id}`);
  console.log(response);
  return response;
};

export const fetchJobTest = async (
  id: number,
  testId: number
): Promise<JobTest> => {
  return get<JobTest>(`/api/jobs/${id}/tests/${testId}`);
};

export const submitTestAnswers = async (
  jobId: number,
  testId: number,
  answers: { answers: Record<string, any> }
): Promise<TestSubmissionResponse> => {
  try {
    const endpoint = `/api/jobs/${jobId}/tests/${testId}/submit`;
    const response = await post<TestSubmissionResponse>(endpoint, answers);
    return response;
  } catch (error: any) {
    console.error("Test submission failed:", error);
    throw new Error(error.message || "Test submission failed");
  }
};

export const applyForJob = async (id: number): Promise<void> => {
  return post<void>(`/api/jobs/${id}/apply`, {});
};

export const fetchJobFilters = async (): Promise<FilterOptions> => {
  return get<FilterOptions>(`/api/filter-options`);
};

export const fetchJobDetails = async (id: number): Promise<Job> => {
  return get<Job>(`/api/jobs/${id}`);
};

export const fetchFeaturedJobs = async (): Promise<FeaturedJobs> => {
  return get<FeaturedJobs>(`/api/featured-jobs `);
};
export const fetchJobs = async (params: {
  page: number;
  search?: string;
  work_sectors?: number[];
  contract_types?: number[];
  work_modes?: number[];
  experience_levels?: number[];
  education_levels?: number[];
  countries?: number[];
  salary_min?: number;
  salary_max?: number;
}): Promise<PaginatedResponse<Job>> => {
  console.log(params);
  const queryParams = new URLSearchParams();
  queryParams.append("page", params.page.toString());

  if (params.search) {
    queryParams.append("search", params.search);
  }

  if (params.work_sectors && params.work_sectors.length > 0) {
    queryParams.append("work_sectors", params.work_sectors.join(","));
  }

  if (params.contract_types && params.contract_types.length > 0) {
    queryParams.append("contract_types", params.contract_types.join(","));
  }

  if (params.work_modes && params.work_modes.length > 0) {
    queryParams.append("work_modes", params.work_modes.join(","));
  }

  if (params.experience_levels && params.experience_levels.length > 0) {
    queryParams.append("experience_levels", params.experience_levels.join(","));
  }

  if (params.education_levels && params.education_levels.length > 0) {
    queryParams.append("education_levels", params.education_levels.join(","));
  }

  if (params.countries && params.countries.length > 0) {
    queryParams.append("countries", params.countries.join(","));
  }

  if (params.salary_min !== undefined) {
    queryParams.append("salary_min", params.salary_min.toString());
  }

  if (params.salary_max !== undefined) {
    queryParams.append("salary_max", params.salary_max.toString());
  }

  console.log(queryParams);
  const response = get<PaginatedResponse<Job>>(
    `/api/jobs?${queryParams.toString()}`
  );
  console.log(response);
  return response;
};
