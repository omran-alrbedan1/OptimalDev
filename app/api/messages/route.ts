import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized - Token missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const language = request.headers.get("Accept-Language") || "en";

    const url = new URL(request.url);
    const withId = url.searchParams.get("with_id") || "1";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/conversation?with_id=${withId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // لا تستخدم الكاش
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            errorData?.message ||
            `Failed to fetch conversations`,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.log("Conversation fetch error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch conversations",
      },
      { status: 500 }
    );
  }
}
