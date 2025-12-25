// app/api/jobs/route.ts
import { NextResponse } from "next/server";

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

    Object.entries(params).forEach(([key, value]) => {
      if (value && value.length > 0 && key !== "page") {
        apiParams.append(key, value);
      }
    });

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs?${apiParams.toString()}`;

    // Prepare headers dynamically
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept-Language": language,
    };

    if (authHeader && authHeader !== "null" && authHeader !== "undefined") {
      headers["Authorization"] = authHeader;
    }

    const res = await fetch(apiUrl, {
      headers,
      cache: "no-store",
    });

    const responseData = await res.json();

    // محاكاة axios error handling
    if (!res.ok) {
      let errorMessage = "Failed to fetch jobs";

      if (res.status === 401) {
        errorMessage = "Authentication required";
      } else if (res.status === 404) {
        errorMessage = "Jobs endpoint not found";
      } else if (res.status >= 400 && res.status < 500) {
        errorMessage = "Client error occurred";
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: responseData,
          status: res.status,
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      data: responseData?.data || responseData || [],
      meta: responseData?.meta || {
        current_page: parseInt(params.page),
        per_page: 15,
        total:
          responseData?.data?.length ||
          responseData?.length ||
          0,
        last_page: Math.ceil(
          (
            responseData?.data?.length ||
            responseData?.length ||
            0
          ) / 15
        ),
      },
    });
  } catch (error: any) {
    console.log("API Route Error:", error.message);

    return NextResponse.json(
      {
        error: "No response from server - network error",
        details: error.message,
        status: 500,
      },
      { status: 500 }
    );
  }
}
