import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");
    const page = searchParams.get("page") || "1";

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Token missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/my-applications?page=${page}`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData?.message || "Failed to fetch applications",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      data: data?.data || data,
      meta: data?.meta || {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: data?.length || 0,
      },
    });
  } catch (error: any) {
    console.log("Error fetching applications:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}
