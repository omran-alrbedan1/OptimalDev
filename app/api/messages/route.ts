import { NextResponse } from "next/server";
import axios from "axios";

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

    // Get the URL and extract search parameters
    const url = new URL(request.url);
    const withId = url.searchParams.get("with_id") || "1";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/conversation?with_id=${withId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Conversation fetch error:", error);
    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch conversations",
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}
