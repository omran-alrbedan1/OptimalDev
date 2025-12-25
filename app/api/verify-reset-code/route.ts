import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();
    const language = request.headers.get("Accept-Language") || "en";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/verify-reset-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({ email, token }),
      }
    );

    const responseData = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          error: responseData?.message || "Failed",
          details: responseData?.errors || {},
        },
        { status: res.status }
      );
    }

    const data = responseData?.data || responseData;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Failed",
        details: {},
      },
      { status: 500 }
    );
  }
}
