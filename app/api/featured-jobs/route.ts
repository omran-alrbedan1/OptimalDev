// app/api/featured-jobs/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/featured-jobs`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
      cache: "no-store",
    });

    const responseData = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: responseData?.message || "Failed to fetch featured-jobs", details: responseData },
        { status: res.status }
      );
    }

    const data = responseData?.data || responseData;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch featured-jobs" },
      { status: 500 }
    );
  }
}
