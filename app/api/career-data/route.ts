// app/api/career-data/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const startTime = Date.now();
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept-Language": language,
    };

    if (authHeader && authHeader !== "null" && authHeader !== "undefined") {
      headers["Authorization"] = authHeader;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // Fetch all career data in parallel
    const [featuredJobsRes, filterOptionsRes] = await Promise.all([
      fetch(`${baseUrl}/featured-jobs`, {
        headers,
        cache: "no-store",
      }),
      fetch(`${baseUrl}/filter-options`, {
        headers,
        cache: "no-store",
      }),
    ]);

    // Parse responses in parallel
    const [featuredJobsData, filterOptionsData] = await Promise.all([
      featuredJobsRes.json(),
      filterOptionsRes.json(),
    ]);

    const totalTime = Date.now() - startTime;
    console.log(`Combined API call took ${totalTime}ms`);

    return NextResponse.json({
      featuredJobs: featuredJobsData?.data || featuredJobsData || [],
      filterOptions: filterOptionsData?.data || filterOptionsData || {},
      meta: {
        timestamp: Date.now(),
        loadTime: totalTime,
      },
    });
  } catch (error: any) {
    console.log("Career API Route Error:", error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch career data",
        details: error.message,
        status: 500,
      },
      { status: 500 }
    );
  }
}