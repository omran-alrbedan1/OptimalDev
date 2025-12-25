import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";


    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/organization`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData?.message || "Failed to fetch profile",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
