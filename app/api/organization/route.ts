import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/organization`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        params: {
          lang: language,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch organization data" },
      { status: 500 }
    );
  }
}
