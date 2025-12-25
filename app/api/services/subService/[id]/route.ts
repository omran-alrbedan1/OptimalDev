import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const { id } = params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sub-services/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData?.message || "Failed to fetch subService" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data?.data || data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch subService" },
      { status: 500 }
    );
  }
}
