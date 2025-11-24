import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("API route error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to fetch sub-services" },
      { status: 500 }
    );
  }
}
