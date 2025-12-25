import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }

    const responseData = await res.json();
    const data = responseData?.data || responseData;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}
