// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");

    // Get all parameters with defaults
    const params = {
      page: searchParams.get("page") || "1",
      search: searchParams.get("search") || "",
      work_sectors: searchParams.get("work_sectors"),
      contract_types: searchParams.get("contract_types"),
      work_modes: searchParams.get("work_modes"),
      experience_levels: searchParams.get("experience_levels"),
      education_levels: searchParams.get("education_levels"),
      countries: searchParams.get("countries"),
      salary_min: searchParams.get("salary_min") || "0",
      salary_max: searchParams.get("salary_max") || "2000",
    };

    // Build query for external API
    const apiParams = new URLSearchParams();
    apiParams.append("page", params.page);

    // Only append parameters that have values
    Object.entries(params).forEach(([key, value]) => {
      if (value && value.length > 0 && key !== "page") {
        // Handle array parameters (comma-separated)
        if (value.includes(',')) {
          apiParams.append(key, value);
        } else {
          apiParams.append(key, value);
        }
      }
    });

    const apiUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/jobs?${apiParams.toString()}`;
    
    // Prepare headers dynamically
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept-Language": language,
    };

    // Only add Authorization if token exists
    if (authHeader && authHeader !== "null" && authHeader !== "undefined") {
      headers["Authorization"] = authHeader;
    }

    const response = await axios.get(apiUrl, {
      headers,
      timeout: 10000,
    });

    return NextResponse.json({
      data: response.data?.data || response.data || [],
      meta: response.data?.meta || {
        current_page: parseInt(params.page),
        per_page: 15,
        total: response.data?.data?.length || response.data?.length || 0,
        last_page: Math.ceil((response.data?.data?.length || response.data?.length || 0) / 15),
      },
    });
  } catch (error: any) {
    console.log("API Route Error:", error.response?.data || error.message);

    // Provide more specific error messages
    let errorMessage = "Failed to fetch jobs";
    let statusCode = 500;
    
    if (error.response) {
      statusCode = error.response.status;
      if (statusCode === 401) {
        errorMessage = "Authentication required";
      } else if (statusCode === 404) {
        errorMessage = "Jobs endpoint not found";
      } else if (statusCode >= 400 && statusCode < 500) {
        errorMessage = "Client error occurred";
      }
    } else if (error.request) {
      errorMessage = "No response from server - network error";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.response?.data || error.message,
        status: statusCode,
      },
      { status: statusCode }
    );
  }
}