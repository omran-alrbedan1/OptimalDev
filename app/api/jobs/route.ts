// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = request.headers.get("Accept-Language") || "en";

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
        apiParams.append(key, value);
      }
    });

    const apiUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/jobs?${apiParams.toString()}`;
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
      timeout: 10000,
    });

    return NextResponse.json({
      data: response.data?.data || response.data,
      meta: response.data?.meta || {
        current_page: parseInt(params.page),
        per_page: 15,
        total: response.data?.data?.length || response.data?.length || 0,
        last_page: 1,
      },
    });
  } catch (error: any) {
    console.error("API Route Error:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error: error.message || "Failed to fetch jobs",
        details: error.response?.data,
        status: error.response?.status,
      },
      { status: error.response?.status || 500 }
    );
  }
}
