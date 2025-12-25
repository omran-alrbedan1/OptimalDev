// app/api/cities/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const { id } = params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cities/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
      cache: "no-store", // لمنع التخزين المؤقت
    });

    const responseData = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { 
          error: responseData?.message || "Failed to fetch city",
          details: responseData?.errors || {}
        },
        { status: res.status }
      );
    }

    return NextResponse.json(responseData?.data || responseData);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch city" },
      { status: 500 }
    );
  }
}
